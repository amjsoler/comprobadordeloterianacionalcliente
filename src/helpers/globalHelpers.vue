<script>
import {Modal, Toast} from "bootstrap"
import store from "@/store";
import axios from "axios";

export default {
  cerrarTodosLosModalesAbiertos() {
    console.log("globalHelpers.vue: Entrando a cerrarTodosLosModalesAbiertos");

    //Cierro el modal primeroa ntes de redirigir
    var modal = Modal.getInstance(document.querySelector(".modal.show"));

    if(modal){
      modal.hide();
    }
  },

  mostrarToast(mensaje, tipo){
    console.log("globalHelpers.vue: Entrando al mostrarToast con params: {mensaje: " + mensaje + ", tipo: " + tipo + "}");

    store.dispatch("almacenarMensajeToastAction", {mensaje, tipo});

    //Muestro el toast
    Toast.getOrCreateInstance(document.getElementById("toastApp")).show();
  },

  logError(mensaje, contexto){
    console.log("globalHelpers.vue: Entrando al logError");

    axios.post(process.env.VUE_APP_API_BASE_URL+"log-error",
        {
          message: mensaje,
          context: contexto
        });

    console.log("globalHelpers.vue: Saliendo del logError");
  }
}
</script>