<template>
  <div
    class="select__dropdown__option"
    :class="{ select__dropdown__option_selected: selected }"
  >
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  selected: { type: Boolean, default: false },
});
</script>
