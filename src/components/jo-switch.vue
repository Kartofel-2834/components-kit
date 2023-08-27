<template>
  <label
    class="jo-switch"
    :class="{
      'jo-switch_active': currentValue,
      'jo-switch_disabled': disabled,
      [theme]: true,
    }"
  >
    <input
      type="checkbox"
      class="jo-switch__input"
      :checked="currentValue"
      :disabled="disabled"
      @change="onChange"
    />
  </label>
</template>

<script lang="ts" setup>
import { computed } from "vue";

// Interfaces
import { IComponent } from "@/interfaces/index";

interface IProps extends IComponent {
  value?: boolean;
  modelValue?: boolean;
  disabled?: boolean;
}

interface IEvents {
  (event: "change", value: boolean): void;
  (event: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<IEvents>();

const props = withDefaults(defineProps<IProps>(), {
  theme: "primary",
  value: false,
  modelValue: false,
  disabled: false,
});

const currentValue = computed<boolean>(
  () => !!(props.value || props.modelValue)
);

function onChange(event: Event): void {
  const target = event.target as HTMLInputElement;

  emit("update:modelValue", target.checked);
  emit("change", target.checked);
}
</script>

<style>
.jo-switch {
  display: flex;
  width: 2.85em;
  height: 1.25em;
  background-color: grey;
  padding: 0.2em 0.3em;
  border-radius: 1em;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.jo-switch_disabled {
  opacity: 0.7;
  cursor: default;
}

.jo-switch::before {
  content: "";
  width: 1.25em;
  height: 1.25em;
  border-radius: 100%;
  background-color: white;
  transition: 0.2s ease-in-out;
}

.jo-switch_active {
  background-color: var(--theme);
}

.jo-switch_active::before {
  margin-left: calc(100% - 1.25em);
}

.jo-switch__input {
  display: none;
}
</style>
