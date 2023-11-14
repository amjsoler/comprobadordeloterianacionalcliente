<template>
  <button @click.prevent="$emit('submitClick')" class="btn btn-primary w-100">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ButtonSubmit"
}
</script>