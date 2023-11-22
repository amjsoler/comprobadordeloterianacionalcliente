<template>
  <contenedor-centrado>
    <form>
      <form-group>
        <form-label>Seleccione el sorteo</form-label>
        <select :value="selectedIndex" class="form-control" @change="cambiarSelectedIndex">
          <option v-for="(sorteo, index) in ultimosResultados"
                  v-bind:key="sorteo.id"
                  :value="index">
            {{ sorteo.nombre }} ({{ fechaFormateada(sorteo.fecha) }})
          </option>
        </select>
      </form-group>
    </form>

    <div class="mt-3 w-100">
        <tarjeta-premio v-for="(resultado, index) in ultimosResultados[selectedIndex].resultados"
                        v-bind:key="index"
                        :nombre="dameNombrePremio(resultado.nombre)"
                        :premio="resultado.premio">
          <div v-if="resultado.nombre=='especial'">
            <p class="card fs-3 fw-bold mb-0">
              {{ resultado.numero.split("&")[0] }}
            </p>
            <div class="row">
              <div class="col-6 fs-4">
                S: {{ resultado.numero.split("&")[1] }}
              </div>
              <div class="col-6 fs-4">
                F: {{ resultado.numero.split("&")[2] }}
              </div>
            </div>
          </div>
          <div v-if="resultado.nombre=='primero'">
            <p class="card fs-3 fw-bold mb-0">
              {{ resultado.numero.split("&")[0] }}
            </p>
          </div>
          <div v-if="resultado.nombre=='segundo'">
            <p class="card fs-3 fw-bold mb-0">
              {{ resultado.numero.split("&")[0] }}
            </p>
          </div>
          <div v-if="resultado.nombre=='4cifras'">
            <div class="d-flex flex-row flex-wrap justify-content-center">
              <div class="card fw-bold ms-3 mb-3 pt-1 pb-1 ps-2 pe-2" v-for="(numero, key) in resultado.numero.split('&')" v-bind:key="key">{{ numero }}</div>
            </div>
          </div>
          <div v-if="resultado.nombre=='3cifras'">
            <div class="d-flex flex-row flex-wrap justify-content-center">
              <div class="card fs-085 fw-bold ms-3 mb-3 pt-1 pb-1 ps-2 pe-2" v-for="(numero, key) in resultado.numero.split('&')" v-bind:key="key">{{ numero }}</div>
            </div>
          </div>
          <div v-if="resultado.nombre=='2cifras'">
            <div class="d-flex flex-row flex-wrap justify-content-center">
              <div class="card fs-5 fw-bold pt-1 pb-1 ps-2 pe-2 me-2" v-for="(numero, key) in resultado.numero.split('&')" v-bind:key="key">{{ numero }}</div>
            </div>
          </div>
          <div v-if="resultado.nombre=='aproximacionesprimero'">
            <p class="card fs-4 fw-bold" v-for="(numero, key) in resultado.numero.split('&')" v-bind:key="key">{{ numero }}</p>
          </div>
          <div v-if="resultado.nombre=='aproximacionessegundo'">
            <p class="card fs-4 fw-bold" v-for="(numero, key) in resultado.numero.split('&')" v-bind:key="key">Nº: {{ numero }}</p>
          </div>
          <div v-if="resultado.nombre=='centenaprimero'">
            <div class="card pe-3 ps-3 pt-2 pb-2 mb-2">
              <p class="mb-0">Desde el Nº: </p>
              <p class="fs-4 fw-bold mb-0">{{ resultado.numero.split('&')[0] }}</p>
            </div>
            <div class="card pe-3 ps-3 pt-2 pb-2 mb-2">
              <p class="mb-0">Hasta el Nº:</p>
              <p class="fs-4 fw-bold mb-0">{{ resultado.numero.split('&')[1] }}</p>
            </div>
          </div>
          <div v-if="resultado.nombre=='centenasegundo'">
            <div class="card pe-3 ps-3 pt-2 pb-2 mb-2">
              <p class="mb-0">Desde el Nº: </p>
              <p class="fs-4 fw-bold mb-0">{{ resultado.numero.split('&')[0] }}</p>
            </div>
            <div class="card pe-3 ps-3 pt-2 pb-2 mb-2">
              <p class="mb-0">Hasta el Nº:</p>
              <p class="fs-4 fw-bold mb-0">{{ resultado.numero.split('&')[1] }}</p>
            </div>
          </div>
          <div v-if="resultado.nombre=='3terminacionesprimero'">
            <div class="d-flex justify-content-center">
              <p class="card d-inline-block mb-0 p-2 fs-4">
                XX<span class="fw-bold d-inline-block">{{ resultado.numero }}</span>
              </p>
            </div>
          </div>
          <div v-if="resultado.nombre=='2terminacionesprimero'">
            <div class="d-flex justify-content-center">
              <p class="card d-inline-block mb-0 p-2 fs-4">
                XXX<span class="fw-bold d-inline-block">{{ resultado.numero }}</span>
              </p>
            </div>
          </div>
          <div v-if="resultado.nombre=='1terminacionprimero'">
            <div class="d-flex justify-content-center">
              <p class="card d-inline-block mb-0 p-2 fs-4">
                XXXX<span class="fw-bold d-inline-block">{{ resultado.numero }}</span>
              </p>
            </div>
          </div>
          <div v-if="resultado.nombre=='reintegros'">
            <div class="d-flex flex-row justify-content-center">
              <p class="card mb-0 ps-2 pe-2 pt-1 pb-1 me-3 fs-4 fw-bold" v-for="(numero, key) in resultado.numero.split('&')" v-bind:key="key">{{ numero }}</p>
            </div>
          </div>
        </tarjeta-premio>
      </div>
    </contenedor-centrado>
</template>

<script>
import axios from "axios";
import {mapActions, mapState} from "vuex";
import TarjetaPremio from "@/components/resultados/TarjetaPremio.vue";
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import globalHelpers from "@/helpers/globalHelpers.vue";

export default {
  name: "UltimosResultados",
  components: {FormGroup, FormLabel, ContenedorCentrado, TarjetaPremio},

  computed: {
    ...mapState(
        "resultados", ["ultimosResultados", "selectedIndex"]
    )
  },
  mounted() {
    console.log("ÚltimosResultados.vue: Entrando al últimos resultados. Peticionando resultados...");

    axios.get(process.env.VUE_APP_API_BASE_URL+"ultimos-resultados")
        .then(response => {
          console.log("Response OK");
          this.almacenarUltimosResultadosAction(response.data);

          if(!this.selectedIndex){
            this.almacenarSelectedIndexAction(0);
          }
        })
        .catch(() => {
          console.log("Response KO");
        })
  },

  methods: {
    ...mapActions({
      almacenarUltimosResultadosAction: "resultados/almacenarUltimosResultadosAction",
      almacenarSelectedIndexAction: "resultados/almacenarSelectedIndexAction"
    }),

    fechaFormateada(fecha) {
        return globalHelpers.formatDate(fecha)
    },

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
  },
}
</script>