<template>
  <contenedor-centrado class="justify-content-center">
    <p class="text-danger fs-4">Parece ser que tu cuenta todavía no está verificada</p>
    <p>Te hemos enviado un correo con un enlace cuando te has registrado. Para activar tu cuenta, simplemente tienes que pulsar en este enlace</p>
    <p>Si no encuentras el correo, te podemos volver a enviar el correo</p>
    <p>
      <button-submit @submit-click="volverAEnviarCorreoDeVerificacion">Volver a enviar correo de verificación</button-submit>
    </p>

  </contenedor-centrado>
</template>

<script>
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";
import axios from "axios";
import GlobalHelpers from "@/helpers/globalHelpers.vue";

export  default {
  name: "VerificarCuenta",
  components: {ButtonSubmit, ContenedorCentrado},

  mounted() {
    console.log("Entrando a VerificarCuenta.vue");
  },

  methods: {
    volverAEnviarCorreoDeVerificacion(){
      console.log("Enviando correo de verificación...");

      axios.get(process.env.VUE_APP_API_BASE_URL+"verificar-cuenta")
          .then(() => {
            console.log("Response OK");

            GlobalHelpers.mostrarToast("¡Mensaje enviado! Revisa tu buzón", "success");
          })
          .catch(() => {
           console.log("Response KO");
          })
    }
  }
}
</script>