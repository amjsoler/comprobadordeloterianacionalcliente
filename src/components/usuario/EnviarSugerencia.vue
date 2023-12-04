<template>
  <div class="accordion w-100" id="enviarSugerencia">
    <div class="accordion-item w-100">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#enviarSugerenciaAccordion" aria-expanded="true" aria-controls="enviarSugerenciaAccordion">
          Enviar sugerencia
        </button>
      </h2>
      <div id="enviarSugerenciaAccordion" class="accordion-collapse collapse w-100 mt-4" aria-labelledby="headingOne" data-bs-parent="#enviarSugerenciaContainer">
        <form class="mx-auto">
          <form-group>
            <form-label>Escribe lo que quieras</form-label>
            <textarea v-model="texto" class="form-control"></textarea>
            <input-error v-if="errors.texto">{{ errors.texto[0] }}</input-error>
          </form-group>
          <form-group>
            <button-submit @submit-click="enviarSugerencia">Enviar</button-submit>
          </form-group>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import GlobalHelpers from "@/helpers/globalHelpers.vue";
  import FormGroup from "@/components/generales/formularios/FormGroup.vue";
  import FormLabel from "@/components/generales/formularios/FormLabel.vue";
  import InputError from "@/components/generales/formularios/InputError.vue";
  import {mapState} from "vuex";
  import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";

  export default {
    name: "EnviarSugerencia",
    components: {ButtonSubmit, InputError, FormLabel, FormGroup},

    data() {
      return {
        texto: "",
      }
    },

    computed: {
      ...mapState(["errors", "message"])
    },

    methods: {
      enviarSugerencia() {
        axios.post(process.env.VUE_APP_API_BASE_URL+"enviar-sugerencia",
            {
              texto: this.texto
            })
            .then(() => {
              GlobalHelpers.mostrarToast("Hemos mandado tu comentario a nuestros desarrolladores. Te contestaremos lo antes posible. ¡Gracias!");
              this.texto = "";
            })
            .catch(() => {

            })
      }
    }
  }
</script>