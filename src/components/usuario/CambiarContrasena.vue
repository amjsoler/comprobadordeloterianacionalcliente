<template>
  <h3 class="text-center">Cambiar contraseña</h3>
  <form>
    <form-group>
      <form-label>Contraseña actual</form-label>
      <input-control type="password" v-model="contrasenaActual"></input-control>
        <input-error v-if="errors.contrasenaActual">{{ errors.contrasenaActual[0] }}</input-error>
    </form-group>
    <form-group>
      <form-label>Nueva contrasena</form-label>
      <input-control type="password" v-model="nuevaContrasena"></input-control>
      <input-error v-if="errors.nuevaContrasena">{{ errors.nuevaContrasena[0] }}</input-error>
    </form-group>
    <form-group>
      <form-label>Repetir contrasena</form-label>
      <input-control type="password" v-model="repetirContrasena"></input-control>
      <input-error v-if="errors.nuevaContrasena">{{ errors.nuevaContrasena[0] }}</input-error>
    </form-group>
    <button-submit @submit-click="cambiarContrasena">Guardar nueva contraseña</button-submit>
  </form>
</template>
<script>
import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import {mapState} from "vuex";
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";
import axios from "axios";
import GlobalHelpers from "@/helpers/globalHelpers.vue";

export default {
  name: "CambiarContrasena",
  components: {ButtonSubmit, InputError, InputControl, FormLabel, FormGroup},
  data(){
    return {
      contrasenaActual: "",
      nuevaContrasena: "",
      repetirContrasena: "",
    }
  },

  computed: {
      ...mapState(["errors", "message"])
  },

  mounted() {
    console.log("CambiarContrasena.vue: Entrando al cambiar contraseña");
  },

  methods: {
    cambiarContrasena() {
      axios.post(process.env.VUE_APP_API_BASE_URL+"cambiar-contrasena",
          {
            contrasenaActual: this.contrasenaActual,
            nuevaContrasena: this.nuevaContrasena,
            nuevaContrasena_confirmation: this.repetirContrasena
          })
          .then(() => {
            console.log("Response OK");

            GlobalHelpers.mostrarToast("La contraseña se ha modificado correctamente", "success");

            this.contrasenaActual = "";
            this.nuevaContrasena = "";
            this.repetirContrasena = "";
          })
          .catch(error => {
            console.log("Response KO");
            console.log(error);

            if(error && error.response && error.response.status != 422){
              GlobalHelpers.mostrarToast("Error al intentar modificar la contraseña", "danger");
            }
          })
    }
  }
}
</script>