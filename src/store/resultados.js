export default {
    namespaced: true,
    state: {
        ultimosResultados: [],
        selectedIndex: "",
        decimoAComprobar: {},
        premioObtenido: {}
    },
    mutations: {
        almacenarUltimosResultadosMutation(state, resultados) {
            console.log("resultados.js: entrando a almacenarUltimosResultadosMutation");

            state.ultimosResultados = resultados;

            console.log("resultados.js: saliendo de almacenarUltimosResultadosMutation");
        },
        almacenarSelectedIndexMutation(state, seleccionado) {
            console.log("resultados.js: entrando a almacenarSelectedIndexMutation");

            state.selectedIndex = seleccionado;

            console.log("resultados.js: saliendo del almacenarSelectedIndexMutation");
        },
        almacenarDecimoAComprobarMutation(state, decimoAComprobar) {
            console.log("resultados.js: entrando a almacenarDecimoAComprobarMutation");

            state.decimoAComprobar = decimoAComprobar;

            console.log("resultados.js: saliendo del almacenarDecimoAComprobarMutation");
        },

        almacenarPremioObtenido(state, premioObtenido) {
            console.log("resultados.js: entrando a almacenarPremioObtenido");

            state.premioObtenido = premioObtenido;

            console.log("resultados.js: saliendo del almacenarPremioObtenido");
        }
    },
    actions: {
        almacenarUltimosResultadosAction({commit, state}, resultados){
            console.log("resultados.js: entrando a almacenarUltimosResultadosAction");

            commit("almacenarUltimosResultadosMutation", resultados);

            window.localStorage.setItem("ultimosResultados", state.ultimosResultados);

            console.log("resultados.js: saliendo de almacenarUltimosResultadosAction");
        },

        almacenarSelectedIndexAction({commit}, seleccionado) {
            console.log("resultados.js: entrando al  almacenarSelectedIndexAction");

            commit("almacenarSelectedIndexMutation", seleccionado);

            console.log("resultados.js: saliendo del  almacenarSelectedIndexAction");
        },

        almacenarDecimoAComprobarAction({commit}, decimoAComprobar) {
            console.log("resultados.js: entrando a almacenarDecimoAComprobarAction");

            commit("almacenarDecimoAComprobarMutation", decimoAComprobar);

            console.log("resultados.js: saliendo del almacenarDecimoAComprobarAction");
        },

        almacenarPremioObtenido({commit}, premioObtenido) {
            console.log("resultados.js: entrando a almacenarPremioObtenido");

            commit("almacenarPremioObtenido", premioObtenido);

            console.log("resultados.js: saliendo del almacenarPremioObtenido");
        }
    }
}