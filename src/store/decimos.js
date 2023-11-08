export default {
    namespaced: true,

    state: {
        misDecimos: [],
    },
    mutations: {
        nuevoDecimoMutation(state, decimo){
            console.log("storage/index.js: mutation - almacenando nuevo décimo en el global state");

            state.misDecimos.push(decimo);
        },
        editarDecimoMutation(state, decimo){
            console.log("storage/index.js: mutation - modificando el décimo en el global state. Decimo: " + decimo);

            //Buscamos el índice que ocupa el decimo a modificar
            const index = state.misDecimos.findIndex(item => item.id === decimo.id);

            //Sobrescribimos el décimo
            state.misDecimos[index] = decimo;
        },
        eliminarDecimoMutation(state, decimoID) {
            console.log("storage/index.js: mutation - eliminar décimo del global state "+ decimoID);

            const index = state.misDecimos.findIndex(item => item.id === decimoID);

            state.misDecimos.splice(index, 1);
        },
        almacenarListadoMisDecimosMutation(state, misDecimos) {
            console.log("storage/index.js: mutation - almacenando el listado de mis decimos en el global state");

            state.misDecimos = misDecimos;
        },
    },
    actions: {
        nuevoDecimoAction({state, commit}, decimo){
            console.log("storage/index.js: action - almacenar nuevo décimo");

            commit("nuevoDecimoMutation", decimo);

            window.localStorage.setItem("misdecimos", state.misDecimos);
        },
        EditarDecimoAction({state, commit}, decimo){
            console.log("storage/index.js: action - editar décimo");

            commit("editarDecimoMutation", decimo);

            window.localStorage.setItem("misdecimos", state.misDecimos);
        },
        eliminarDecimoAction({state, commit}, decimoID){
            console.log("storage/index.js: action - eliminar décimo");

            commit("eliminarDecimoMutation", decimoID);

            window.localStorage.setItem("misdecimos", state.misDecimos);
        },
        almacenarListadoMisDecimosAction({commit}, misDecimos) {
            console.log("storage/index.js: action - almacenar mis decimos");

            commit("almacenarListadoMisDecimosMutation", misDecimos);

            window.localStorage.setItem("misdecimos", misDecimos);
        },
    },
    getters: {
        dameDecimoDadoId: (state) => (decimoID) => {
            console.log("storage/index.js: action - leyendo décimo dado el id. DecimoID: " + decimoID);

            return state.misDecimos.find(item => item.id == decimoID);
        },

        dameDecimosAgrupadosPorSorteo: (state) => {
            console.log("Agrupando decimos por fecha de sorteo en dameDecimosAgrupadosPorSorteo");
            var decimosAgrupados = {};

            if(state.misDecimos){
                state.misDecimos.forEach(item => {
                    if(!decimosAgrupados[item.sorteo]){
                        decimosAgrupados[item.sorteo] = [item];
                    }else{
                        decimosAgrupados[item.sorteo].push(item);
                    }
                });
            }

            return decimosAgrupados;
        }
    }
}