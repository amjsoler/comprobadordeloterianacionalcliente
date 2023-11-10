<template>
  <div>
    <form>
      <form-group>
        <form-label>Número apostado</form-label>
        <input-control type="number" v-model="numero"></input-control>
        <input-error v-if="errors.numero">{{errors.numero[0]}}</input-error>
      </form-group>
      <form-group>
        <sorteos-disponibles></sorteos-disponibles>
      </form-group>
    </form>

    <div class="fixed-bottom mb-75 d-flex justify-content-center">
      <router-link :to="{name:'ComprobarDecimoQR'}"
                   class="btn btn-lg btn-primary">
        Escanear décimo
        <span class="material-symbols-outlined align-bottom">qr_code_scanner</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import {mapState} from "vuex";
import axios from "axios";
import SorteosDisponibles from "@/components/sorteos/SorteosDisponibles.vue";

export default {
  name: "ComprobarDecimo",
  components: {SorteosDisponibles, InputError, InputControl, FormLabel, FormGroup},
  data() {
    return {
      numero: "",
      reintegro: "",
      serie: "",
      fraccion: "",
      sorteo: ""
    }
  },
  computed: {
    ...mapState(["errors", "message"]),
  },

  mounted(){
    console.log("ComprobarDecimo.vue: Entrando a comprobar décimo sin QR");

    axios.get(process.env.VUE_APP_API_BASE_URL+"sorteos-disponibles")
  },

  methods: {
    comprobarDecimo() {
      axios.post(process.env.VUE_APP_API_BASE_URL+"comprobar-decimo",
          {
            numero: this.numero,
            reintegro: this.numero%10,
            serie: this.serie,
            fraccion: this.fraccion,
            sorteo: this.sorteo
          })
    }
  }
}
</script>