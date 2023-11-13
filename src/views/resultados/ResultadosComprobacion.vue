<template>
  <div-centro-pantalla v-if="premioObtenido.premioTotal > 0" class="text-center">
    ¡Enhorabuena! Este número tiene un premio de {{ premioObtenido.premioTotal }}€
  </div-centro-pantalla>
  <div-centro-pantalla v-else-if="Object.keys(decimoAComprobar).length == 0">
    Los resultados todavía no están disponibles
  </div-centro-pantalla>
  <div-centro-pantalla v-else class="text-center">
    ¡VAYA! Parece que el número {{ decimoAComprobar.numero }} no ha obtenido ningún premio en este sorteo
  </div-centro-pantalla>

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
import DivCentroPantalla from "@/components/generales/DivCentroPantalla.vue";

export default {
  components: {DivCentroPantalla},
  computed: {
    ...mapState(
        "resultados", ["decimoAComprobar", "premioObtenido"]
    )
  }
}
</script>