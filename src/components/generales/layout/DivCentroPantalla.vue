<template>
  <div id="div-centro-pantalla" class="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center">
    <slot></slot>
  </div>
</template>

<style scoped>
  #div-centro-pantalla {
    padding-bottom: 75px;
    overflow: scroll;
  }
</style>

<script>
export default {
  name: "DivCentroPantalla"
}
</script>