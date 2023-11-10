<template>
    <div>
      <form>
        <form-group>
          <form-label>Fecha de sorteo</form-label>
          <div class="row d-flex align-items-center">
            <div class="col-6">
              <select class="form-select" v-model="decimoAEditar.sorteo" @change="cambiarImagenDecimo">
                <option v-for="sorteo in sorteosDisponibles"
                        v-bind:key="sorteo.id"
                        :value="sorteo.id"
                        :class="{selected:sorteo.id==decimoAEditar.sorteo}">
                  ({{ formatDate(sorteo.fecha) }}) {{ sorteo.nombre }}
                </option>
              </select>
            </div>
            <div class="col-6">
              <img id="imagen-previsualizacion-decimo" class="img-fluid" src="/decimo_estandar.jpeg" @error="imagenDefecto">
            </div>
          </div>
          <input-error v-if="errors.sorteo">{{ errors.sorteo[0]}}</input-error>
        </form-group>
        <form-group>
          <form-label>Número</form-label>
          <input-control type="number" v-model="decimoAEditar.numero"/>
          <input-error v-if="errors.numero">{{ errors.numero[0] }}</input-error>
        </form-group>
        <!--<form-group>
            <form-label>Reintegro</form-label>
            <input-control type="number" v-model="decimoAEditar.reintegro"/>
            <input-error v-if="errors.reintegro">{{ errors.reintegro[0] }}</input-error>
        </form-group>-->
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
        <!--<form-group>
            <form-label>¿Cuántos décimos tienes con este número?</form-label>
            <input-control type="number" v-model="decimoAEditar.cantidad"/>
            <input-error v-if="errors.cantidad">{{ errors.cantidad[0] }}</input-error>
        </form-group>-->
        <button class="btn btn-primary" @click.prevent="editarDecimo">Guardar cambios</button>
      </form>
    </div>
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
import dayjs from "dayjs";

export default {
    name: "EditarDecimo",
    components: {InputError, InputControl, FormLabel, FormGroup},
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

          sorteosDisponibles: [],
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

      console.log("CrearDecimo.vue: Entrando al CrearDecimo. Consulto los sorteos disponibles");

      axios.get(process.env.VUE_APP_API_BASE_URL+"sorteos-disponibles")
          .then(response => {
            this.sorteosDisponibles = response.data;

            this.cambiarImagenDecimo();
          })
          .catch(error => {
            console.log(error);
          })
    },
    methods: {
        ...mapActions({
            EditarDecimoAction: "decimos/EditarDecimoAction"
        }),

      cambiarImagenDecimo(){
        document.getElementById("imagen-previsualizacion-decimo").src = process.env.VUE_APP_BASE_URL+"storage/sorteos/"+this.decimoAEditar.sorteo+".jpeg";
      },

      imagenDefecto(event){
        event.target.src = "/decimo_estandar.jpeg";
      },

      formatDate(dateString) {
        const date = dayjs(dateString);
        // Then specify how you want your dates to be formatted
        return date.format('DD/MM/YYYY');
      },

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