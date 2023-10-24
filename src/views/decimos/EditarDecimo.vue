<template>
  Mis decimos editar
</template>

<script>
import axios from "axios";
import globalHelpers from "@/helpers/globalHelpers.vue";

export default {
  name: "MisDecimosEditar",
  methods: {
    eliminarDecimo(){
      console.log("MisDecimos.vue: Entrando al eliminarDecimo. Realizando petición delete...");

      axios.delete(process.env.VUE_APP_API_BASE_URL+"mis-decimos/"+this.misDecimos[this.mostrandoDecimoKey].id)
          .then(() => {
            console.log("MisDecimos.vue: Response OK. Elimino el décimo del global state");

            this.eliminarDecimoAction(this.mostrandoDecimoKey);

            globalHelpers.cerrarTodosLosModalesAbiertos();

            globalHelpers.mostrarToast("El décimo se ha eliminado correctamente", "success");
          })
          .catch(error => {
            console.log("MisDecimos.vue: Response KO. Muestro un mensaje de error");

            console.log(error);

            globalHelpers.mostrarToast("Ha habido un problema al eliminar el décimo. Prueba de nuevo más tarde", "danger");
          })
    }
  }
}
</script>