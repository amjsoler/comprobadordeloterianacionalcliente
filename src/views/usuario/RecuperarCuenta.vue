<template>
    <contenedor-centrado class="justify-content-center">
      <p class="dimgrey">Te enviaremos un correo electrónico con un enlace para que puedas generar una contraseña nueva</p>
      <form>
        <form-group>
          <form-label>Dirección de correo</form-label>
          <input-control type="email" required="required" v-model="correo"/>
          <input-error v-if="errors.correo">{{ errors.correo[0] }}</input-error>
        </form-group>
        <form-group>
          <button-submit @submit-click="enviarCorreo">Enviar correo</button-submit>
        </form-group>
      </form>
    </contenedor-centrado>
</template>
<script>
import axios from "axios";

import InputControl from "@/components/generales/formularios/InputControl.vue";
import globalHelpers from "@/helpers/globalHelpers.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import {mapState} from "vuex";
import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";

export default {
    name: "RecuperarCuenta",
    components: {ContenedorCentrado, FormGroup, InputError, ButtonSubmit, FormLabel, InputControl},
    data() {
        return {
            correo: ""
        }
    },
    computed: {
        ...mapState(["errors", "message"])
    },
    mounted() {
      console.log("Entrando a RecuperarCuenta.vue");
    },
    methods: {
        enviarCorreo() {
          console.log("Mandando petición de recuperación de cuenta al server...");

            axios.post(process.env.VUE_APP_API_BASE_URL + "recuperar-cuenta",
                {
                    correo: this.correo
                })
                .then(() => {
                    console.log("Response OK");

                    globalHelpers.mostrarToast("¡Email enviado!. Revisa tu buzón de correo", "success")
                })
                .catch(() => {
                  console.log("Response KO");
                })
        }
    }
}
</script>