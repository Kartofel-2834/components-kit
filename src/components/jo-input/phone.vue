<template>
  <BaseInput type="phone" @change="onChange" @keydown="onKeydown" />
</template>

<script lang="ts" setup>
import { defineComponent, computed, provide, inject, ComputedRef } from "vue";

// Components
import BaseInput from "./base.vue";

// Utils
import formatPhone from "../../utils/formatPhone";

// Interfaces
import { IProps } from "./index.vue";

interface IEvents {
  (event: "change", value: string): void;
  (event: "update:modelValue", value: string): void;
}

defineComponent({
  name: "jo-input-phone",
});

const allowedButtons = new Set<string>([
  "Backspace",
  "ArrowLeft",
  "ArrowRight",
]);

const emit = defineEmits<IEvents>();

const dependencies: IProps = inject("dependencies", {} as IProps);
const currentValue: ComputedRef<string> = inject(
  "currentValue",
  {} as ComputedRef
);

const parsedValue: ComputedRef<string> = computed<string>(() => {
  const digistOnly: string = currentValue.value.replace(/\D/g, "");

  if (currentValue.value !== digistOnly) {
    emit("change", digistOnly);
    emit("update:modelValue", digistOnly);
  }

  return formatPhone(digistOnly, dependencies.start, dependencies.replacements);
});

provide("currentValue", parsedValue);

function onChange(value: string): void {
  const update = value.replace(/\D/g, "");

  emit("change", update);
  emit("update:modelValue", update);
}

function onKeydown(event: KeyboardEvent): void {
  const { key, ctrlKey: ctrlPressed } = event;

  const start: string = dependencies?.start || "+7";

  if (allowedButtons.has(key) || ctrlPressed) return;

  if (currentValue.value.length < 9 + start.length && /[0-9]/.test(key)) {
    return;
  }

  event.preventDefault();
}
</script>
