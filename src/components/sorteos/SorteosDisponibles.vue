<template>
  <select>
    <option v-for="sorteo in sorteosDisponibles"
            v-bind:key="sorteo.id">
      ({{ sorteo.fecha }}) {{ sorteo.nombre }}
    </option>
  </select>
</template>
<script>
import axios from "axios";

export default {
  name: "SorteosDisponibles",

  data(){
    return {
      sorteosDisponibles: []
    }
  },
  mounted() {
    console.log("SorteosDisponibles.vue: Entrando al componente de sorteos disponibles");

    axios.get(process.env.VUE_APP_API_BASE_URL+"sorteos-disponibles")
        .then(response => {
          this.sorteosDisponibles = response.data;
        })
        .catch(error => {
          console.log(error);
        })
  }
}
</script>