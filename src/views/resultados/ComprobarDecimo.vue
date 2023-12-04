<template>
  <contenedor-centrado class="justify-content-center">
    <form>
      <form-group>
        <form-label>Número a comprobar</form-label>
        <input-control type="number" v-model="numero"></input-control>
        <input-error v-if="errors.numero">{{errors.numero[0]}}</input-error>
      </form-group>
      <form-group>
        <ultimos-sorteos-con-premio-con-preview v-model="sorteo"/>
        <input-error v-if="errors.sorteo">{{errors.sorteo[0]}}</input-error>
      </form-group>
      <form-group>
        <button-submit @submit-click="comprobarDecimo">Comprobar</button-submit>
      </form-group>
    </form>

    <!--<div class="fixed-bottom mb-75 ">
      <router-link :to="{name:'ComprobarDecimoQR'}"
                   class="d-inline-flex btn btn-lg btn-primary">
        <span class="material-symbols-outlined fs-1">qr_code_scanner</span>
      </router-link>
    </div>-->
  </contenedor-centrado>
</template>

<script>
import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import {mapActions, mapState} from "vuex";
import axios from "axios";
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";
import router from "@/router";
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";
import UltimosSorteosConPremioConPreview from "@/components/resultados/UltimosSorteosConPremioConPreview.vue";

export default {
  name: "ComprobarDecimo",
  components: {
    UltimosSorteosConPremioConPreview,
    ContenedorCentrado, ButtonSubmit, InputError, InputControl, FormLabel, FormGroup},
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
      almacenarPremioObtenido: "resultados/almacenarPremioObtenidoAction"
    }),
    comprobarDecimo() {
      console.log("comprobarDecimo: Mandando petición...");
      axios.post(process.env.VUE_APP_API_BASE_URL+"comprobar-decimo",
          {
            numero: this.numero,
            reintegro: this.numero%10,
            serie: this.serie,
            fraccion: this.fraccion,
            sorteo: this.sorteo
          })
          .then(response => {
            console.log("Response OK");

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
          .catch(() => {
          })
    }
  }
}
</script>