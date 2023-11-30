export default {
    namespaced: true,
    state: {
        alertasporcorreo: "",
        alertaspornotificacion: ""
    },

    mutations: {
        almacenarConfiguracionCuentaUsuarioMutation(state, payload){
            console.log("usuario.js - Entrando a almacenarConfiguracionCuentaUsuarioMutation:" + payload);

            state.alertasporcorreo = payload.alertasporcorreo;
            state.alertaspornotificacion = payload.alertaspornotificacion;

            console.log("usuario.js - Saliendo de almacenarConfiguracionCuentaUsuarioMutation");
        },

        almacenarAlertasPorCorreoMutation(state, payload) {
            console.log("usuario.js - Entrando a almacenarConfiguracionCuentaUsuarioMutation")

            state.alertasporcorreo = payload;

            console.log("usuario.js - Saliendo de almacenarConfiguracionCuentaUsuarioMutation")
        },

        almacenarAlertasPorNotificacionMutation(state, payload){
            console.log("usuario.js - Entrando a almacenarAlertasPorNotificacionMutation");

            state.alertaspornotificacion = payload;

            console.log("usuario.js - Entrando a almacenarAlertasPorNotificacionMutation");
        }
    },

    actions: {
        almacenarConfiguracionCuentaUsuarioAction({state, commit}, payload){
            console.log("usuario.js - Entrando a almacenarConfiguracionCuentaUsuarioMutation.");

            commit("almacenarConfiguracionCuentaUsuarioMutation", {alertasporcorreo: payload.alertasporcorreo, alertaspornotificacion: payload.alertaspornotificacion});

            window.localStorage.setItem("usuario.alertasporcorreo", state.alertasporcorreo);
            window.localStorage.setItem("usuario.alertaspornotificacion", state.alertaspornotificacion);

            console.log("usuario.js - Saliendo de almacenarConfiguracionCuentaUsuarioMutation");
        },

        almacenarAlertasPorCorreoAction({commit}, alertasporcorreo){
            console.log("usuario.js - Entrando a almacenarAlertasPorCorreoAction");

            commit("almacenarAlertasPorCorreoMutation", alertasporcorreo);

            console.log("usuario.js - Saliendo de almacenarAlertasPorCorreoAction");
        },

        almacenarAlertasPorNotificacionAction({commit}, alertaspornotificacion){
            console.log("usuario.js - Entrando a almacenarAlertasPorNotificacionAction");

            commit("almacenarAlertasPorNotificacionMutation", alertaspornotificacion);

            console.log("usuario.js - Saliendo de almacenarAlertasPorNotificacionAction");
        }
    },
}