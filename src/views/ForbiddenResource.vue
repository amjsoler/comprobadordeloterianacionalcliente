<template>
  <contenedor-centrado class="justify-content-center">
     <p class="fs-2 text-danger ps-3 pe-3">No puedes acceder a este contenido</p>
  </contenedor-centrado>
</template>

<script>
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";

export default {
  name: "ForbiddenResource",
  components: {ContenedorCentrado}
}
</script>