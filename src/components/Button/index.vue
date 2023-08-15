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

<script setup lang="ts">
import { defineProps, withDefaults, useSlots } from "vue";

// Types
import { Slots } from "vue";

// Components
import { Icon } from "@iconify/vue";

export interface IButton {
  theme?: string;
  icon?: string;

  disabled?: boolean;
  rounded?: boolean;
  filled?: boolean;
  reverse?: boolean;
}

const slots: Slots = useSlots();

withDefaults(defineProps<IButton>(), {
  theme: "primary",
  icon: "",
  disabled: false,
  rounded: false,
  filled: false,
  reverse: false,
});
</script>

<style src="@/assets/css/components/button.css" />
