<template>
  <router-view />
  <menu-inferior />
  <toast-app />
</template>

<script>
import MenuInferior from "@/components/generales/MenuInferior.vue";
import ToastApp from "@/components/generales/toasts/ToastApp.vue";

export default {
  name: "App",
  components: {ToastApp, MenuInferior},
}
</script>