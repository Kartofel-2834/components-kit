<template>
  <BaseInput type="phone" @change="onChange" @keydown="onKeydown" />
</template>

<script setup>
import { defineEmits, computed, provide, inject } from "vue";

// Components
import BaseInput from "./base.vue";

// Utils
import formatPhone from "@/utils/formatPhone";

const allowedButtons = new Set(["Backspace", "ArrowLeft", "ArrowRight"]);

const emit = defineEmits(["change", "update:modelValue"]);

const dependencies = inject("dependencies");
const currentValue = inject("currentValue");

const parsedValue = computed(() => {
  const value = `${currentValue.value}`;
  const digistOnly = value.replace(/\D/g, "");

  if (currentValue.value !== digistOnly) {
    emit("change", digistOnly);
    emit("update:modelValue", digistOnly);
  }

  const phone = formatPhone(
    digistOnly,
    dependencies.start,
    dependencies.replacements
  );

  return phone;
});

provide("currentValue", parsedValue);

function onChange(value) {
  const update = value.replace(/\D/g, "");

  emit("change", update);
  emit("update:modelValue", update);
}

function onKeydown(event) {
  const { key, ctrlKey: ctrlPressed } = event;

  if (allowedButtons.has(key) || ctrlPressed) return;
  if (
    dependencies.value.length < 9 + dependencies.start.length &&
    /[0-9]/.test(key)
  ) {
    return;
  }
  event.preventDefault();
}
</script>
