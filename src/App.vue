<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-slide">
      <component :is="Component" />
    </transition>
  </router-view>
  <menu-inferior />
  <toast-app />
</template>

<style>
  .fade-slide-enter-active {
    transition: all 0.2s ease 0.2s;
  }

  .fade-slide-leave-active {
    transition: all 0.2s ease;
  }

  .fade-slide-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }

  .fade-slide-enter-to {
    opacity: 100%;
    transform: translateX(0);
  }

  .fade-slide-leave-from {
    opacity: 100%;
    transform: translateX(0);
  }

  .fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
</style>

<script>
import MenuInferior from "@/components/generales/MenuInferior.vue";
import ToastApp from "@/components/generales/toasts/ToastApp.vue";

export default {
  name: "App",
  components: {ToastApp, MenuInferior},
}
</script>