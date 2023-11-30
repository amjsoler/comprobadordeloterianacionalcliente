import { createStore } from 'vuex'
import router from "@/router";
import decimos from "@/store/decimos";
import resultados from "@/store/resultados";
import GlobalHelpers from "@/helpers/globalHelpers.vue";
import usuario from "@/store/usuario";

export default createStore({
  strict: true,

  state: {
    tokenAuth: "",
    errors: [],
    message: "",
    toastApp: {},
    procesando: false
  },
  mutations: {
    procesandoMutation(state, estado){
        state.procesando = estado;
    },
    almacenarMensajeToastMutation(state, {mensaje, tipo}){
      console.log("storage/index.js: mutation - almacenando mensaje para el toast");
      state.toastApp.mensaje = mensaje;
      state.toastApp.tipo = tipo;
    },
    almacenarTokenSesionMutation(state, newTokenSesion){
      console.log("storage/index.js: mutation - almacenando token de sesión en el state");
      state.tokenAuth = newTokenSesion;
    },

    cerrarSesionMutation(state) {
      console.log("storage/index.js: mutation - cerrando sesión de state");
      state.tokenAuth = "";
    },

    almacenarArrayErroresMutation(state, errors) {
      console.log("storage/index.js: mutation - almacenando errores en el state");
      state.errors = errors;
    },

    almacenarMensajeMutation(state, mensaje) {
      console.log("storage/index.js: mutation - almacenando el mensaje en el state");
      state.message = mensaje;
    },
  },
  actions: {
    procesandoAction({commit}, estado){
        commit("procesandoMutation", estado);
    },
    almacenarMensajeToastAction({commit}, {mensaje, tipo}) {
      console.log("storage/index.js: action - almacenar mensaje del toast");

      commit("almacenarMensajeToastMutation", {mensaje, tipo});
    },
    almacenarTokenSesionAction({commit}, newTokenSesion) {
      console.log("storage/index.js: action - almacenando token de sesión en el localstorage");
      //Almaceno en la memoria del dispositivo
      window.localStorage.setItem("tokenAuth", newTokenSesion);

      //Almaceno en el state para la sesión actual
      commit("almacenarTokenSesionMutation", newTokenSesion);
    },
    cerrarSesionAction({commit}) {
      console.log("storage/index.js: cerrarSesionAction - Borrando token del storage");
      //Borrando el token del localstorage
      window.localStorage.removeItem("tokenAuth");

      //Llamada al mutator cerrar sesión
      commit("cerrarSesionMutation");

      GlobalHelpers.mostrarToast("¡Adiós! Esperamos volver a verte pronto :)")

      //Finalmente redirijo a iniciar sesión
      router.push({name:"IniciarSesion"});
    },
    almacenarArrayErroresAction({commit}, errors) {
      console.log("storage/index.js: action - almacenando errores");

      commit("almacenarArrayErroresMutation", errors);
    },

    almacenarMensajeAction({commit}, mensaje) {
      console.log("storage/index.js: action - almacenando el mensaje");

      commit("almacenarMensajeMutation", mensaje);
    },
    vaciarValidacionesAction({commit}){
      console.log("storage/index.js: action - vaciar validaciones");

      commit("almacenarMensajeMutation", "");
      commit("almacenarArrayErroresMutation", []);
    }
  },
  modules: {
    decimos,
    resultados,
    usuario
  }
})
