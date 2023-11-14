<template>
  <div>
    <qrcode-stream class="" @detect="onDectect"></qrcode-stream>

    <div class="fixed-bottom mb-75 d-flex justify-content-center">
      <router-link :to="{name:'ComprobarDecimo'}"
                   class="btn btn-lg btn-primary">
        Introducir datos
        <span class="material-symbols-outlined align-bottom">pin</span>
      </router-link>
    </div>
  </div>
</template>

<script>

import { QrcodeStream } from 'vue-qrcode-reader'
import axios from "axios";
import router from "@/router";
import {mapActions} from "vuex";
import dayjs from "dayjs";


export default {
  name: "ComprobarDecimoQR",
  components: {
    QrcodeStream
  },

  data() {
    return {
      ultimosResultados: []
    }
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

        //guardo los datos detectados del décimo
        datosDecimo.numero = cadenaLeida[4].split("=")[1];
        datosDecimo.fechaSorteo = cadenaLeida[2].split("=")[1].substring(4);
        datosDecimo.serie = cadenaLeida[6].split("=")[1];
        datosDecimo.fraccion = cadenaLeida[5].split("=")[1];

        axios.post(process.env.VUE_APP_API_BASE_URL + "id-sorteo-dada-fecha",
            {
              fechaSorteo: dayjs(datosDecimo.fechaSorteo).format('YYYY-MM-DD')
            })
            .then(response => {
              datosDecimo.sorteo = response.data.id;

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