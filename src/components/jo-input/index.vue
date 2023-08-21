<template>
  <jo-number-input
    v-if="type === 'number'"
    @change="onValueChange"
    @update:modelValue="onValueChange"
  />

  <jo-password-input
    v-else-if="type === 'password'"
    @change="onValueChange"
    @update:modelValue="onValueChange"
  />

  <jo-phone-input
    v-else-if="type === 'phone'"
    @change="onValueChange"
    @update:modelValue="onValueChange"
  />

  <jo-base-input
    v-else
    @change="onValueChange"
    @update:modelValue="onValueChange"
  >
    <template v-if="slots?.icon" #icon>
      <slot name="icon" />
    </template>
  </jo-base-input>
</template>

<script lang="ts" setup>
import { defineComponent, provide, useSlots, computed, ComputedRef } from "vue";

// Components
import JoBaseInput from "./base.vue";
import JoNumberInput from "./number.vue";
import JoPasswordInput from "./password.vue";
import JoPhoneInput from "./phone.vue";

// Types
import { Slots } from "vue";
import { Equivalents } from "../../utils/formatPhone";

// Interfaces
interface IEvents {
  (event: "change", value: string): void;
  (event: "update:modelValue", value: string): void;
}

export interface IProps {
  // Base
  theme?: string;
  modelValue?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  icon?: string;
  iconClickable?: boolean;
  iconHided?: boolean;
  iconActive?: boolean;
  disabled?: boolean;

  // Number
  min?: number;
  max?: number;
  controls?: boolean;
  precision?: number;
  step?: number;

  // Phone
  start?: string;
  replacements?: Equivalents;
}

defineComponent({
  name: "jo-input",
});

const emit = defineEmits<IEvents>();
const slots: Slots = useSlots();

const props = withDefaults(defineProps<IProps>(), {
  modelValue: "",
  value: "",
  type: "text",
  theme: "primary",
  placeholder: "",

  iconClickable: false,
  iconHided: false,
  iconActive: false,
  disabled: false,

  min: -Infinity,
  max: Infinity,
  controls: false,
  precision: 2,
  step: 1,
  start: "+7",
  replacements: () => ({ 8: "7", 9: "79" }),
});

provide<IProps>("dependencies", props);
provide<ComputedRef<string>>(
  "currentValue",
  computed<string>(() => props.value || props.modelValue)
);

function onValueChange(newValue: string): void {
  emit("change", newValue);
  emit("update:modelValue", newValue);
}
</script>
