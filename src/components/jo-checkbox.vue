<template>
  <label
    class="jo-checkbox"
    :class="{ [theme]: true, 'jo-checkbox_active': currentValue }"
    @change="onChange"
  >
    <div class="jo-checkbox__icon">
      <Icon icon="material-symbols:check" />
    </div>

    <span v-if="slots?.default" class="jo-checkbox__label">
      <slot />
    </span>

    <input type="checkbox" class="jo-checkbox__input" />
  </label>
</template>

<script lang="ts" setup>
import { useSlots, computed } from "vue";

// Components
import { Icon } from "@iconify/vue";

// Types
import { Slots } from "vue";

// Interfaces
interface IProps {
  theme?: string;
  value?: boolean;
  modelValue?: boolean;
}

interface IEvents {
  (event: "change", value: boolean): void;
  (event: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<IEvents>();

const slots: Slots = useSlots();
const props = withDefaults(defineProps<IProps>(), {
  theme: "primary",
});

const currentValue = computed<boolean>(
  () => !!(props.modelValue || props.value)
);

function onChange(event: Event): void {
  const target = event.target as HTMLInputElement;

  emit("change", target.checked);
  emit("update:modelValue", target.checked);
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

.jo-checkbox__input {
  display: none;
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
