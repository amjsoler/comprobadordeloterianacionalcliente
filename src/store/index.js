import { createStore } from 'vuex'
import router from "@/router";

export default createStore({
  strict: true,

  state: {
    tokenAuth: "",
    errors: [],
    message: "",
    toastApp: {},
    nombreUsuarioInvitado: "",
  },
  mutations: {
    almacenarMensajeToast(state, {mensaje, tipo}){
      console.log("storage/index.js: mutation - almacenando mensaje para el toast");
      state.toastApp.mensaje = mensaje;
      state.toastApp.tipo = tipo;
    },
    almacenarTokenSesion(state, newTokenSesion){
      console.log("storage/index.js: mutation - almacenando token de sesión en el state");
      state.tokenAuth = newTokenSesion;
    },

    cerrarSesion(state) {
      console.log("storage/index.js: mutation - cerrando sesión de state");
      state.tokenAuth = "";
    },

    almacenarArrayErrores(state, errors) {
      console.log("storage/index.js: mutation - almacenando errores en el state");
      state.errors = errors;
    },

    almacenarMensaje(state, mensaje) {
      console.log("storage/index.js: mutation - almacenando el mensaje en el state");
      state.message = mensaje;
    },
  },
  actions: {
    almacenarMensajeToast({commit}, {mensaje, tipo}) {
      console.log("storage/index.js: action - almacenar mensaje del toast");

      commit("almacenarMensajeToast", {mensaje, tipo});
    },
    almacenarTokenSesion({commit}, newTokenSesion) {
      console.log("storage/index.js: action - almacenando token de sesión en el localstorage");
      //Almaceno en la memoria del dispositivo
      window.localStorage.setItem("tokenAuth", newTokenSesion);

      //Almaceno en el state para la sesión actual
      commit("almacenarTokenSesion", newTokenSesion);
    },
    cerrarSesion({commit}) {
      console.log("storage/index.js: action - Borrando token del storage");
      //Borrando el token del localstorage
      window.localStorage.removeItem("tokenAuth");

      //Llamada al mutator cerrar sesión
      commit("cerrarSesion");

      //Finalmente redirijo a iniciar sesión
      router.push({name:"IniciarSesion"});
    },
    almacenarArrayErrores({commit}, errors) {
      console.log("storage/index.js: action - almacenando errores");

      commit("almacenarArrayErrores", errors);
    },

    almacenarMensaje({commit}, mensaje) {
      console.log("storage/index.js: action - almacenando el mensaje");

      commit("almacenarMensaje", mensaje);
    },
    vaciarValidaciones({commit}){
      console.log("storage/index.js: action - vaciar validaciones");

      commit("almacenarMensaje", "");
      commit("almacenarArrayErrores", []);
    }
  },
  modules: {
  }
})
