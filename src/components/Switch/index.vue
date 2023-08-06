<template>
  <div
    class="switch"
    :class="{
      [theme]: true,
      switch_active: currentValue,
      switch_disabled: disabled,
    }"
    @click="onValueChange"
  />
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const emit = defineEmits(["update:modelValue", "change"]);

const props = defineProps({
  theme: { type: String, default: "primary" },
  value: { type: Boolean, default: false },
  modelValue: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const currentValue = computed(() => props.value || props.modelValue);

function onValueChange() {
  if (props.disabled) return;

  emit("update:modelValue", !currentValue.value);
  emit("change", !currentValue.value);
}
</script>

<style src="@/assets/css/components/switch.css" />
