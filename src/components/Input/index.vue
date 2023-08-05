<template>
  <NumberInput
    v-if="type === 'number'"
    @change="onValueChange"
    @update:modelValue="onValueChange"
  />

  <PasswordInput
    v-else-if="type === 'password'"
    @change="onValueChange"
    @update:modelValue="onValueChange"
  />

  <PhoneInput
    v-else-if="type === 'phone'"
    @change="onValueChange"
    @update:modelValue="onValueChange"
  />

  <BaseInput v-else @change="onValueChange" @update:modelValue="onValueChange">
    <template v-if="slots?.icon" #icon>
      <slot name="icon" />
    </template>
  </BaseInput>
</template>

<script setup>
import { defineProps, defineEmits, provide, useSlots, computed } from "vue";

// Components
import BaseInput from "./base.vue";
import NumberInput from "./number.vue";
import PasswordInput from "./password.vue";
import PhoneInput from "./phone.vue";

const emit = defineEmits(["change", "update:modelValue"]);
const slots = useSlots();
const props = defineProps({
  // Base
  modelValue: { type: String, default: "" },
  value: { type: String, default: "" },
  type: { type: String, default: "text" },
  theme: { type: String, default: "primary" },
  placeholder: { type: String, default: "" },
  icon: { type: String, required: false },
  iconClickable: { type: Boolean, default: false },
  iconHided: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },

  // Number
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  controls: { type: Boolean, default: false },
  precision: { type: Number, default: 2 },
  step: { type: Number, default: 1 },

  // Phone
  start: { type: String, default: "+7" },
  replacements: { type: Object, default: () => ({ 8: "7", 9: "79" }) },
});

provide("dependencies", props);
provide(
  "currentValue",
  computed(() => props.value || props.modelValue)
);

function onValueChange(newValue) {
  emit("change", newValue);
  emit("update:modelValue", newValue);
}
</script>

<style src="@/assets/css/components/input.css" />
