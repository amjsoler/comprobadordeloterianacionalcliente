<template>
    <form>
        <form-group>
            <form-label>Fecha de sorteo</form-label>
            <input-control v-model="decimoAEditar.fechaSorteo" type="date"/>
            <input-error v-if="errors.fechaSorteo">{{ errors.fechaSorteo[0] }}</input-error>
        </form-group>
        <form-group>
            <form-label>Número</form-label>
            <input-control type="number" v-model="decimoAEditar.numero"/>
            <input-error v-if="errors.numero">{{ errors.numero[0] }}</input-error>
        </form-group>
        <form-group>
            <form-label>Reintegro</form-label>
            <input-control type="number" v-model="decimoAEditar.reintegro"/>
            <input-error v-if="errors.reintegro">{{ errors.reintegro[0] }}</input-error>
        </form-group>
        <form-group>
            <form-label>Serie</form-label>
            <input-control type="number" v-model="decimoAEditar.serie"/>
            <input-error v-if="errors.serie">{{ errors.serie[0] }}</input-error>
        </form-group>
        <form-group>
            <form-label>Fracción</form-label>
            <input-control type="number" v-model="decimoAEditar.fraccion"/>
            <input-error v-if="errors.fraccion">{{ errors.fraccion[0] }}</input-error>
        </form-group>
        <form-group>
            <form-label>¿Cuántos décimos tienes con este número?</form-label>
            <input-control type="number" v-model="decimoAEditar.cantidad"/>
            <input-error v-if="errors.cantidad">{{ errors.cantidad[0] }}</input-error>
        </form-group>
        <button class="btn btn-primary" @click.prevent="editarDecimo">Guardar cambios</button>
    </form>
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

export default {
    name: "EditarDecimo",
    components: {InputError, InputControl, FormLabel, FormGroup},
    data(){
        return {
            decimoAEditar: {
                fechaSorteo: "",
                numero: "",
                reintegro: "",
                serie: "",
                fraccion: "",
                cantidad: ""
            }
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

        //leo y me hago un duplicado local del décimo que hay en el global storage
        this.decimoAEditar = this.dameDecimoDadoId(this.decimoID);
    },
    methods: {
        ...mapActions({
            EditarDecimoAction: "decimos/EditarDecimoAction"
        }),
        editarDecimo(){
            console.log("EditarDecimo.vue: Llamo al editar décimo.");

            //Llamada a server
            axios.patch(process.env.VUE_APP_API_BASE_URL+"mis-decimos/"+this.decimoID+"/modificar",
                {
                    fechaSorteo: this.decimoAEditar.fechaSorteo,
                    numero: this.decimoAEditar.numero,
                    reintegro: this.decimoAEditar.reintegro,
                    serie: this.decimoAEditar.serie,
                    fraccion: this.decimoAEditar.fraccion,
                    cantidad: this.decimoAEditar.cantidad,
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