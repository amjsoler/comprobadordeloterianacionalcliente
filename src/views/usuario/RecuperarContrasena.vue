<template>
  <div-centro-pantalla>
    <form>
      <form-label>Dirección de correo</form-label>
      <input-control type="email" required="required" v-model="correo" />
      <input-error v-if="errors.correo">{{ errors.correo[0] }}</input-error>
      <button-submit @submit-click="enviarCorreo">Enviar correo</button-submit>
    </form>
  </div-centro-pantalla>
</template>
<script>
import axios from "axios";

import InputControl from "@/components/generales/formularios/InputControl.vue";
import globalHelpers from "@/helpers/globalHelpers.vue";
import DivCentroPantalla from "@/components/generales/layout/DivCentroPantalla.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import {mapState} from "vuex";

export default {
  name: "RecuperarContrasena",
  components: {InputError, ButtonSubmit, FormLabel, DivCentroPantalla, InputControl},
  data() {
    return {
      correo: ""
    }
  },
  computed: {
    ...mapState(["errors", "message"])
  },
  methods: {
    enviarCorreo() {
      axios.post(process.env.VUE_APP_API_BASE_URL+"recuperar-cuenta",
          {
            correo: this.correo
          })
          .then(() => {
            console.log("OK");
            globalHelpers.mostrarToast("Se ha mandado un correo para que puedas cambiar la contraseña. Revisa tu buzón de correo")
          })
          .catch(() => {
            console.log("KO");
          })
    }
  }
}
</script>