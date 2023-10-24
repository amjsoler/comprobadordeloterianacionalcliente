<template>
    {{ dameDecimoDadoId(decimoID) }}
    <router-link :to="{name: 'EditarDecimo', params: {id:decimoID}}" class="btn btn-primary">Editar décimo</router-link>
    <button class="btn btn-danger" @click.prevent="eliminarDecimo">Eliminar décimo</button>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import axios from "axios";
import router from "@/router";
import globalHelpers from "@/helpers/globalHelpers.vue";

export default {
    name: "VerDecimo",
    computed: {
        ...mapState(
            "decimos", ["misDecimos"]
        ),

        ...mapGetters('decimos', ["dameDecimoDadoId"]),

        decimoID() {
            return this.$route.params.id;
        }
    },

    mounted() {
        console.log("VerDecimo.vue: Entrando al VerDecimo.vue. Lanzando petición para traer nuevos datos");

        axios.get(process.env.VUE_APP_API_BASE_URL + "mis-decimos/" + this.$route.params.id)
            .then(response => {
                console.log("VerDecimo.vue: Response OK. Almaceno en décimos el décimo leido");

                this.EditarDecimoAction(response.data);
            })
            .catch(error => {
                console.log("VerDecimo.vue: Response KO");
                console.log(error);
            })
    },
    methods: {
        ...mapActions({
            EditarDecimoAction: "decimos/EditarDecimoAction",
            eliminarDecimoAction: "decimos/eliminarDecimoAction"
        }),

        eliminarDecimo(){
            console.log("VerDecimo.vue: Entrando al eliminar décimo. Mandando petición para elimiar el décimo en el back");

            axios.delete(process.env.VUE_APP_API_BASE_URL+"mis-decimos/"+this.$route.params.id)
                .then(() => {
                    console.log("VerDecimo.vue: Response OK");

                    this.eliminarDecimoAction(this.$route.params.id);

                    globalHelpers.mostrarToast("El décimo ha sido eliminado correctamente", "success");

                    router.push({name: 'MisDecimos'});
                })
                .catch(error => {
                    console.log("VerDecimo.vue: Response KO");
                    console.log(error);
                })

        }
    }
}
</script>