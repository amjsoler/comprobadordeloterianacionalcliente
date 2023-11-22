import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

import"bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import '@/assets/css/estilos-generales.css'
import globalHelpers from "@/helpers/globalHelpers.vue";
//TODO: Ver como minificar todo los recursos

const app = createApp(App).use(store).use(router);

//interceptor de todas las request que se encarga de incluir el token de auth (Si lo hay) a los headers
axios.interceptors.request.use(function(config){
    if(store.state.tokenAuth){
        config.headers.Authorization = "Bearer " + store.state.tokenAuth;
    }

    return config;
}, function(error){
    return Promise.reject(error)
});

/*Cosas a comprobar en todas las respuestas:
Si el server responde 200, borro/reseteo el array de errores de validación y el mensaje para que en el formulario al que voy
no se muestre nada extraño

Si el server responde 401 significa que no hay autenticación, por tanto, o bien el user no está logueado y ha intentado
acceder a algún sitio que no debía o el token que ha mandado ya no es válido
En ambos casos, borro el token de sesión en el store y en el localstorage y redirijo al login

Si el server responde 403 significa que no hay autorización para acceder al recurso que está pidiendo. Si es así,
capturo el error, lo logueo y redirijo a una página de forbidden

Si recibo un código 422, es un error de validación, guardo el array de errores y el mensaje en el global state para mostrarlo

Si recibo un código 460, significa que la cuenta del usuario no está verificada y redirijo a la vista de verificación
 */
axios.interceptors.response.use(response => {
    if(response.status === 200){
    //Si recibo 200, borro el array de errores y mensaje para que no afecte a las páginas
        console.log("main.js: Response captured: 200. Borrando el global state error y message...");

        store.dispatch("vaciarValidacionesAction");
    }

    store.dispatch("procesandoAction", false);

    return response;
}, error => {
    if(error.response.status === 401){
        console.log("main.js: Response error captured: 401. Eliminando token de storage y state y redirigiendo a login");
        store.dispatch("cerrarSesionAction");
    }

    else if(error.response.status === 403){
        console.log("main.js: Response error captured: 403. Acción no permitida al user.");

        //Loguear esto al server por si hay que emprender acciones contra el usuario
        globalHelpers.logError("Un usuario ha intentado acceder a un sitio al que no debía",
            {
                userToken: store.state.tokenAuth,
                error: error
            })

        router.push({name: "ForbiddenResource"});
    }

    else if(error.response.status === 422){
        console.log("main.js: Response error captured: 422. Set de state errors y message");
        if(error.response && error.response.data &&
            error.response.data.errors &&
            error.response.data.message){
            store.dispatch("almacenarArrayErroresAction", error.response.data.errors);
            store.dispatch("almacenarMensajeAction", error.response.data.message);
        }
    }
    else if(error.response.status === 460){
        console.log("main.js: Response error captured: 460. Cuenta no verificada, redirijo a la vista de verificación");

        router.push({name:"VerificarCuenta"});
    }
    else if(error.response.status === 404){
        console.log("main.js: Response error captured: 404. Recurso no encontrado. Muestro la vista 404");

        router.push({name:"NotFoundResource"});
    }
    else {
        //Si no conozco el status del error que se devuelve, lo logueo en servidor y muestro un toast
        globalHelpers.logError("Error con status desconocido", error);

        globalHelpers.mostrarToast("Ha ocurrido un error inesperado. Por favor, intentalo de nuevo más tarde");
    }

    store.dispatch("procesandoAction", false);

    return Promise.reject(error)
});

//Este código es el que se encarga de capturar los errores y mandar el log al servidor para tenerlo centralizado
app.config.errorHandler = (err, instance, info) => {
    console.log("Manejando error general: " + err + toString(instance) + toString(info))

    globalHelpers.logError("Se ha producido un error general",
        {
            userToken: store.state.tokenAuth,
            error: err,
            instance: instance,
            info: info
        })
}

app.mount('#app');
