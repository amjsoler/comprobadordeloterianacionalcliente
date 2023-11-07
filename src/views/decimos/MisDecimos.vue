<template>
    <div>
        <div v-for="decimo in misDecimos"
             v-bind:key="decimo.id"
             class="card mb-3 text-decoration-none cursor-pointer">
            <div class="g-0 d-flex">
                <div class="col-8">

                    <img src="/s90_2023_pc.jpg" class="img-fluid rounded-start" alt="imagen del décimo">
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
                        <p v-if="!decimo.premio" class="small">El sorteo todavía no se ha celebrado</p>
                        <p v-else-if="decimo.premio == 0" class="small">Este décimo no está premiado</p>
                        <p v-else class="small text-success">Este décimo tiene un premio de {{decimo.premio}}€ ¡Enhorabuena!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <router-link :to="{name:'CrearDecimo'}">
    Nuevo décimo
  </router-link>
</template>

<script>
import axios from "axios";
import {mapActions, mapState} from "vuex";

export default {
  name: "MisDecimos",
  computed:{
    ...mapState(
        "decimos", ["misDecimos"]
    ),
  },

  methods: {
    ...mapActions({
      almacenarListadoMisDecimosAction: "decimos/almacenarListadoMisDecimosAction"
    }),
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