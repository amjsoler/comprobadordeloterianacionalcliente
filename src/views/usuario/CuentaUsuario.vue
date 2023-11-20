<template>
  <contenedor-centrado>
    <div class="position-absolute top-0 end-0 text-danger mt-3 me-3"
         @click="cerrarSesion">
      Cerrar sesión
      <span class="material-symbols-outlined align-bottom">logout</span>
    </div>

    <cambiar-contrasena class="mt-5"></cambiar-contrasena>
  </contenedor-centrado>
</template>

<script>
import {mapActions} from "vuex";
import CambiarContrasena from "@/components/usuario/CambiarContrasena.vue";
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";

export default {
  name: "CuentaUsuario",
  components: {ContenedorCentrado, CambiarContrasena},

  mounted() {
      console.log("Entrando a CuentaUsuario.vue");
  },
  methods: {
    ...mapActions({
      cerrarSesionAction: "cerrarSesionAction"
    }),
    cerrarSesion() {
      this.cerrarSesionAction();
    }
  }
}
</script>