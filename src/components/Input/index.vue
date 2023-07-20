<template>
  <NumberInput
    v-if="type === 'number'"
    :value="value"
    :min="min"
    :max="max"
    :theme="theme"
    :placeholder="placeholder"
    :disabled="disabled"
    :controls="controls"
    :precision="precision"
    :step="step"
    @change="(v) => emit('change', v)"
  />

  <PasswordInput
    v-else-if="type === 'password'"
    :value="value"
    :theme="theme"
    :placeholder="placeholder"
    :disabled="disabled"
    @change="(v) => emit('change', v)"
  />

  <BaseInput
    v-else
    :value="value"
    :theme="theme"
    :disabled="disabled"
    :placeholder="placeholder"
    :icon="currentIcon"
    :icon-clickable="isIconClickable"
    :icon-hided="isIconHided"
    @icon="onIconClick"
    @change="(v) => emit('change', v)"
  >
    <slot name="icon" />
  </BaseInput>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from "vue";

// Components
import BaseInput from "./base.vue";
import PasswordInput from "./password.vue";
import NumberInput from "./number.vue";

const emit = defineEmits(["change", "icon"]);

const props = defineProps({
  // Base
  value: { type: String, default: "" },
  type: { type: String, default: "" },
  theme: { type: String, default: "primary" },
  placeholder: { type: String, default: "" },
  icon: { type: String, required: false },
  iconClickable: { type: Boolean, default: false },
  iconHided: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },

  // Number
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  controls: { type: Boolean, default: false },
  precision: { type: Number, default: 2 },
  step: { type: Number, default: 1 },
});

const currentIcon = computed(() => {
  if (typeof props.icon === "string" && props.icon?.length) return props.icon;

  return props.clearable ? "material-symbols:close" : null;
});

const isIconClickable = computed(() => {
  if (typeof props.icon === "string" && props.icon?.length) {
    return props.iconClickable;
  }

  return props.clearable;
});

const isIconHided = computed(() => {
  if (typeof props.icon === "string" && props.icon?.length) return false;

  return props.clearable ? !props.value.length : true;
});

function onIconClick() {
  if (typeof props.icon === "string" && props.icon?.length) {
    return emit("icon");
  }

  if (props.clearable) return clear();
}

function clear() {
  emit("change", "");
}
</script>

<style src="@/assets/css/components/input.css" />
