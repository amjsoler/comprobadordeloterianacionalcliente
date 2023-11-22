<template>
  <contenedor-centrado class="justify-content-center">
    <div v-if="premioObtenido.premioTotal > 0" class="text-center fs-2">
      ¡Enhorabuena! Este décimo tiene un premio de <span class="text-success fw-bold">{{ premioObtenido.premioTotal }}€</span>
    </div>
    <div v-else-if="Object.keys(decimoAComprobar).length == 0" class="text-center fs-2">
      Los resultados todavía no están disponibles
    </div>
    <div v-else class="text-center fs-2">
      ¡VAYA! Parece que el décimo <span class="fw-bold">{{ decimoAComprobar.numero }}</span> no ha obtenido ningún premio en este sorteo
    </div>

    <div>
      <div class="fixed-bottom mb-75 text-center">
        <router-link :to="{name: 'ComprobarDecimoQR'}"
                     class="btn btn-primary">
          Comprobar otro décimo
        </router-link>
      </div>
    </div>
  </contenedor-centrado>
</template>
<script>
import {mapState} from "vuex";
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";

export default {
  components: {ContenedorCentrado},
  computed: {
    ...mapState(
        "resultados", ["decimoAComprobar", "premioObtenido"]
    )
  }
}
</script>