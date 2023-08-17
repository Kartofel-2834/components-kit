<template>
  <button
    class="jo-button"
    :disabled="disabled"
    :class="{
      'jo-button_empty': !slots?.default,
      'jo-button_icon': !!icon.length,
      'jo-button_filled': filled,
      'jo-button_rounded': rounded,
      'jo-button_reverse': reverse,
      [theme]: true,
    }"
  >
    <span class="jo-button__content"><slot /></span>

    <Icon :icon="icon" class="jo-button__icon" />
  </button>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, useSlots } from "vue";

// Components
import { Icon } from "@iconify/vue";

// Types
import { Slots } from "vue";

// Interfaces
interface Props {
  theme?: string;
  icon?: string;
  disabled?: boolean;
  rounded?: boolean;
  filled?: boolean;
  reverse?: boolean;
}

const slots: Slots = useSlots();

withDefaults(defineProps<Props>(), {
  theme: "primary",
  icon: "",
  disabled: false,
  rounded: false,
  filled: false,
  reverse: false,
});
</script>

<style>
/* Simple button */

.jo-button {
  appearance: none;
  display: flex;
  align-items: center;
  gap: 0.5em;
  background-color: transparent;
  font-size: 1.25em;
  font-weight: 600;
  border: 1px solid var(--theme-text);
  color: var(--theme-text);
  padding: 1em 1.5em;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.jo-button:disabled {
  opacity: 0.8;
}

.jo-button:hover:not(:disabled),
.jo-button:active:not(:disabled) {
  border-color: var(--theme);
}

.jo-button:active:not(:disabled) {
  background-color: var(--theme);
}

.jo-button .jo-button__icon {
  display: none;
}

.jo-button.jo-button_empty .jo-button__content {
  display: none;
}

.jo-button.jo-button_empty.jo-button_icon {
  padding: 0.5em;
}

/* Filled button */

.jo-button.jo-button_filled {
  background-color: var(--theme);
  border-color: var(--theme);
}

.jo-button.jo-button_filled:hover:not(:active, :disabled) {
  opacity: 0.9;
}

.jo-button.jo-button_filled:active:not(:disabled) {
  background-color: var(--theme-text);
  border-color: var(--theme-text);
  color: var(--theme);
}

/* Reverse button */

.jo-button.jo-button_reverse {
  flex-direction: row-reverse;
}

/* Icon button */

.jo-button.jo-button_icon {
  padding: 0.75em 1.25em;
}

.jo-button.jo-button_icon .jo-button__icon {
  display: block;
  font-size: 1.35em;
}

/* Rounded button */

.jo-button.jo-button_rounded {
  border-radius: 1.5em;
}
</style>
