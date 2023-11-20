<template>
  <div id="contenedor-centrado" class="d-flex flex-column text-center align-items-center pt-3">
    <slot/>
  </div>
</template>

<style scoped>
  #contenedor-centrado {
    height: calc(100% - 75px);
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>

<script>
  export default {
    name: "ContenedorCentrado",
  }
</script>