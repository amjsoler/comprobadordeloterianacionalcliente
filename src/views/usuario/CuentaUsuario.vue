<template>
  <contenedor-centrado>
    <div class="w-100 text-end text-danger mt-3 me-3"
         @click="cerrarSesion">
      Cerrar sesión
      <span class="material-symbols-outlined align-bottom">logout</span>
    </div>

    <configuracion-alertas class="mt-3"></configuracion-alertas>
    <cambiar-contrasena class="mt-3"></cambiar-contrasena>
    <enviar-sugerencia class="mt-3"></enviar-sugerencia>
    <eliminar-cuenta class="mt-5"></eliminar-cuenta>
  </contenedor-centrado>
</template>

<script>
import {mapActions} from "vuex";
import CambiarContrasena from "@/components/usuario/CambiarContrasena.vue";
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";
import axios from "axios";
import GlobalHelpers from "@/helpers/globalHelpers.vue";
import ConfiguracionAlertas from "@/components/usuario/ConfiguracionAlertas.vue";
import EliminarCuenta from "@/components/usuario/EliminarCuenta.vue";
import EnviarSugerencia from "@/components/usuario/EnviarSugerencia.vue";

export default {
  name: "CuentaUsuario",
  components: {EnviarSugerencia, EliminarCuenta, ConfiguracionAlertas, ContenedorCentrado, CambiarContrasena},

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