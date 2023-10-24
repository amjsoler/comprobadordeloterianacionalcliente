<template>
  <div>
    <a v-for="decimo in misDecimos"
       v-bind:key="decimo.id"
       data-bs-target="#verDecimo" data-bs-toggle="modal">
      <div class="card mb-3">
        <div class="g-0 d-flex">
          <div class="col-4">
            <img src="/login.png" class="img-fluid rounded-start" alt="logo">
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title">Nº:{{ decimo.numero}}, R: {{ decimo.reintegro }}</h5>
              <p class="card-text">
                S: {{ decimo.serie }}, F: {{ decimo.fraccion }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
    <!-- asdfasd -->
  </div>

  <modal-general id="verDecimo">
    Todavía no hay resultados disponibles. Vuelve cuando se haya celebrado el sorteo para ver si has tenido suerte.
  </modal-general>
</template>

<script>
import axios from "axios";
import {mapActions, mapState} from "vuex";
import ModalGeneral from "@/components/generales/modales/ModalGeneral.vue";

export default {
  name: "MisDecimos",
  components: {ModalGeneral},
  computed:{
    ...mapState(["misDecimos"]),
  },
  methods: {
    ...mapActions(["almacenarMisDecimos"]),

    editarDecimo(){

    },
    eliminarDecimo(){

    }
  },
  mounted() {
    console.log("MisDecimos.vue: Entrando a mis decimos");
    console.log("MisDecimos.vue: Peticionando listado de mis décimos");

    axios.get(process.env.VUE_APP_API_BASE_URL+"mis-decimos")
        .then(response => {
          console.log("MisDecimos.vue: Respuesta OK. Almaceno el listado de décimos en misdecimos del global storage");

          this.almacenarMisDecimos(response.data);
        })
        .catch(error => {
          console.log("MisDecimos.vue: Respuesta KO. Error desconocido al leer los décimos");
          console.log(error);
        });
  }
}
</script>