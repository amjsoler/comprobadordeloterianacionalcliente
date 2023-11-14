<template>
    <div-centro-pantalla>
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
    </div-centro-pantalla>
</template>
<script>
import axios from "axios";

import InputControl from "@/components/generales/formularios/InputControl.vue";
import globalHelpers from "@/helpers/globalHelpers.vue";
import DivCentroPantalla from "@/components/generales/layout/DivCentroPantalla.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import {mapState} from "vuex";
import FormGroup from "@/components/generales/formularios/FormGroup.vue";

export default {
    name: "RecuperarCuenta",
    components: {FormGroup, InputError, ButtonSubmit, FormLabel, DivCentroPantalla, InputControl},
    data() {
        return {
            correo: ""
        }
    },
    computed: {
        ...mapState(["errors", "message"])
    },
    methods: {
        enviarCorreo() {
            axios.post(process.env.VUE_APP_API_BASE_URL + "recuperar-cuenta",
                {
                    correo: this.correo
                })
                .then(() => {
                    console.log("OK");
                    globalHelpers.mostrarToast("¡Email enviado!. Revisa tu buzón de correo", "success")
                })
                .catch(() => {
                    console.log("KO");
                })
        }
    }
}
</script>