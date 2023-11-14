<template>
    <div class="position-relative w-100 h-100">
        <spinner-button v-if="procesando"></spinner-button>
        <button @click.prevent="clicSubmit" :disabled="procesando" class="btn btn-primary button-submit w-100 h-100 d-flex justify-content-center"
        :class="{'working-submit':procesando}">
            <slot></slot>
        </button>
    </div>
</template>

<style scoped>
.working-submit {
    color: rgb(253, 137, 76) !important; /* fallback color */
    color: rgba(253, 137, 76, 0%) !important;
}
</style>
<script>
import SpinnerButton from "@/components/generales/formularios/SpinnerButton.vue";
import {mapActions, mapState} from "vuex";

export default {
    name: "ButtonSubmit",
    components: {SpinnerButton},

    computed: {
        ...mapState(["procesando"])
    },

    methods: {
        ...mapActions({
            procesandoAction:"procesandoAction"
        }),
        clicSubmit() {
            //Desactivo el botón y muestro un spinner
            this.procesandoAction(true);

            //Emito el evento para que el padre haga lo que tenga que hacer
            this.$emit('submitClick')
        }
    }
}
</script>