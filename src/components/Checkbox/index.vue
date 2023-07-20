<template>
  <div
    class="checkbox"
    :class="{ [theme]: true, checkbox_active: value }"
    @click="() => emit('change', !value)"
  >
    <div class="checkbox__icon">
      <Icon icon="material-symbols:check" />
    </div>
    <span v-if="slots?.default"><slot /></span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, useSlots } from "vue";

// Components
import { Icon } from "@iconify/vue";

const slots = useSlots();
const emit = defineEmits(["change"]);

const props = defineProps({
  value: { type: Boolean, required: true },
  theme: { type: String, default: "primary" },
});
</script>

<style src="@/assets/css/components/checkbox.css" />
