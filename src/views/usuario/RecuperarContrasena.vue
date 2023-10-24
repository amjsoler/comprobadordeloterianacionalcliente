<template>
  <div-centro-pantalla>
    <form-label>Dirección de correo</form-label>
    <input-control type="email" v-model="email" />
    <button class="btn btn-primary mt-3" @click="enviarCorreo">Enviar correo</button>
  </div-centro-pantalla>
</template>
<script>
import axios from "axios";

import InputControl from "@/components/generales/formularios/InputControl.vue";
import globalHelpers from "@/helpers/globalHelpers.vue";
import DivCentroPantalla from "@/components/generales/DivCentroPantalla.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";

export default {
  name: "RecuperarContrasena",
  components: {FormLabel, DivCentroPantalla, InputControl},
  data() {
    return {
      email: ""
    }
  },
  methods: {
    enviarCorreo() {
      axios.post(process.env.VUE_APP_API_BASE_URL+"recuperar-contrasena",
          {
            email: this.email
          })
          .then(() => {
            console.log("OK");
            globalHelpers.mostrarToast("Se ha mandado un correo para que puedas cambiar la contraseña. Revisa tu buzón de correo", "success")
          })
          .catch(() => {
            console.log("KO");
          })
    }
  }
}
</script>