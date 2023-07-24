<template>
  <BaseInput
    :value="parsedValue"
    :icon="icon"
    type="phone"
    @change="onChange"
    @keydown="onKeydown"
  />
</template>

<script setup>
import { defineProps, computed } from "vue";

// Components
import BaseInput from "./base.vue";

const allowedButtons = new Set(["Backspace", "ArrowLeft", "ArrowRight"]);

const emit = defineEmits(["change"]);

const props = defineProps({
  icon: { type: String, default: "basil:phone-solid" },
  value: { type: String, default: "" },
  start: { type: String, default: "+7" },
  replacements: { type: Object, default: () => ({ 8: "7", 9: "79" }) },
});

const parsedValue = computed(() => {
  const digistOnly = props.value.replace(/\D/g, "");

  if (props.value !== digistOnly) {
    emit("change", digistOnly);
  }

  const phone = formatPhone(digistOnly, props.start, props.replacements);

  return phone;
});

function onChange(value) {
  emit("change", value.replace(/\D/g, ""));
}

function onKeydown(event) {
  const { key, ctrlKey: ctrlPressed } = event;

  if (allowedButtons.has(key) || ctrlPressed) return;
  if (props.value.length < 9 + props.start.length && /[0-9]/.test(key)) return;

  event.preventDefault();
}

function formatPhone(str, start = "+7", equivalents = { 8: "7", 9: "79" }) {
  if (!str.length) return str;

  let digitsOnly = str.replace(/\D/g, "");

  for (const equivalent in equivalents) {
    if (!new RegExp(`^${equivalent}`).test(digitsOnly)) continue;

    digitsOnly = digitsOnly.replace(equivalent, equivalents[equivalent]);
  }

  digitsOnly = `+${digitsOnly}`;

  if (digitsOnly.length < start.length) return digitsOnly;

  const startCheck = new RegExp(`^\\+${start.slice(1)}`);

  if (!startCheck.test(digitsOnly)) return digitsOnly;

  const content = digitsOnly.slice(digitsOnly.indexOf(start) + start.length);
  let result = `${start}`;

  if (!content.length) return result;

  result += ` (${content.slice(0, 3)}`;

  if (content.length < 4) return result;

  result += `) ${content.slice(3, 6)}`;

  if (content.length < 7) return result;

  result += ` ${content.slice(6, 8)}`;

  if (content.length < 8) return result;

  result += `-${content.slice(8, 10)}`;

  return result;
}
</script>
