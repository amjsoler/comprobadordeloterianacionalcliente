<template>
  <router-view />
  <menu-inferior />
  <toast-app />
</template>

<script>
import MenuInferior from "@/components/MenuInferior.vue";
import ToastApp from "@/components/toasts/ToastApp.vue";

export default {
  name: "App",
  components: {ToastApp, MenuInferior},
}
</script>