<template>
  <div class="row d-flex align-items-center">
    <div class="col-6">
      <select id="select-sorteo" class="form-select" :value="modelValue"
              @change="selectChange">
        <option disabled value="">Seleccione un sorteo</option>
        <option v-for="sorteo in ultimosSorteosConPremio" v-bind:key="sorteo.id"
                :value="sorteo.id"
                :id="'option-'+sorteo.id">
          ({{ formatearFecha(sorteo.fecha) }}) {{ sorteo.nombre }}
        </option>
      </select>
    </div>
    <div class="col-6">
      <img id="imagen-previsualizacion-decimo" class="img-fluid" src="/decimo_estandar.jpeg" @error="imagenDefecto">
    </div>
  </div>
</template>
<script>
import axios from "axios";
import globalHelpers from "@/helpers/globalHelpers.vue";

export default {
  name: "UltimosSorteosConPremioConPreview",

  props: ["modelValue"],

  emits: ["update:modelValue"],
  data() {
    return  {
      ultimosSorteosConPremio: []
    }
  },

  mounted() {
    console.log("Entrando a componente UltimosSorteosConPremioConPreview.vue");

    axios.get(process.env.VUE_APP_API_BASE_URL+"ultimos-resultados")
        .then(response => {
          this.ultimosSorteosConPremio = response.data
        })
        .catch(() => {

        })
        .finally(() =>{
          document.getElementById("option-"+this.ultimosSorteosConPremio[0].id).selected = true;
          this.$emit('update:modelValue', this.ultimosSorteosConPremio[0].id);

          //Actualizamos la imagen del sorteo seleccionado
          this.cambiarImagenDecimo(this.modelValue);

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

    formatearFecha(fecha){
      return globalHelpers.formatDate(fecha);
    }
  }
}
</script>