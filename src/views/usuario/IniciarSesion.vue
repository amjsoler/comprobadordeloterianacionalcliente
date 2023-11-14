<template>
  <contenedor-centrado>
    <div class="w-50">
      <img src="/login.png" class="img-fluid">
    </div>
    <form>
      <form-group class="mt-3">
        <form-label>Correo electrónico</form-label>
        <input-control autofocus type="email" v-model="email" />
        <input-error v-if="errors.email">{{ errors.email[0] }}</input-error>
      </form-group>
      <form-group>
        <form-label>Contraseña</form-label>
        <input-control type="password" v-model="password" />
        <input-error v-if="errors.password">{{ errors.password[0] }}</input-error>
      </form-group>
      <form-group>
        <button-submit @submit-click="iniciarSesion">Iniciar Sesión</button-submit>
      </form-group>
      <router-link :to='{name:"RecuperarCuenta"}' class="text-decoration-none text-center w-100 d-block mt-4">
        Recordar contraseña
      </router-link>
      <router-link :to='{name:"RegistroUsuario"}' class="text-decoration-none text-center mt-2 w-100 d-block">¿No tienes
        cuenta? Regístrate
      </router-link>
    </form>
  </contenedor-centrado>
</template>

<style scoped>

</style>

<script>

import axios from "axios";
import {mapActions, mapState} from "vuex";
import router from "@/router";

import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";
import store from "@/store";
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";

export default {
  name: "IniciarSesion",
  components: {ContenedorCentrado, ButtonSubmit, FormGroup, InputError, InputControl, FormLabel},

  data() {
    return {
      email: "",
      password: "",
    }
  },
  computed: {
    ...mapState(["errors", "message"]),
  },
  mounted() {
    console.log("IniciarSesion.vue: Entrando al iniciar sesión");
  },
  methods: {
    ...mapActions({
      almacenarTokenSesion: "almacenarTokenSesionAction",
    }),
    iniciarSesion() {
      console.log("IniciarSesion.vue: Lanzando petición post a login");

      axios.post(process.env.VUE_APP_API_BASE_URL + "iniciar-sesion", {
        email: this.email,
        password: this.password
      })
          .then(response => {
            console.log("IniciarSesion.vue: El servidor ha respondido con un 200");

            //Almaceno el token en el app state y después lo almaceno en memoria local
            store.dispatch("almacenarTokenSesionAction", response.data.access_token);

            //también almaceno los décimos del usuario para tenerlos sincronizados
            //TODO: Esto convendría cuando el usuario tenga un volumen grande de décimos
            //store.dispatch("almacenarMisDecimos", JSON.stringify(response.data.misdecimos));

            //Una vez tengo el token guardado, redirijo adonde quería ir si hay una página de origen si no a la cuenta de usuario
            if (router.currentRoute.value.redirectedFrom) {
              console.log("IniciarSesion.vue: redirijo a la página adonde quería ir");
              router.push(router.currentRoute.value.redirectedFrom);
            } else {
              console.log("IniciarSesion.vue: redirijo a la cuenta de usuario");
              router.push({name: "MisDecimos"});
            }
          })
          .catch(error => {
            console.log("IniciarSesion.vue: Error en la petición de inicio de sesión");
            //Si no es un error de validación preguntamos si la contraseña es correcta puesto que esta no se valida en el request de servidor...
            if (error.response && error.response.status != 422) {
              if(error.response.status == 401){
                console.log("IniciarSesion.vue: Error generico");

                var errArr = {"password": ["¿La contraseña es correcta?"]};
                store.dispatch("almacenarArrayErroresAction", errArr);
                store.dispatch("almacenarMensajeAction", "¿La contraseña es correcta?");
              }
            }
          });
    }
  }
}
</script>