<template>
  <form-group>
    <form-label>¿A qué sorteo pertenece tu número?</form-label>
    <select class="form-control"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)">
      <option selected="selected">Selecciona un sorteo</option>
      <option v-for="sorteo in sorteosDisponibles"
              v-bind:key="sorteo.id"
              :value="sorteo.id">
        ({{ sorteo.fecha }}) {{ sorteo.nombre }}
      </option>
    </select>
  </form-group>
</template>
<script>
import axios from "axios";
import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";

export default {
  name: "SorteosDisponibles",
  components: {FormLabel, FormGroup},
  props: ["modelValue"],
  emits: ["update:modelValue"],

  data(){
    return {
      sorteosDisponibles: []
    }
  },
  mounted() {
    console.log("SorteosDisponibles.vue: Entrando al componente de sorteos disponibles");

    axios.get(process.env.VUE_APP_API_BASE_URL+"ultimos-resultados")
        .then(response => {
          this.sorteosDisponibles = response.data;
        })
        .catch(error => {
          console.log(error);
        })
  }
}
</script>