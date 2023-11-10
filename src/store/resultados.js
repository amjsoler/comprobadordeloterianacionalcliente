export default {
    namespaced: true,
    state: {
        ultimosResultados: [],
        selectedIndex: "",
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
        }
    }
}