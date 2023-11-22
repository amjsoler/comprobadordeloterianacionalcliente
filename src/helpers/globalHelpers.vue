<script>
import {Modal, Toast} from "bootstrap"
import store from "@/store";
import axios from "axios";
import dayjs from "dayjs";

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
    store.dispatch("almacenarMensajeToastAction", {mensaje, tipo});

    //Primero quito las clases de color
    document.getElementById("toastApp").classList.remove("text-bg-primary");
    document.getElementById("toastApp").classList.remove("text-bg-success");
    document.getElementById("toastApp").classList.remove("text-bg-danger");

    switch(tipo){
      case "default":
        document.getElementById("toastApp").classList.add("text-bg-primary");
        break;
      case "success":
        document.getElementById("toastApp").classList.add("text-bg-success");
        break;
      case "danger":
        document.getElementById("toastApp").classList.add("text-bg-danger");
        break;
      default:
        document.getElementById("toastApp").classList.add("text-bg-primary");
        break;
    }

    //Muestro el toast
    new Toast("#toastApp").show();
  },

  logError(mensaje, contexto){
    console.log("globalHelpers.vue: Entrando al logError");

    axios.post(process.env.VUE_APP_API_BASE_URL+"log-error",
        {
          message: mensaje,
          context: contexto
        });

    console.log("globalHelpers.vue: Saliendo del logError");
  },

  formatDate(dateString) {
    const date = dayjs(dateString);
    // Then specify how you want your dates to be formatted
    return date.format('DD/MM/YYYY');
  },
}
</script>