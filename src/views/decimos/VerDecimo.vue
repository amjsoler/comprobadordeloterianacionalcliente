<template>
  {{ dameDecimoDadoId(this.$route.params.id) }}
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import axios from "axios";

export default {
  name: "VerDecimo",
  computed:{
    ...mapState(
        "decimos", ["misDecimos"]
    ),

    ...mapGetters('decimos',["dameDecimoDadoId"]),
  },

  mounted() {
    console.log("VerDecimo.vue: Entrando al VerDecimo.vue. Lanzando petición para traer nuevos datos");

    axios.get(process.env.VUE_APP_API_BASE_URL+"mis-decimos/"+this.$route.params.id)
        .then(response => {
          console.log("VerDecimo.vue: Entrando al VerDecimo.vue. Response OK. Almaceno en décimos el décimo leido");

          this.EditarDecimoAction(response.data);
        })
        .catch(error => {
          console.log("VerDecimo.vue: Entrando al VerDecimo.vue. Response KO");
          console.log(error);
        })
  },
  methods: {
    ...mapActions({
      EditarDecimoAction: "decimos/EditarDecimoAction"
    }),
  }
}
</script>