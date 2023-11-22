<template>
  <div class="toast-container position-fixed w-100">
    <div id="toastApp"
         class="toast align-items-center fade hide"
         role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {{toastApp.mensaje}}
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "ToastApp",
  computed: {
     ...mapState(["toastApp"]),
  },
}
</script>

<style scoped>
    .toast-container {
        bottom: 100px;
        position: fixed !important;
        left: 0px;
    }

    .toast {
        margin: 0 auto !important;
    }
</style>