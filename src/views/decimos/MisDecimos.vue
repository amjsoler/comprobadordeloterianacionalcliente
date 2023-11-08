<template>
    <div>
        <div v-for="(decimos, key) in dameDecimosAgrupadosPorSorteo"
            v-bind:key="key">
          <div class="row">
            <div class="text-center"
                :class="{'col-10': dimeSiSorteoConResultadosDadoArrayDeDecimos(decimos)}">
              <h3 v-if="decimos[0].sorteo_perteneciente.numero_sorteo"
                  class="">
                Décimos del sorteo {{ decimos[0].sorteo_perteneciente.numero_sorteo }}
              </h3>
              <p>
                {{ decimos[0].sorteo_perteneciente.nombre }} ({{ decimos[0].sorteo_perteneciente.fecha }})
              </p>
            </div>
            <div v-if="dimeSiSorteoConResultadosDadoArrayDeDecimos(decimos)"
                 class="col-2 d-flex align-items-center text-danger">
              <span class="material-symbols-outlined">archive</span>
            </div>
          </div>
          <div v-for="decimo in decimos"
               v-bind:key="decimo.id"
               class="card mb-3 text-decoration-none cursor-pointer">
            <div class="g-0 d-flex">
              <div class="col-8">

                <img :src="dameUrlImagenDecimoDadoIdSorteo(decimo.sorteo)" @error="cargarDecimoEstandar" class="img-fluid rounded-start" alt="imagen del décimo">
              </div>
              <div class="col-4 flex-fill d-flex align-items-center text-center">
                <div class="card-body">
                  <h5 class="card-title">Nº: {{ decimo.numero}}</h5>
                  <p class="card-text">
                    <span v-if="decimo.serie">S: {{ decimo.serie }}</span>
                    <span v-else>S: --</span>,
                    <span v-if="decimo.fraccion">F: {{ decimo.fraccion }}</span>
                    <span v-else>F: --</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="text-center">
              <!--<p v-if="!decimo.premio" class="small">El sorteo todavía no se ha celebrado</p>-->
              <p v-if="decimo.premio === 0" class="small text-danger">Este décimo no está premiado</p>
              <p v-else-if="decimo.premio > 0" class="small text-success">Este décimo tiene un premio de {{decimo.premio}}€ ¡Enhorabuena!</p>
            </div>
          </div>
        </div>
        <router-link :to="{name:'CrearDecimo'}">
          Nuevo décimo
        </router-link>
    </div>
</template>

<script>
import axios from "axios";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "MisDecimos",
  data() {
    return  {
      decimosAgrupados: {}
    }
  },
  computed:{
    ...mapGetters({
      dameDecimosAgrupadosPorSorteo: "decimos/dameDecimosAgrupadosPorSorteo"
    }),
  },

  methods: {
    ...mapActions({
      almacenarListadoMisDecimosAction: "decimos/almacenarListadoMisDecimosAction",
    }),

    dimeSiSorteoConResultadosDadoArrayDeDecimos(decimos){
      if(decimos[0].sorteo_perteneciente.resultados){
        return true;
      }
      else{
        return false;
      }
    },

    cargarDecimoEstandar(event) {
      event.target.src = "decimo_estandar.jpeg"
    },

    dameUrlImagenDecimoDadoIdSorteo(sorteoId) {
      return process.env.VUE_APP_BASE_URL + "storage/sorteos/" + sorteoId + ".jpeg";
    }
  },
  mounted() {
    console.log("MisDecimos.vue: Entrando a mis decimos. Mandando petición para leer los décimos");

    axios.get(process.env.VUE_APP_API_BASE_URL+"mis-decimos")
        .then(response => {
          console.log("MisDecimos.vue: Respuesta OK. Almaceno el listado de décimos en misdecimos del global state");

          this.almacenarListadoMisDecimosAction(response.data);
        })
        .catch(error => {
          console.log("MisDecimos.vue: Respuesta KO. Error desconocido al leer los décimos");
          console.log(error);
        });
  }
}
</script>