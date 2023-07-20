<template>
  <button
    class="button"
    :disabled="disabled"
    :class="{
      button_empty: !slots?.default,
      button_icon: !!icon.length,
      button_filled: filled,
      button_rounded: rounded,
      button_reverse: reverse,
      [theme]: true,
    }"
  >
    <span class="button__content"><slot /></span>

    <Icon :icon="icon" class="button__icon" />
  </button>
</template>

<script setup>
import { defineProps, useSlots } from "vue";

// Components
import { Icon } from "@iconify/vue";

const slots = useSlots();
const props = defineProps({
  theme: { type: String, default: "primary" },
  icon: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  rounded: { type: Boolean, default: false },
  filled: { type: Boolean, default: false },
  reverse: { type: Boolean, default: false },
});
</script>

<style src="@/assets/css/components/button.css" />
