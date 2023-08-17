<template>
  <div
    class="jo-checkbox"
    :class="{ [theme]: true, 'jo-checkbox_active': currentValue }"
    @click="onToggle"
  >
    <div class="jo-checkbox__icon">
      <Icon icon="material-symbols:check" />
    </div>
    <span v-if="slots?.default"><slot /></span>
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps,
  defineEmits,
  withDefaults,
  useSlots,
  computed,
} from "vue";

// Components
import { Icon } from "@iconify/vue";

// Types
import { Slots } from "vue";

// Interfaces
interface Props {
  theme?: string;
  value?: boolean;
  modelValue?: boolean;
}

interface Emit {
  (event: "change", value: boolean): void;
  (event: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<Emit>();
const slots: Slots = useSlots();
const props = withDefaults(defineProps<Props>(), {
  theme: "primary",
});

const currentValue = computed<boolean>(
  () => !!(props.modelValue || props.value)
);

function onToggle() {
  emit("change", !currentValue.value);
  emit("update:modelValue", !currentValue.value);
}
</script>

<style>
.jo-checkbox {
  display: flex;
  align-items: center;
  color: var(--theme-text);
  width: fit-content;
  gap: 0.75em;
  cursor: pointer;
}

.jo-checkbox__icon {
  font-size: 1.25em;
  width: 1em;
  height: 1em;
  padding: 0.15em;
  background-color: transparent;
  border: 1px solid grey;
  color: var(--theme-text);
  transition: 0.2s ease-in-out;
}

.jo-checkbox__icon svg {
  transform: scale(0);
  transition: 0.2s ease-in-out;
}

.jo-checkbox.jo-checkbox_active .jo-checkbox__icon {
  border-color: var(--theme);
  background-color: var(--theme);
}

.jo-checkbox.jo-checkbox_active .jo-checkbox__icon svg {
  transform: scale(1);
}
</style>
