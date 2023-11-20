<template>
    <contenedor-centrado>
      <form>
        <form-group>
          <form-label>Fecha de sorteo</form-label>
          <sorteos-disponibles-con-preview v-model="decimoAEditar.sorteo" />
          <input-error v-if="errors.sorteo">{{ errors.sorteo[0]}}</input-error>
        </form-group>
        <form-group>
          <form-label>Número</form-label>
          <input-control type="number" v-model="decimoAEditar.numero"/>
          <input-error v-if="errors.numero">{{ errors.numero[0] }}</input-error>
        </form-group>
        <div class="row">
          <form-group class="col-6">
            <form-label>Serie</form-label>
            <input-control type="number" v-model="decimoAEditar.serie"/>
            <input-error v-if="errors.serie">{{ errors.serie[0] }}</input-error>
          </form-group>
          <form-group class="col-6">
            <form-label>Fracción</form-label>
            <input-control type="number" v-model="decimoAEditar.fraccion"/>
            <input-error v-if="errors.fraccion">{{ errors.fraccion[0] }}</input-error>
          </form-group>
        </div>
        <form-group>
          <button-submit @submit-click="editarDecimo">Guardar cambios</button-submit>
        </form-group>
      </form>
    </contenedor-centrado>
</template>

<script>

import {mapActions, mapGetters, mapState} from "vuex";
import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import axios from "axios";
import globalHelpers from "@/helpers/globalHelpers.vue";
import router from "@/router";
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";
import SorteosDisponiblesConPreview from "@/components/sorteos/SorteosDisponiblesConPreview.vue";
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";

export default {
    name: "EditarDecimo",

    components: {
      ButtonSubmit, SorteosDisponiblesConPreview, ContenedorCentrado, InputError, InputControl, FormLabel, FormGroup},
    data(){
        return {
            decimoAEditar: {
                sorteo: "",
                numero: "",
                reintegro: "",
                serie: "",
                fraccion: "",
                cantidad: ""
            },
        }
    },
    computed: {
        ...mapState(["errors", "message"]),
        ...mapGetters('decimos', ["dameDecimoDadoId"]),
        decimoID() {
            return this.$route.params.id;
        },
    },
    mounted() {
        console.log("EditarDecimo.vue: Entrando a la vista de edición de décimo");

        //leo y me hago un duplicado local del décimo que hay en el global state
        this.decimoAEditar = this.dameDecimoDadoId(this.decimoID);
    },
    methods: {
        ...mapActions({
            EditarDecimoAction: "decimos/EditarDecimoAction"
        }),

        editarDecimo(){
            console.log("EditarDecimo.vue: Llamo al editar décimo.");

            //Llamada a server
            axios.put(process.env.VUE_APP_API_BASE_URL+"mis-decimos/"+this.decimoID,
                {
                    sorteo: this.decimoAEditar.sorteo,
                    numero: this.decimoAEditar.numero,
                    reintegro: this.decimoAEditar.numero % 10,
                    serie: this.decimoAEditar.serie,
                    fraccion: this.decimoAEditar.fraccion,
                    cantidad: 1,
                })
                .then(response => {
                    console.log("EditarDecimo.vue: Respponse OK");

                    //Edito el décimo del global state
                    this.EditarDecimoAction(response.data);

                    globalHelpers.mostrarToast("Se han guardado los cambios correctamente", "success");

                    router.push({name: "MisDecimos"});
                })
                .catch(error => {
                    console.log("EditarDecimo.vue: Response KO");
                    console.log(error);
                })
        }
    }
}
</script>