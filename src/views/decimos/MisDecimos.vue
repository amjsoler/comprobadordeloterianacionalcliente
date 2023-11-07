<template>
  <router-link :to="{name: 'VerDecimo', params: {id: decimo.id}}"
               v-for="decimo in misDecimos"
               v-bind:key="decimo.id"
               class="text-decoration-none cursor-pointer">
    <div class="card mb-3">
      <div class="g-0 d-flex">
        <div class="col-4">
          <img src="/login.png" class="img-fluid rounded-start" alt="logo">
        </div>
        <div class="col-8">
          <div class="card-body">
            <h5 class="card-title">Nº:{{ decimo.numero}}</h5>
            <p class="card-text">
              S: {{ decimo.serie }}, F: {{ decimo.fraccion }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </router-link>
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