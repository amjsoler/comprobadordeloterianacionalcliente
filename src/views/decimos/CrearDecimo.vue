<template>
  <div>
    <form>
      <form-group>
        <form-label>Fecha de sorteo</form-label>
        <div class="row d-flex align-items-center">
          <div class="col-6">
            <select class="form-select" v-model="nuevoDecimo.sorteo" @change="cambiarImagenDecimo">
              <option selected>Seleccione un sorteo</option>
              <option v-for="sorteo in sorteosDisponibles" v-bind:key="sorteo.id" :value="sorteo.id">({{ formatDate(sorteo.fecha) }}) {{ sorteo.nombre }}</option>
            </select>
          </div>
          <div class="col-6">
            <img id="imagen-previsualizacion-decimo" class="img-fluid" src="/decimo_estandar.jpeg" @error="imagenDefecto">
          </div>
        </div>
        <input-error v-if="errors.sorteo">{{ errors.sorteo[0]}}</input-error>
      </form-group>
      <form-group>
        <form-label>Número*</form-label>
        <input-control type="number" v-model="nuevoDecimo.numero" />
        <input-error v-if="errors.numero">{{ errors.numero[0]}}</input-error>
      </form-group>
      <!--<form-group>
        <form-label>Reintegro</form-label>
        <input-control type="number" v-model="nuevoDecimo.reintegro" />
        <input-error v-if="errors.reintegro">{{ errors.reintegro[0]}}</input-error>
      </form-group>-->
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
      <!--<form-group>
        <form-label>¿Cuántos décimos tienes con este número?</form-label>
        <input-control type="number" v-model="nuevoDecimo.cantidad" />
        <input-error v-if="errors.cantidad">{{ errors.cantidad[0]}}</input-error>
      </form-group>-->
      <button-submit @submit-click="crearDecimo">Guardar décimo</button-submit>
    </form>
  </div>
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
import dayjs from 'dayjs';
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";

export default {
  name: "CrearDecimo",
  components: {ButtonSubmit, InputError, InputControl, FormGroup, FormLabel},
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

      sorteosDisponibles: []
    }
  },
  computed: {
    ...mapState(["errors", "message"])
  },
  mounted() {
    console.log("CrearDecimo.vue: Entrando al CrearDecimo. Consulto los sorteos disponibles");

    axios.get(process.env.VUE_APP_API_BASE_URL+"sorteos-disponibles")
        .then(response => {
          this.sorteosDisponibles = response.data
        })
        .catch(error => {
          console.log(error);
        })
  },
  methods: {
    ...mapActions({
      nuevoDecimoAction: "decimos/nuevoDecimoAction",
    }),

    imagenDefecto(event){
      event.target.src = "/decimo_estandar.jpeg";
    },

    cambiarImagenDecimo(){
      document.getElementById("imagen-previsualizacion-decimo").src = process.env.VUE_APP_BASE_URL+"storage/sorteos/"+this.nuevoDecimo.sorteo+".jpeg";
    },

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

    formatDate(dateString) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format('DD/MM/YYYY');
    }
  }
}
</script>