<template>
  <div>
    <form>
      <form-group>
        <form-label>Número apostado</form-label>
        <input-control type="number" v-model="numero"></input-control>
        <input-error v-if="errors.numero">{{errors.numero[0]}}</input-error>
      </form-group>
      <form-group>
        <sorteos-disponibles v-model="sorteo"></sorteos-disponibles>
      </form-group>
      <button-submit @submit-click="comprobarDecimo">Comprobar</button-submit>
    </form>

    <div class="fixed-bottom mb-75 d-flex justify-content-center">
      <router-link :to="{name:'ComprobarDecimoQR'}"
                   class="btn btn-lg btn-primary">
        <span class="material-symbols-outlined align-middle">qr_code_scanner</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import {mapActions, mapState} from "vuex";
import axios from "axios";
import SorteosDisponibles from "@/components/sorteos/SorteosDisponibles.vue";
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";
import router from "@/router";

export default {
  name: "ComprobarDecimo",
  components: {ButtonSubmit, SorteosDisponibles, InputError, InputControl, FormLabel, FormGroup},
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
  },

  methods: {
    ...mapActions({
      almacenarDecimoAComprobarAction: "resultados/almacenarDecimoAComprobarAction",
      almacenarPremioObtenido: "resultados/almacenarPremioObtenido"
    }),
    comprobarDecimo() {
      axios.post(process.env.VUE_APP_API_BASE_URL+"comprobar-decimo",
          {
            numero: this.numero,
            reintegro: this.numero%10,
            serie: this.serie,
            fraccion: this.fraccion,
            sorteo: this.sorteo
          })
          .then(response => {
            console.log(response);

            //Guardo el premio y el número en el state
            const decimoAComprobar = {
              numero: this.numero,
              reintegro: this.numero%10,
              serie: this.serie,
              fraccion: this.fraccion,
              sorteo: this.sorteo
            }

            this.almacenarDecimoAComprobarAction(decimoAComprobar);

            const premioObtenido = {
              premioTotal: response.data.premioTotal,
              premiosObtenidos: response.data.premiosObtenidos
            }

            this.almacenarPremioObtenido(premioObtenido);

            //Después redirijo a la vista para pintar el premio
            router.push({name: "ResultadosComprobacion"});
          })
          .catch(error => {
            console.log(error);
          })
    }
  }
}
</script>