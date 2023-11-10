<template>
  <div class="mt-5">
    <div class="position-absolute top-0 end-0 text-danger mt-3 me-3"
        @click="cerrarSesion">
      Cerrar sesión
      <span class="material-symbols-outlined align-bottom">logout</span>
    </div>

    <cambiar-contrasena></cambiar-contrasena>

  </div>
</template>

<script>
import {mapActions} from "vuex";
import GlobalHelpers from "@/helpers/globalHelpers.vue";
import router from "@/router";
import CambiarContrasena from "@/components/usuario/CambiarContrasena.vue";

export default {
  name: "CuentaUsuario",
  components: {CambiarContrasena},

  methods: {
    ...mapActions({
      cerrarSesionAction: "cerrarSesionAction"
    }),
    cerrarSesion() {
      this.cerrarSesionAction();

      GlobalHelpers.mostrarToast("¡Adiós! Esperamos volver a verte pronto :)")

      router.push({name: "IniciarSesion"})
    }
  }
}
</script>