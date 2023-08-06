<template>
  <div
    class="checkbox"
    :class="{ [theme]: true, checkbox_active: currentValue }"
    @click="onToggle"
  >
    <div class="checkbox__icon">
      <Icon icon="material-symbols:check" />
    </div>
    <span v-if="slots?.default"><slot /></span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, useSlots, computed } from "vue";

// Components
import { Icon } from "@iconify/vue";

const slots = useSlots();
const emit = defineEmits(["change", "update:modelValue"]);

const props = defineProps({
  value: { type: Boolean, default: false },
  modelValue: { type: Boolean, default: false },

  theme: { type: String, default: "primary" },
});

const currentValue = computed(() => props.modelValue || props.value);

function onToggle() {
  emit("change", !currentValue.value);
  emit("update:modelValue", !currentValue.value);
}
</script>

<style src="@/assets/css/components/checkbox.css" />
