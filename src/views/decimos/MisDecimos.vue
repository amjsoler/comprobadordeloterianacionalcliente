<template>
    <div :class="{'h-100': !Object.keys(this.dameDecimosAgrupadosPorSorteo).length}">
        <div-centro-pantalla v-if="!Object.keys(this.dameDecimosAgrupadosPorSorteo).length">
          <p class="text-center">Todavía no has añadido ningún décimo</p>
          <br>
          <p class="text-center">Añade tus décimos y te avisaremos con los resultados cuando se celebre el sorteo</p>
        </div-centro-pantalla>
        <div v-for="(decimos, key) in dameDecimosAgrupadosPorSorteo"
            v-bind:key="key">
          <div class="row">
            <div class="text-center"
                :class="{'col-10': dimeSiSorteoConResultadosDadoArrayDeDecimos(decimos)}">
              <h3 v-if="decimos[0].sorteo_perteneciente.numero_sorteo"
                  class="">
                Décimos del sorteo {{ decimos[0].sorteo_perteneciente.numero_sorteo }}
              </h3>
              <p>
                {{ decimos[0].sorteo_perteneciente.nombre }} ({{ decimos[0].sorteo_perteneciente.fecha }})
              </p>
            </div>
            <div v-if="dimeSiSorteoConResultadosDadoArrayDeDecimos(decimos)"
                 class="col-2 d-flex align-items-center text-danger">
              <span class="material-symbols-outlined">archive</span>
            </div>
          </div>
          <div  :id="'tarjeta-decimo-'+decimo.id"
              v-for="decimo in decimos"
               v-bind:key="decimo.id"
               class="card mb-3 text-decoration-none cursor-pointer tarjeta-decimo"
              @click="mostrarPanelOpciones">
            <div class="d-inline-flex align-items-center justify-content-around fondo-decimo-ajustes panel-opciones">
              <div class="position-absolute top-0 end-0">
                <span @click.self.stop="cerrarPanelOpciones" class="material-symbols-outlined dimgrey fw-bold fs-7">close</span>
              </div>
              <div>
                <router-link :to="{name: 'EditarDecimo', params: {id:decimo.id}}">
                  <span class="material-symbols-outlined align-bottom text-warning fs-10 fw-bold">edit</span>
                </router-link>
              </div>
              <div @click.prevent="guardarDecimoABorrar(decimo.id)" data-bs-toggle="modal" data-bs-target="#modal-eliminacion-decimo">
                <span class="material-symbols-outlined align-bottom text-danger fs-10 fw-bold">delete</span>
              </div>
            </div>
            <div class="g-0 d-flex">
              <div class="col-8">

                <img :src="dameUrlImagenDecimoDadoIdSorteo(decimo.sorteo)" @error="cargarDecimoEstandar" class="img-fluid rounded-start" alt="imagen del décimo">
              </div>
              <div class="col-4 flex-fill d-flex align-items-center text-center">
                <div class="card-body">
                  <h5 class="card-title">Nº: {{ decimo.numero}}</h5>
                  <p class="card-text">
                    <span v-if="decimo.serie">S: {{ decimo.serie }}</span>
                    <span v-else>S: --</span>,
                    <span v-if="decimo.fraccion">F: {{ decimo.fraccion }}</span>
                    <span v-else>F: --</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="text-center">
              <!--<p v-if="!decimo.premio" class="small">El sorteo todavía no se ha celebrado</p>-->
              <p v-if="decimo.premio === 0" class="small text-danger">Este décimo no está premiado</p>
              <p v-else-if="decimo.premio > 0" class="small text-success">Este décimo tiene un premio de {{decimo.premio}}€ ¡Enhorabuena!</p>
            </div>
          </div>
        </div>
        <div class="fixed-bottom mb-75 text-center">
          <router-link :to="{name:'CrearDecimo'}"
                       class="btn btn-primary"
                      :class="{'aura-naranja': !Object.keys(this.dameDecimosAgrupadosPorSorteo).length}">
            <span class="material-symbols-outlined align-bottom">add</span>
            Nuevo décimo
          </router-link>
        </div>
    </div>
  <modal-general titulo="¡Atención!" id="modal-eliminacion-decimo">
    <p>Estás a punto de eliminar el décimo ¿Estás seguro de querer continuar?</p>
    <div class="row">
      <button type="button" class="btn btn-primary col-7 offset-1" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
      <button class="btn btn-danger col-2 offset-1" @click.prevent="eliminarDecimo()">
        <span class="material-symbols-outlined align-bottom fw-bold">delete</span>
      </button>
    </div>
  </modal-general>
</template>

<script>
import axios from "axios";
import {mapActions, mapGetters} from "vuex";
import DivCentroPantalla from "@/components/generales/DivCentroPantalla.vue";
import ModalGeneral from "@/components/generales/modales/ModalGeneral.vue";
import globalHelpers from "@/helpers/globalHelpers.vue";
import router from "@/router";

export default {
  name: "MisDecimos",
  data () {
    return {
      decimoAManipular: null,
    }
  },
  components: {ModalGeneral, DivCentroPantalla},
  computed:{
    ...mapGetters({
      dameDecimosAgrupadosPorSorteo: "decimos/dameDecimosAgrupadosPorSorteo"
    }),
  },

  methods: {
    ...mapActions({
      almacenarListadoMisDecimosAction: "decimos/almacenarListadoMisDecimosAction",
      eliminarDecimoAction: "decimos/eliminarDecimoAction"
    }),

    mostrarPanelOpciones(event){
      event.target.closest(".tarjeta-decimo")
          .getElementsByClassName("panel-opciones")[0]
          .classList.add("panel-opciones-visible");
      event.target.closest(".tarjeta-decimo")
          .getElementsByClassName("panel-opciones")[0]
          .classList.remove("panel-opciones-oculto")
    },

    cerrarPanelOpciones(event) {
        event.target.closest(".panel-opciones").classList.add("panel-opciones-oculto");
        event.target.closest(".panel-opciones").classList.remove("panel-opciones-visible");
    },

    guardarDecimoABorrar(decimoId){
      this.decimoAManipular = decimoId;
    },

    dimeSiSorteoConResultadosDadoArrayDeDecimos(decimos){
      if(decimos[0] && decimos[0].sorteo_perteneciente && decimos[0].sorteo_perteneciente.resultados){
        return true;
      }
      else{
        return false;
      }
    },

    cargarDecimoEstandar(event) {
      event.target.src = "decimo_estandar.jpeg"
    },

    dameUrlImagenDecimoDadoIdSorteo(sorteoId) {
      return process.env.VUE_APP_BASE_URL + "storage/sorteos/" + sorteoId + ".jpeg";
    },

    eliminarDecimo(){
      console.log("MisDecimos.vue: Entrando al eliminar décimo. Mandando petición para elimiar el décimo en el back");

      axios.delete(process.env.VUE_APP_API_BASE_URL+"mis-decimos/"+this.decimoAManipular)
          .then(() => {
            console.log("MisDecimos.vue: Response OK");

            this.eliminarDecimoAction(this.decimoAManipular);

            globalHelpers.mostrarToast("El décimo ha sido eliminado correctamente", "success");

            globalHelpers.cerrarTodosLosModalesAbiertos();

            router.push({name: 'MisDecimos'});
          })
          .catch(error => {
            console.log("VerDecimo.vue: Response KO");
            console.log(error);
          })

    }
  },
  mounted() {
    console.log("MisDecimos.vue: Entrando a mis decimos. Mandando petición para leer los décimos");

    axios.get(process.env.VUE_APP_API_BASE_URL+"mis-decimos")
        .then(response => {
          console.log("MisDecimos.vue: Respuesta OK. Almaceno el listado de décimos en misdecimos del global state");

          this.almacenarListadoMisDecimosAction(response.data);
        })
        .catch(error => {
          console.log("MisDecimos.vue: Respuesta KO. Error desconocido al leer los décimos");
          console.log(error);
        });
  }
}
</script>