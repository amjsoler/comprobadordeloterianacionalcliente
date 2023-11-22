<template>
  <div class="mb-4">
    <p class="fs-3">
      {{ nombre }}
    </p>
    <div class="row align-items-center">
      <div class="col-6">
        <slot></slot>
      </div>
      <div class="col-6 fw-bold fs-8">
        {{premio}}€
      </div>
    </div>
    <hr>
  </div>
</template>
<script>
export default {
  name: "TarjetaPremio",
  props: ["nombre", "premio"]
}
</script>