<template>
  <div>
    Comprobar Décimo QR


    <div class="fixed-bottom mb-75 d-flex justify-content-center">
      <router-link :to="{name:'ComprobarDecimo'}"
                   class="btn btn-lg btn-primary">
        Introducir datos
        <span class="material-symbols-outlined align-bottom">pin</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComprobarDecimoQR"
}
</script>