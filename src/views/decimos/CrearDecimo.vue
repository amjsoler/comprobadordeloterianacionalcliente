<template>
  <contenedor-centrado>
    <form>
      <form-group>
        <form-label>Fecha de sorteo</form-label>
        <sorteos-disponibles-con-preview v-model="nuevoDecimo.sorteo"></sorteos-disponibles-con-preview>
        <input-error v-if="errors.sorteo">{{ errors.sorteo[0]}}</input-error>
      </form-group>
      <form-group>
        <form-label>Número*</form-label>
        <input-control type="number" v-model="nuevoDecimo.numero" />
        <input-error v-if="errors.numero">{{ errors.numero[0]}}</input-error>
      </form-group>
      <div class="row">
        <form-group class="col-6">
          <form-label>Serie</form-label>
          <input-control type="number" v-model="nuevoDecimo.serie" />
          <input-error v-if="errors.serie">{{ errors.serie[0]}}</input-error>
        </form-group>
        <form-group class="col-6">
          <form-label>Fracción</form-label>
          <input-control type="number" v-model="nuevoDecimo.fraccion" />
          <input-error v-if="errors.fraccion">{{ errors.fraccion[0]}}</input-error>
        </form-group>
      </div>
      <form-group>
        <button-submit @submit-click="crearDecimo">Guardar décimo</button-submit>
      </form-group>
    </form>
  </contenedor-centrado>
</template>

<script>
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import axios from "axios";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import {mapActions, mapState} from "vuex";
import globalHelpers from "@/helpers/globalHelpers.vue";
import router from "@/router";
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";
import SorteosDisponiblesConPreview from "@/components/sorteos/SorteosDisponiblesConPreview.vue";

export default {
  name: "CrearDecimo",
  components: {
    SorteosDisponiblesConPreview,
    ContenedorCentrado, ButtonSubmit, InputError, InputControl, FormGroup, FormLabel},
  data(){
    return {
      nuevoDecimo: {
        sorteo: "",
        numero: "",
        reintegro: "",
        serie: "",
        fraccion: "",
        cantidad: ""
      },
    }
  },
  computed: {
    ...mapState(["errors", "message"])
  },
  mounted() {
    console.log("CrearDecimo.vue: Entrando al CrearDecimo. Consulto los sorteos disponibles");


  },
  methods: {
    ...mapActions({
      nuevoDecimoAction: "decimos/nuevoDecimoAction",
    }),

    crearDecimo(){
      console.log("CrearDecimo.vue: Entrando al crearDecimo. Realizando petición post...");

      axios.post(process.env.VUE_APP_API_BASE_URL+"mis-decimos",
          {
            sorteo: this.nuevoDecimo.sorteo,
            numero: this.nuevoDecimo.numero,
            reintegro: this.nuevoDecimo.numero % 10,
            serie: this.nuevoDecimo.serie,
            fraccion: this.nuevoDecimo.fraccion,
            cantidad: 1
          })
          .then(response => {
            console.log("CrearDecimo.vue: Response OK. Almaceno el nuevo décimo en el global state");
            this.nuevoDecimoAction(response.data);

            //Muestro un toast para informar del estado de la acción
            globalHelpers.mostrarToast("El décimo se ha añadido correctamente", "success");

            //Redirijo a la vista de mis décimos
            router.push({name: "MisDecimos"});
          })
          .catch(() => {
            console.log("MisDecimos.vue: Response KO");
          })
    },
  }
}
</script>