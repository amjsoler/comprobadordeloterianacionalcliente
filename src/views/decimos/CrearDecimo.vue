<template>
  <form>
    <form-group>
      <form-label>Fecha de sorteo</form-label>
      <input-control v-model="nuevoDecimo.fechaSorteo" type="date" />
      <input-error v-if="errors.fechaSorteo">{{ errors.fechaSorteo[0]}}</input-error>
    </form-group>
    <form-group>
      <form-label>Número</form-label>
      <input-control type="number" v-model="nuevoDecimo.numero" />
      <input-error v-if="errors.numero">{{ errors.numero[0]}}</input-error>
    </form-group>
    <form-group>
      <form-label>Reintegro</form-label>
      <input-control type="number" v-model="nuevoDecimo.reintegro" />
      <input-error v-if="errors.reintegro">{{ errors.reintegro[0]}}</input-error>
    </form-group>
    <form-group>
      <form-label>Serie</form-label>
      <input-control type="number" v-model="nuevoDecimo.serie" />
      <input-error v-if="errors.serie">{{ errors.serie[0]}}</input-error>
    </form-group>
    <form-group>
      <form-label>Fracción</form-label>
      <input-control type="number" v-model="nuevoDecimo.fraccion" />
      <input-error v-if="errors.fraccion">{{ errors.fraccion[0]}}</input-error>
    </form-group>
    <form-group>
      <form-label>¿Cuántos décimos tienes con este número?</form-label>
      <input-control type="number" v-model="nuevoDecimo.cantidad" />
      <input-error v-if="errors.cantidad">{{ errors.cantidad[0]}}</input-error>
    </form-group>
    <button class="btn btn-primary" @click.prevent="crearDecimo">Añadir</button>
  </form>
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

export default {
  name: "CrearDecimo",
  components: {InputError, InputControl, FormGroup, FormLabel},
  data(){
    return {
      nuevoDecimo: {
        fechaSorteo: "",
        numero: "",
        reintegro: "",
        serie: "",
        fraccion: "",
        cantidad: ""
      }
    }
  },
  computed: {
    ...mapState(["errors", "message"])
  },
  mounted() {
    console.log("CrearDecimo.vue: Entrando al CrearDecimo");
  },
  methods: {
    ...mapActions({
      nuevoDecimoAction: "decimos/nuevoDecimoAction",
    }),
    crearDecimo(){
      console.log("CrearDecimo.vue: Entrando al crearDecimo. Realizando petición post...");

      axios.post(process.env.VUE_APP_API_BASE_URL+"mis-decimos/crear",
          {
            sorteo: this.nuevoDecimo.sorteo,
            numero: this.nuevoDecimo.numero,
            reintegro: this.nuevoDecimo.reintegro,
            serie: this.nuevoDecimo.serie,
            fraccion: this.nuevoDecimo.fraccion,
            cantidad: this.nuevoDecimo.cantidad,
          })
          .then(response => {
            console.log("CrearDecimo.vue: Response OK. Almaceno el nuevo décimo en el global state");
            this.nuevoDecimoAction(response.data);

            //Muestro un toast para informar del estado de la acción
            globalHelpers.mostrarToast("El décimo se ha añadido correctamente", "success");

            //Redirijo a la vista de mis décimos
            router.push({name: "MisDecimos"});
          })
          .catch(error => {
            console.log("MisDecimos.vue: Response KO.");
            console.log(error);

            globalHelpers.mostrarToast("No se ha podido añadir el décimo. Por favor, pruebe de nuevo más tarde", "danger");
          })
    },
  }
}
</script>