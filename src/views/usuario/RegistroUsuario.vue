<template>
  <contenedor-centrado>
    <form>
      <form-group>
        <form-label>Nombre</form-label>
        <input-control type="text" v-model="name" autofocus />
        <input-error v-if="errors.name">{{ errors.name[0] }}</input-error>
      </form-group>
      <form-group>
        <form-label>Correo electrónico</form-label>
        <input-control type="email" v-model="email" />
        <input-error v-if="errors.email">{{ errors.email[0] }}</input-error>
      </form-group>
      <form-group>
        <form-label>Contraseña</form-label>
        <input-control type="password" v-model="password" />
        <input-error v-if="errors.password">{{ errors.password[0] }}</input-error>
      </form-group>
      <form-group>
        <form-label>Repetir contraseña</form-label>
        <input-control type="password" v-model="password_confirmation" />
        <input-error v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</input-error>
      </form-group>

      <button-submit @submit-click="enviarFormularioRegistro">Registrarse</button-submit>
    </form>
  </contenedor-centrado>
</template>

<script>
import axios from "axios";
import router from "@/router";

import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import store from "@/store";
import {mapState} from "vuex";
import GlobalHelpers from "@/helpers/globalHelpers.vue";
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";

export default {
  name:"RegistroUsuario",
  components: {
    ContenedorCentrado,
    InputControl, ButtonSubmit, InputError, FormGroup, FormLabel},

  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    }
  },
  computed: {
    ...mapState(["errors", "message"]),
  },
  mounted() {
    console.log("RegistrarUsuario.vue: Entrando a la vista de RegistrarUsuario");
  },
  methods: {
    enviarFormularioRegistro(){
      try{
        console.log("RegistrarUsuario.vue: Mandando petición al registro del servidor");
        axios.post(process.env.VUE_APP_API_BASE_URL+"registrarse",{
          "name":this.name,
          "email":this.email,
          "password":this.password,
          "password_confirmation":this.password_confirmation
        })
            .then(response => {
              console.log("RegistrarUsuario.vue: Respuesta OK a la peticiión de registro");

              //Almaceno el token de sesión
              store.dispatch("almacenarTokenSesionAction", response.data.access_token);

              //también almaceno los décimos del usuario para tenerlos sincronizados
              store.dispatch("almacenarMisDecimos",response.data.misdecimos);

              //Muestro un toast de bienvenida
              GlobalHelpers.mostrarToast('Te has registrado correctamente. ¡Bienvenido, ' + this.name + "!", "success")

              //Una vez tengo el token guardado, redirijo adonde quería ir
              if(router.currentRoute.value.redirectedFrom){
                router.push(router.currentRoute.value.redirectedFrom);
              }else{
                router.push({name:"CuentaUsuario"});
              }
            })
            .catch(error => {
              console.log("RegistrarUsuario.vue: Resputa KO a la petición de registro");
              //Si es un error de validación...
              if(error.response && error.response.data &&
                  error.response.data.errors &&
                  error.response.data.message){
                store.dispatch("almacenarArrayErrores", error.response.data.errors);
                store.dispatch("almacenarMensaje", error.response.data.message);
              }
            })
      }catch(error){
        console.log("RegistrarUsuario.vue: Error al intentar dar de alta los datos del usuario");
      }
    }
  }
}
</script>
