<template>
  <div>
    <div class="row justify-content-center">
      {{ nombre }}
    </div>
    <div class="row align-items-center">
      <div class="col-6">
        <slot></slot>
      </div>
      <div class="col-6 fw-bold fs-8">
        {{premio}}€
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TarjetaPremio",
  props: ["nombre", "premio"]
}
</script>