<template>
  <input :type="type"
         :value="modelValue"
         @change="$emit('update:modelValue', $event.target.value)"
         class="form-control block w-full rounded-md shadow-sm text-center" />
</template>

<script>
export default {
  name:"InputControl",
  props: ["type", "modelValue"],
  emits: ["update:modelValue"]
}
</script>