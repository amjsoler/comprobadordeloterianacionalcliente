<template>
  <div id="contenedor-centrado" class="d-flex flex-column text-center align-items-center pt-3">
    <slot/>
  </div>
</template>

<style scoped>
  #contenedor-centrado {
    padding-bottom: 75px;
  }
</style>

<script>
  export default {
    name: "ContenedorCentrado",
  }
</script>