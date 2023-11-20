<template>
  <div class="row d-flex align-items-center">
    <div class="col-6">
      <select class="form-select" :value="modelValue"
              @change="selectChange">
        <option selected>Seleccione un sorteo</option>
        <option v-for="sorteo in sorteosDisponibles" v-bind:key="sorteo.id"
                :value="sorteo.id"
                :id="'option-'+sorteo.id">
          ({{ formatDate(sorteo.fecha) }}) {{ sorteo.nombre }}
        </option>
      </select>
    </div>
    <div class="col-6">
      <img id="imagen-previsualizacion-decimo" class="img-fluid" src="/decimo_estandar.jpeg" @error="imagenDefecto">
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import axios from "axios";

export default {
  name: "SorteosDisponiblesConPreview",

  props: ["modelValue"],

  emits: ["update:modelValue"],
  data() {
    return  {
      sorteosDisponibles: []
    }
  },

  mounted() {
    console.log("Entrando a componente SorteosDisponiblesConPreview.vue");

    axios.get(process.env.VUE_APP_API_BASE_URL+"sorteos-disponibles")
        .then(response => {
          this.sorteosDisponibles = response.data

          //Ahora selecciono el que tenga el model view
          document.getElementById("option-"+this.modelValue).setAttribute("selected", "selected");
        })
        .catch(() => {

        })
  },

  methods: {
    selectChange(event){
      this.cambiarImagenDecimo(event.target.value);

      this.$emit('update:modelValue', event.target.value);
    },

    imagenDefecto(event){
      event.target.src = "/decimo_estandar.jpeg";
    },

    cambiarImagenDecimo(sorteoId){
      document.getElementById("imagen-previsualizacion-decimo").src = process.env.VUE_APP_BASE_URL+"storage/sorteos/"+sorteoId+".jpeg";
    },

    formatDate(dateString) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format('DD/MM/YYYY');
    },
  }

}
</script>