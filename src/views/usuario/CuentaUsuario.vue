<template>
  <contenedor-centrado>
    <div class="position-absolute top-0 end-0 text-danger mt-3 me-3"
         @click="cerrarSesion">
      Cerrar sesión
      <span class="material-symbols-outlined align-bottom">logout</span>
    </div>

    <configuracion-alertas class="mt-5"></configuracion-alertas>
    <cambiar-contrasena class="mt-3"></cambiar-contrasena>
  </contenedor-centrado>
</template>

<script>
import {mapActions} from "vuex";
import CambiarContrasena from "@/components/usuario/CambiarContrasena.vue";
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";
import axios from "axios";
import GlobalHelpers from "@/helpers/globalHelpers.vue";
import ConfiguracionAlertas from "@/components/usuario/ConfiguracionAlertas.vue";

export default {
  name: "CuentaUsuario",
  components: {ConfiguracionAlertas, ContenedorCentrado, CambiarContrasena},

  mounted() {
      console.log("Entrando a CuentaUsuario.vue - Peticionando datos de configuración de la cuenta");

      axios.get(process.env.VUE_APP_API_BASE_URL+"ajustes-cuenta")
          .then(response => {
            console.log(response);
            this.almacenarConfiguracionCuentaUsuarioAction({alertasporcorreo: response.data.alertasporcorreo, alertaspornotificacion: response.data.alertaspornotificacion});
          })
          .catch(() => {
            GlobalHelpers.mostrarToast("Error inesperado al leer la configuración de tu cuenta. Si el problema persiste, contacta con nosotros")
          })
  },
  methods: {
    ...mapActions({
      cerrarSesionAction: "cerrarSesionAction",
      almacenarConfiguracionCuentaUsuarioAction: "usuario/almacenarConfiguracionCuentaUsuarioAction"
    }),

    cerrarSesion() {
      this.cerrarSesionAction();
    },
  }
}
</script>