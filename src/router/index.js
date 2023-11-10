import {createRouter, createWebHistory} from 'vue-router'

import store from "@/store";
import globalHelpers from "@/helpers/globalHelpers.vue";

import IniciarSesion from "@/views/usuario/IniciarSesion.vue";
import RegistroUsuario from "@/views/usuario/RegistroUsuario.vue";
import RecuperarContrasena from "@/views/usuario/RecuperarContrasena.vue";
import MisDecimos from "@/views/decimos/MisDecimos.vue";
import ComprobarDecimo from "@/views/decimos/ComprobarDecimo.vue";
import ComprobarDecimoQR from "@/views/decimos/ComprobarDecimoQR.vue";
import UltimosResultados from "@/views/resultados/UltimosResultados.vue";
import CuentaUsuario from "@/views/usuario/CuentaUsuario.vue";
import BuscarDecimo from "@/views/decimos/BuscarDecimo.vue";
import CrearDecimo from "@/views/decimos/CrearDecimo.vue";
import EditarDecimo from "@/views/decimos/EditarDecimo.vue";
import VerDecimo from "@/views/decimos/VerDecimo.vue";

const routes = [
    //Rutas de USUARIO
  {
    path: '/iniciar-sesion',
    name: 'IniciarSesion',
    component: IniciarSesion,
    meta: {
      requiresGuest: true
    },
  },
  {
    path: '/registo-usuario',
    name: 'RegistroUsuario',
    component: RegistroUsuario,
    meta: {
      requiresGuest: true
    },
  },
  {
    path: '/recuperar-contrasena',
    name: 'RecuperarContrasena',
    component: RecuperarContrasena
  },
  {
    path: '/cuenta-usuario',
    name: "CuentaUsuario",
    component: CuentaUsuario,
    meta: {
      requiresAuth: true
    }
  },
    //RUTAS DE DÉCIMOS
  {
    path: '/mis-decimos',
    name: 'MisDecimos',
    component: MisDecimos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/mis-decimos/:id',
    name: 'VerDecimo',
    component: VerDecimo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/mis-decimos/crear',
    name: 'CrearDecimo',
    component: CrearDecimo,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/mis-decimos/:id/editar',
    name: 'EditarDecimo',
    component: EditarDecimo,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/decimos/comprobar',
    name: 'ComprobarDecimo',
    component: ComprobarDecimo,
  },
  {
    path: '/decimos/comprobar-qr',
    name: 'ComprobarDecimoQR',
    component: ComprobarDecimoQR,
  },
  {
    path: '/decimos/buscar',
    name: 'BuscarDecimo',
    component: BuscarDecimo,
  },

    //RUTAS DE RESULTADOS
  {
    path: '/ultimos-resultados',
    name: 'UltimosResultados',
    component: UltimosResultados,
  },
]

const router = createRouter({
  history: createWebHistory(),//TODO: Ver si tengo que meter un base url aquí
  routes
})

/*
* En cada redirección, se comprueba si la ruta de destino tiene algún guard:
* requiresAuth: La ruta de destino obliga a estar autenticado para poder acceder
* requiresGuest: La ruta de destino obliga a no estar logueado para poder acceder
*/
router.beforeEach((to, from, next) => {
  //Vacío el global state de validaciones
  store.dispatch("vaciarValidaciones");

  //Cierro modales que puedan quedar abiertos
  globalHelpers.cerrarTodosLosModalesAbiertos();

  //Comprobamos si la ruta de destino precisa autenticación
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log("router/index.js: Redirect con requiresAuth...");

    //Primero sincronizo tokens
    sincronizarTokens();

    //Si el token de store y el token de localstorage están establecidos continuo la redirección
    if (store.state.tokenAuth && window.localStorage.getItem("tokenAuth") &&
        store.state.tokenAuth == window.localStorage.getItem("tokenAuth")) {
      console.log("router/index.js: Tenemos token en state y storage por tanto dejo continuar");
      next();
    } else {
      console.log("router/index.js: No había token, redirijo al login");
      //Si ninguna de las dos fuentes tiene el token, redirijo al inicio de sesión
      next({name: "IniciarSesion"});
    }
  } else {
    //Compruebo si la ruta precisa acceder como invitado
    if (to.matched.some((record) => record.meta.requiresGuest)) {
      console.log("router/index.js: Redirect con requiresGuest...");
      //Si ninguna de las dos fuentes tiene el token, estoy como invitado, así que prosigo
      if (!store.state.tokenAuth && !window.localStorage.getItem("tokenAuth")) {
        console.log("router/index.js: No hay toquen en ningún sitio, dejo continuar porque es invitado.");
        next();
      } else {
        sincronizarTokens();
        console.log("router/index.js: He encontrado algún token, redirijo al perfil");
        //Si no, redirijo a la cuenta de usuario
        next({name: "MisDecimos"});
      }
    } else {
      sincronizarTokens();
      console.log("router/index.js: La ruta destino no tiene ningún guard, dejo continuar");
      next();
    }
  }
});

function sincronizarTokens(){
  if (store.state.tokenAuth && window.localStorage.getItem("tokenAuth")) {
    if (store.state.tokenAuth != window.localStorage.getItem("tokenAuth")) {
      //Si hay token en las dos fuentes pero son distintos, significa que se han desincronizado por alguna razón, los borro y redirijo a login
      store.dispatch("cerrarSesionAction");
    }
  }else{
    if(store.state.tokenAuth){
      store.dispatch("almacenarTokenSesion", store.state.tokenAuth);
    }else{
      if (window.localStorage.getItem("tokenAuth")) {
        store.dispatch("almacenarTokenSesion", window.localStorage.getItem("tokenAuth"));
      }
    }
  }
}

export default router
