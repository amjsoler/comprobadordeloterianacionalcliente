<template>
    <contenedor-centrado class="pb-5">
        <div v-if="!Object.keys(this.dameDecimosAgrupadosPorSorteo).length"
              class="h-100 d-flex flex-column justify-content-center">
          <p class="text-center fs-4 fw-bold">Todavía no has añadido ningún décimo</p>
          <br>
          <p class="text-center fs-5">Añade tus décimos y te avisaremos con los resultados cuando se celebre el sorteo</p>
        </div>
        <div class="w-100" v-for="(decimos, key) in dameDecimosAgrupadosPorSorteo" v-bind:key="key">
          <div class="row mt-4 mb-2">
            <div class="text-center"
                :class="{'col-10': dimeSiSorteoConResultadosDadoArrayDeDecimos(decimos)}">
              <div class="fs-5">
                {{ decimos[0].sorteo_perteneciente.nombre }} ({{ dameFechaFormateada(decimos[0].sorteo_perteneciente.fecha) }})
              </div>
            </div>
            <div v-if="dimeSiSorteoConResultadosDadoArrayDeDecimos(decimos)"
                 class="col-2 d-flex align-items-center text-danger position-relative justify-content-center"
                  @click="archivarDecimos(decimos[0].sorteo)">
              <spinner-button v-if="procesando[decimos[0].sorteo]" naranja="true"></spinner-button>
              <span v-else class="material-symbols-outlined">archive</span>
            </div>
          </div>
          <div :id="'tarjeta-decimo-'+decimo.id"
              v-for="decimo in decimos"
               v-bind:key="decimo.id"
               class="card mb-3 text-decoration-none cursor-pointer tarjeta-decimo"
              @click="mostrarPanelOpciones">
            <!-- Panel de opciones del décimo para editar y borrar dicho décimo -->
            <div class="d-flex align-items-center justify-content-around fondo-decimo-ajustes panel-opciones">
              <div class="position-absolute top-0 end-0 mt-2 me-2">
                <span @click.self.stop="cerrarPanelOpciones" class="material-symbols-outlined dimgrey fw-bold fs-2">close</span>
              </div>
              <div>
                <router-link class="btn btn-primary" :to="{name: 'EditarDecimo', params: {id:decimo.id}}">
                  <span class="material-symbols-outlined align-bottom fs-10">edit</span>
                </router-link>
              </div>
              <div @click.prevent="guardarDecimoABorrar(decimo.id)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal-eliminacion-decimo">
                <span class="material-symbols-outlined align-bottom fs-10">delete</span>
              </div>
            </div>
            <!-- Tarjeta del décimo -->
            <div class="d-flex">
              <div class="col-8">
                <img :src="dameUrlImagenDecimoDadoIdSorteo(decimo.sorteo)" @error="cargarDecimoEstandar" class="img-fluid rounded-start" alt="imagen del décimo">
              </div>
              <div class="col-4 d-flex flex-column justify-content-center">
                <h5 class="fs-2">{{ decimo.numero}}</h5>
                <p class="card-text fs-4">
                  <span v-if="decimo.serie">S: {{ decimo.serie }}</span>
                  <span v-else>S: --</span>,
                  <span v-if="decimo.fraccion">F: {{ decimo.fraccion }}</span>
                  <span v-else>F: --</span>
                </p>
              </div>
            </div>
            <div class="text-center">
              <p v-if="decimo.premio == 0" class="small text-danger mt-3">Este décimo no está premiado</p>
              <p v-else-if="decimo.premio > 0" class="small text-success mt-3">Este décimo tiene un premio de <span class="fw-bold">{{Math.trunc(decimo.premio)}}€</span> ¡Enhorabuena!</p>
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
        <modal-general titulo="¡Atención!" id="modal-eliminacion-decimo">
          <p>Estás a punto de eliminar el décimo ¿Estás seguro de querer continuar?</p>
          <div class="row">
            <button type="button" class="btn btn-primary col-7 offset-1" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
            <button class="btn btn-danger col-2 offset-1" @click.prevent="eliminarDecimo()">
              <span class="material-symbols-outlined align-bottom fw-bold">delete</span>
            </button>
          </div>
        </modal-general>
    </contenedor-centrado>
</template>

<style scoped>
  .fondo-decimo-ajustes {
    background-color: #FFFFFFDD !important;
  }

  .panel-opciones {
    visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    bottom: 0px;
  }

  .lds-ellipsis {
    position: relative !important;
    right: -5px !important;
  }
  .panel-opciones-oculto {
    visibility: visible;
    animation: FadeOutFordward 0.25s ease 0s 1 normal forwards;
  }

  .panel-opciones-visible {
    visibility: visible;
    animation: fadeInFromLeft 0.5s ease 0s 1 normal forwards;
  }

  @keyframes FadeOutFordward {
    0% {
      opacity: 1;
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(1.4);
    }
  }

  @keyframes fadeInFromLeft {
    0% {
      opacity: 0;
      transform: translateX(-50px);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>

<script>
import axios from "axios";
import {mapActions, mapGetters} from "vuex";
import ModalGeneral from "@/components/generales/modales/ModalGeneral.vue";
import SpinnerButton from "@/components/generales/formularios/SpinnerButton.vue";
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";
import globalHelpers from "../../helpers/globalHelpers.vue";

export default {
  name: "MisDecimos",

  data () {
    return {
      decimoAManipular: null,
      procesando: []
    }
  },
  components: {ContenedorCentrado, SpinnerButton, ModalGeneral},

  computed:{
    ...mapGetters({
      dameDecimosAgrupadosPorSorteo: "decimos/dameDecimosAgrupadosPorSorteo"
    }),
  },

  methods: {
    ...mapActions({
      almacenarListadoMisDecimosAction: "decimos/almacenarListadoMisDecimosAction",
      eliminarDecimoAction: "decimos/eliminarDecimoAction",
      archivarDecimosAction: "decimos/archivarDecimosAction"
    }),

    dameFechaFormateada(fecha) {
      return globalHelpers.formatDate(fecha)
    },

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

            //router.push({name: 'MisDecimos'});
          })
          .catch(() => {
            console.log("VerDecimo.vue: Response KO");
          })

    },

    archivarDecimos(idSorteo){
      this.procesando[idSorteo] = true;

        axios.get(process.env.VUE_APP_API_BASE_URL+"archivar-decimos/"+idSorteo)
            .then(() => {

              this.archivarDecimosAction(idSorteo)

              globalHelpers.mostrarToast("Los décimos se han archivado correctamente", "success");

              this.procesando[idSorteo] = false;
            })
            .catch(() => {
              console.log("Response KO");
              this.procesando[idSorteo] = false;
            })
    },
  },
  mounted() {
    console.log("MisDecimos.vue: Entrando a mis decimos. Mandando petición para leer los décimos");

    axios.get(process.env.VUE_APP_API_BASE_URL+"mis-decimos")
        .then(response => {
          console.log("MisDecimos.vue: Respuesta OK. Almaceno el listado de décimos en misdecimos del global state");

          this.almacenarListadoMisDecimosAction(response.data);
        })
        .catch(() => {
          console.log("MisDecimos.vue: Respuesta KO. Error desconocido al leer los décimos");
        });
  }
}
</script>