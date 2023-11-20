<template>
  <div v-if="premioObtenido.premioTotal > 0" class="text-center">
    ¡Enhorabuena! Este número tiene un premio de {{ premioObtenido.premioTotal }}€
  </div>
  <div v-else-if="Object.keys(decimoAComprobar).length == 0">
    Los resultados todavía no están disponibles
  </div>
  <div v-else class="text-center">
    ¡VAYA! Parece que el número {{ decimoAComprobar.numero }} no ha obtenido ningún premio en este sorteo
  </div>

  <div>
    <div class="fixed-bottom mb-75 text-center">
      <router-link :to="{name: 'ComprobarDecimoQR'}"
                    class="btn btn-primary">
        Comprobar otro número
      </router-link>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState(
        "resultados", ["decimoAComprobar", "premioObtenido"]
    )
  }
}
</script>