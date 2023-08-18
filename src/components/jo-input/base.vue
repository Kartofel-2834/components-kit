<template>
  <div class="jo-inputbase" :class="{ [currentTheme]: true }">
    <input
      :value="currentValue"
      :type="currentType"
      :disabled="dependencies.disabled"
      :placeholder="dependencies.placeholder"
      class="jo-input"
      :class="{ 'jo-input_icon': dependencies?.icon || slots?.icon }"
      @input="onValueChange"
      @keydown="(e) => emit('keydown', e)"
      @focus="(e) => emit('focus', e)"
      @blur="(e) => emit('blur', e)"
    />
    <span class="jo-inputbase__icon">
      <slot name="icon">
        <Icon
          v-if="dependencies?.icon || slots?.icon"
          :icon="dependencies.icon"
          :class="{
            'jo-inputbase__icon_hided': dependencies.iconHided,
            'jo-inputbase__icon_clickable': dependencies.iconClickable,
            'jo-inputbase__icon_active': dependencies.iconActive,
            'jo-inputbase__icon_disabled': dependencies.disabled,
          }"
          @click="() => emit('icon')"
        />
      </slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, inject, useSlots, computed } from "vue";

// Components
import { Icon } from "@iconify/vue";

// Types
import { Slots, ComputedRef } from "vue";

// Interfaces
import { IProps } from "./index.vue";

interface IEvents {
  (event: "change", value: string): void;
  (event: "update:modelValue", value: string): void;
  (event: "icon"): void;
  (event: "keydown", value: KeyboardEvent): void;
  (event: "focus", value: FocusEvent): void;
  (event: "blur", value: FocusEvent): void;
}

defineComponent({
  name: "jo-input-base",
});

const emit = defineEmits<IEvents>();

const slots: Slots = useSlots();

const dependencies: IProps = inject("dependencies", {} as IProps);
const currentValue: ComputedRef<string> = inject(
  "currentValue",
  {} as ComputedRef
);

const props = withDefaults(defineProps<{ type?: string }>(), { type: "text" });

const currentTheme = computed<string>(() => dependencies?.theme || "primary");
const currentType = computed<string>(
  () => props.type || dependencies?.type || "text"
);

function onValueChange(event: Event): void {
  const target = event.target as HTMLInputElement;

  emit("update:modelValue", target.value);
  emit("change", target.value);
}
</script>

<style>
.jo-inputbase {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  color: var(--theme-text);
}

.jo-inputbase > * {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.jo-input {
  appearance: none;
  outline: none;
  font-size: 1.15em;
  padding: 0.5em 1em;
  border: 1px solid var(--theme-text);
  color: var(--theme-text);
  background-color: transparent;
  transition: 0.2s ease-in-out;
}

.jo-input:focus {
  border-color: var(--theme);
}

.jo-input:disabled {
  opacity: 0.3;
}

.jo-input.jo-input_icon {
  padding-right: 2.5em;
}

.jo-inputbase__icon {
  height: 100%;
  display: flex;
  align-items: center;
  align-self: center;
  justify-self: end;
  font-size: 1.35em;
  margin-right: 0.65em;
}

.jo-inputbase__icon,
.jo-inputbase__icon > svg {
  transition: 0.2s ease-in-out;
}

.jo-inputbase__icon_active {
  color: var(--theme);
}

.jo-inputbase__icon_disabled {
  opacity: 0.6;
  cursor: default;
}

.jo-inputbase__icon_clickable:not(.jo-inputbase__icon_disabled) {
  cursor: pointer;
  opacity: 0.8;
}

.jo-inputbase__icon_clickable:not(.jo-inputbase__icon_disabled):hover {
  opacity: 1;
}

.jo-inputbase__icon_hided {
  display: none;
}
</style>
