<template>
  <div class="accordion w-100" id="eliminarCuentaContainer">
    <div class="accordion-item w-100">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed bg-danger text-white" type="button" data-bs-toggle="collapse" data-bs-target="#eliminarCuentaAccordion" aria-expanded="true" aria-controls="eliminarCuentaAccordion">
          Eliminar cuenta
        </button>
      </h2>
      <div id="eliminarCuentaAccordion" class="accordion-collapse collapse w-100 mt-4" aria-labelledby="headingOne" data-bs-parent="#eliminarCuentaContainer">
        <p>Si sigues adelante con este proceso, toda la información de tu cuenta se eliminará, incluyendo tus décimos así como las alertas de posibles premios en los mismos</p>
        <p class="fw-bold">¿Estás seguro de querer eliminar tu cuenta?</p>
        <button-submit @submit-click="eliminarCuenta" class="text-white btn-danger">Eliminar esta cuenta</button-submit>
      </div>
    </div>
  </div>
</template>
<script>

import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";
import axios from "axios";

export default {
  name: "EliminarCuenta",
  components: {ButtonSubmit},

  methods: {
    eliminarCuenta() {
      axios.get(process.env.VUE_APP_API_BASE_URL+"eliminar-cuenta")
          .then(() => {
            this.$store.dispatch("cerrarSesionAction");
          })
          .catch(() => {

          })
    }
  }
}
</script>