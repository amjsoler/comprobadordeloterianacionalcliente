<template>
  <div>
    <form>
      <select :value="selectedIndex" class="form-control" @change="cambiarSelectedIndex">
        <option v-for="(sorteo, index) in ultimosResultados"
                v-bind:key="sorteo.id"
                :value="index">
          {{ sorteo.nombre }} ({{ formatDate(sorteo.fecha) }})
        </option>
      </select>
    </form>

    <div>
        <tarjeta-premio v-for="(resultado, index) in ultimosResultados[selectedIndex].resultados"
                        v-bind:key="index"
                        :nombre="dameNombrePremio(resultado.nombre)"
                        :premio="resultado.premio">
          <div v-if="resultado.nombre=='especial'">
            <div class="row justify-content-center fw-bold">
              Nº: {{ resultado.numero.split("&")[0] }}
            </div>
            <div class="row">
              <div class="col-6 text-center">
                S: {{ resultado.numero.split("&")[1] }}
              </div>
              <div class="col-6 text-center">
                F: {{ resultado.numero.split("&")[2] }}
              </div>
            </div>
          </div>
          <div v-if="resultado.nombre=='primero'">
            <div class="row justify-content-center fw-bold">
              Nº: {{ resultado.numero.split("&")[0] }}
            </div>
          </div>
          <div v-if="resultado.nombre=='segundo'">
            <div class="row justify-content-center fw-bold">
              Nº: {{ resultado.numero.split("&")[0] }}
            </div>
          </div>
          <div v-if="resultado.nombre=='4cifras'">
            <div class="fw-bold d-flex flex-row flex-wrap justify-content-center">
              <div class="card" v-for="(numero, key) in resultado.numero.split('&')" v-bind:key="key">{{ numero }}</div>
            </div>
          </div>
          <div v-if="resultado.nombre=='3cifras'">
            <div class="fw-bold d-flex flex-row flex-wrap justify-content-center">
              <div class="card" v-for="(numero, key) in resultado.numero.split('&')" v-bind:key="key">{{ numero }}</div>
            </div>
          </div>
          <div v-if="resultado.nombre=='2cifras'">
            <div class="fw-bold d-flex flex-row flex-wrap justify-content-center">
              <div class="card" v-for="(numero, key) in resultado.numero.split('&')" v-bind:key="key">{{ numero }}</div>
            </div>
          </div>
          <div v-if="resultado.nombre=='aproximacionesprimero'">
            <div class="card" v-for="(numero, key) in resultado.numero.split('&')" v-bind:key="key">Nº: {{ numero }}</div>
          </div>
          <div v-if="resultado.nombre=='aproximacionessegundo'">
            <div class="card" v-for="(numero, key) in resultado.numero.split('&')" v-bind:key="key">Nº: {{ numero }}</div>
          </div>
          <div v-if="resultado.nombre=='centenaprimero'">
            <div class="card">Desde el Nº: {{ resultado.numero.split('&')[0] }}</div>
            <div class="card">Hasta el Nº: {{ resultado.numero.split('&')[1] }}</div>
          </div>
          <div v-if="resultado.nombre=='centenasegundo'">
            <div class="card">Desde el Nº: {{ resultado.numero.split('&')[0] }}</div>
            <div class="card">Hasta el Nº: {{ resultado.numero.split('&')[1] }}</div>
          </div>
          <div v-if="resultado.nombre=='3terminacionesprimero'">
            <div class="fw-bold d-flex flex-row flex-wrap justify-content-center">
              <div class="card">XX{{ resultado.numero }}</div>
            </div>
          </div>
          <div v-if="resultado.nombre=='2terminacionesprimero'">
            <div class="fw-bold d-flex flex-row flex-wrap justify-content-center">
              <div class="card">XXX{{ resultado.numero }}</div>
            </div>
          </div>
          <div v-if="resultado.nombre=='1terminacionprimero'">
            <div class="fw-bold d-flex flex-row flex-wrap justify-content-center">
              <div class="card">XXXX{{ resultado.numero }}</div>
            </div>
          </div>
          <div v-if="resultado.nombre=='reintegros'">
            <div class="fw-bold d-flex flex-row flex-wrap justify-content-center">
              <div class="card" v-for="(numero, key) in resultado.numero.split('&')" v-bind:key="key">{{ numero }}</div>
            </div>
          </div>
        </tarjeta-premio>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import {mapActions, mapState} from "vuex";
import dayjs from "dayjs";
import TarjetaPremio from "@/components/resultados/TarjetaPremio.vue";

export default {
  name: "UltimosResultados",
  components: {TarjetaPremio},

  computed: {
    ...mapState(
        "resultados", ["ultimosResultados", "selectedIndex"]
    )
  },
  mounted() {
    console.log("ÚltimosResultados.vue: Entrando al ultimos resultados. Peticionando resultados...");

    axios.get(process.env.VUE_APP_API_BASE_URL+"ultimos-resultados")
        .then(response => {
          this.almacenarUltimosResultadosAction(response.data);

          if(!this.selectedIndex){
            this.almacenarSelectedIndexAction(0);
          }
        })
        .catch(error => {
            console.log(error);
        })
  },

  methods: {
    ...mapActions({
      almacenarUltimosResultadosAction: "resultados/almacenarUltimosResultadosAction",
      almacenarSelectedIndexAction: "resultados/almacenarSelectedIndexAction"
    }),

    cambiarSelectedIndex(event){
        this.almacenarSelectedIndexAction(event.target.value);
    },

    dameNombrePremio(cadena){
      switch (cadena){
        case "especial":
          return "Premio especial";
        case "primero":
          return "Primer premio";
        case "segundo":
          return "Segundo premio";
        case "4cifras":
          return "Premio a las 4 últimas cifras";
        case "3cifras":
          return "Premio a las 3 últimas cifras";
        case "2cifras":
          return "Premio a las 2 últimas cifras";
        case "aproximacionesprimero":
          return "Aproximación al primer premio";
        case "aproximacionessegundo":
          return "Aproximación al segundo premio";
        case "centenaprimero":
          return "Centena del primer premio";
        case "centenasegundo":
          return "Centena del segundo premio";
        case "3terminacionesprimero":
          return "3 terminaciones del primer premio";
        case "2terminacionesprimero":
          return "2 terminaciones del primer premio";
        case "1terminacionprimero":
          return "Terminación del primer premio";
        case "reintegros":
          return "Reintegros";
      }
    },

    formatDate(dateString) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format('DD/MM/YYYY');
    },
  },
}
</script>