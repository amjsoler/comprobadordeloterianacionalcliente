<template>
  <div class="w-100" id="configuracionAlertas">
    <h3 class="mb-3">Configuración de alertas</h3>
    <form class="mx-auto">
      <form-group class="form-check form-switch">
        <input-control class="form-check-input" :value="alertasporcorreo" :checked="alertasporcorreo" @change="modificarAlertasPorCorreo" type="checkbox" role="switch" id="inputcorreo" />
        <form-label class="form-check-label" for="inputcorreo">Alertas por correo</form-label>
      </form-group>
      <form-group class="form-check form-switch">
        <input-control class="form-check-input" :value="alertaspornotificacion" :checked="alertaspornotificacion" @change="modificarAlertasPorNotificacion" type="checkbox" role="switch" id="inputnotificacion" />
        <form-label class="form-check-label" for="inputnotificacion">Alertas por notificaciones</form-label>
      </form-group>
      <form-group>
        <button-submit @click="guardarAjustesCuentaUsuario">Guardar cambios</button-submit>
      </form-group>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import GlobalHelpers from "@/helpers/globalHelpers.vue";
import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "ConfiguracionAlertas",
  components: {ButtonSubmit, InputControl, FormLabel, FormGroup},

  computed: {
    ...mapState(
        "usuario", ["alertasporcorreo", "alertaspornotificacion"]
    )
  },

  mounted() {
    console.log("ConfiguracionAlertas.vue - Entrando a la configuración de alertas");
  },

  methods: {
    ...mapActions({
      almacenarAlertasPorCorreoAction: "usuario/almacenarAlertasPorCorreoAction",
      almacenarAlertasPorNotificacionAction: "usuario/almacenarAlertasPorNotificacionAction"
        }
    ),

    modificarAlertasPorCorreo(e) {
      this.almacenarAlertasPorCorreoAction(e.target.checked)
    },

    modificarAlertasPorNotificacion(e) {
      this.almacenarAlertasPorNotificacionAction(e.target.checked)
    },

    guardarAjustesCuentaUsuario(){
      console.log("CuentaUsuario.vue - Entrando a guardarAjustesCuentaUsuario");

      axios.post(process.env.VUE_APP_API_BASE_URL+"ajustes-cuenta",
          {
            alertasporcorreo: this.alertasporcorreo,
            alertaspornotificacion: this.alertaspornotificacion
          })
          .then(() => {
            GlobalHelpers.mostrarToast("Los nuevos ajustes se han guardado correctamente", "success");
          })
          .catch(() => {
            GlobalHelpers.mostrarToast("Error inesperado al guardar los nuevos ajustes", "danger");
          })
    },


  }
}
</script>