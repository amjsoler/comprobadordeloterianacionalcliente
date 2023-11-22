<template>
  <contenedor-centrado>
    <qrcode-stream class="" @detect="onDectect"></qrcode-stream>

    <div class="fixed-bottom mb-75 ">
      <router-link :to="{name:'ComprobarDecimo'}"
                   class="d-inline-flex btn btn-lg btn-primary">
        <span class="material-symbols-outlined fs-1">pin</span>
      </router-link>
    </div>
  </contenedor-centrado>
</template>

<script>

import { QrcodeStream } from 'vue-qrcode-reader'
import axios from "axios";
import router from "@/router";
import {mapActions, mapState} from "vuex";
import dayjs from "dayjs";
import ContenedorCentrado from "@/components/generales/layout/ContenedorCentrado.vue";
import globalHelpers from "@/helpers/globalHelpers.vue";


export default {
  name: "ComprobarDecimoQR",
  components: {
    ContenedorCentrado,
    QrcodeStream
  },

  computed: {
    ...mapState(["errors", "message"])
  },

  methods: {
    ...mapActions({
      almacenarDecimoAComprobarAction: "resultados/almacenarDecimoAComprobarAction",
      almacenarPremioObtenido: "resultados/almacenarPremioObtenidoAction"
    }),

    onDectect(detectedCodes) {
      console.log(detectedCodes);

      var datosDecimo = {};

      if (detectedCodes && detectedCodes[0] && detectedCodes[0].format == "qr_code") {
        const cadenaLeida = detectedCodes[0].rawValue.split(";");

        var cadenaFecha = cadenaLeida[2].split("=")[1];
        cadenaFecha = cadenaFecha.substring(3);
        cadenaFecha = cadenaFecha.split(":")[0];

        //guardo los datos detectados del décimo
        datosDecimo.numero = cadenaLeida[4].split("=")[1];
        datosDecimo.fechaSorteo = cadenaFecha;
        datosDecimo.numeroSorteo = cadenaLeida[2].split("=")[0].substring(0,2)
        datosDecimo.serie = cadenaLeida[6].split("=")[1];
        datosDecimo.fraccion = cadenaLeida[5].split("=")[1];

        console.log(datosDecimo);

        console.log("Mando petición para consultar el id de sorteo dada la fecha");

        axios.post(process.env.VUE_APP_API_BASE_URL + "id-sorteo-dada-fecha",
            {
              fechaSorteo: dayjs(datosDecimo.fechaSorteo).format('YYYY-MM-DD')
            })
            .then(response => {
              console.log("Response OK: ");
              console.log(response);

              datosDecimo.sorteo = response.data.id;

              console.log("Ahora compruebo resultados...");
              //Hago consulta al comprobar resultados
              axios.post(process.env.VUE_APP_API_BASE_URL + "comprobar-decimo",
                  {
                    numero: datosDecimo.numero,
                    reintegro: datosDecimo.numero % 10,
                    serie: datosDecimo.serie,
                    fraccion: datosDecimo.fraccion,
                    sorteo: datosDecimo.sorteo
                  })
                  .then(response => {
                    console.log("Response OK. Resultados: ");
                    console.log(response);

                    //Guardo el premio y el número en el state
                    const decimoAComprobar = {
                      numero: this.numero,
                      reintegro: this.numero % 10,
                      serie: this.serie,
                      fraccion: this.fraccion,
                      sorteo: this.sorteo
                    }

                    this.almacenarDecimoAComprobarAction(decimoAComprobar);

                    const premioObtenido = {
                      premioTotal: response.data.premioTotal,
                      premiosObtenidos: response.data.premiosObtenidos
                    }

                    console.log("Premio obtendio: ");
                    console.log(premioObtenido);

                    this.almacenarPremioObtenido(premioObtenido);

                    //Después redirijo a la vista para pintar el premio
                    router.push({name: "ResultadosComprobacion"});
                  })

                  .catch(() => {
                    router.push({name: "ResultadosComprobacion"});
                  })
            })
            .catch(() => {
              router.push({name: "ResultadosComprobacion"});
            })
        }
      }
    }
  }
</script>