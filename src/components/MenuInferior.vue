<template>
    <nav class="nav navbar fixed-bottom bg-white border-top h-15 d-flex flex-row">
        <router-link :to="{name: 'BuscarDecimo'}"
                     class="d-block w-100 text-center text-decoration-none text-secondary">
            <span class="material-symbols-outlined w-100 icono">search</span>
            <span class="fuente-menu d-block mt-2 lh-1">Buscar</span>
        </router-link>
        <router-link :to="{name: 'MisDecimos'}"
                     class="d-block w-100 text-center text-decoration-none text-secondary">
            <span class="material-symbols-outlined w-100 icono">local_activity</span>
            <span class="fuente-menu d-block mt-2 lh-1">Mis décimos</span>
        </router-link>
        <router-link :to="{name: 'ComprobarDecimo'}"
                     class="d-block w-100 text-center text-decoration-none text-secondary">
            <span class="material-symbols-outlined w-100 icono">qr_code_scanner</span>
            <span class="fuente-menu d-block mt-2 lh-1">Comprobar décimo</span>
        </router-link>
      <router-link :to="{name: 'UltimosResultados'}"
                   class="d-block w-100 text-center text-decoration-none text-secondary">
        <span class="material-symbols-outlined w-100 icono">trophy</span>
        <span class="fuente-menu d-block mt-2 lh-1">Últimos resultados</span>
      </router-link>
        <router-link :to="{name: 'CuentaUsuario'}"
                     class="w-100 text-center text-decoration-none text-secondary">
            <span class="material-symbols-outlined w-100 icono">account_circle</span>
            <span class="fuente-menu d-block mt-2 lh-1">Perfil</span>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "MenuInferior"
}
</script>