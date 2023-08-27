<template>
  <jo-input
    :value="inputValue"
    :placeholder="currentPlaceholder"
    :disabled="!filterable"
    class="jo-select__field"
    @change="onFilterChange"
  >
    <template #icon>
      <Icon icon="ep:arrow-up-bold" class="jo-select__field__opener" />
    </template>
  </jo-input>
</template>

<script lang="ts" setup>
import { defineComponent, computed, inject } from "vue";

// Components
import JoInput from "../jo-input/index.vue";
import { Icon } from "@iconify/vue";

// Types
import { ComputedRef, Ref } from "vue";
import { Option, PropertyPicker } from "./index.vue";

// Interfaces
interface IEvents {
  (event: "update:filter", value: string): void;
  (event: "filter", value: string): void;
}

interface IProps {
  filterable?: boolean;
  filter?: string;
  placeholder: string;
}

defineComponent({
  name: "jo-single-select",
});

const emit = defineEmits<IEvents>();

const props = withDefaults(defineProps<IProps>(), {
  filterable: false,
  filter: "",
  placeholder: "Select",
});

const currentValue: ComputedRef<Option> = inject("value", {} as ComputedRef);
const opened: Ref<boolean> = inject("opened", {} as Ref);

const getField: PropertyPicker = inject("getField", () => undefined);
const getLabel: PropertyPicker = inject("getLabel", () => undefined);

const currentField = computed<string>(() => `${getField(currentValue.value)}`);
const currentLabel = computed<string>(() => `${getLabel(currentValue.value)}`);

const inputValue = computed<string>(() => {
  return props.filterable && opened.value ? props.filter : currentLabel.value;
});

const currentPlaceholder = computed<string>(() => {
  if (props.filterable && opened.value) {
    return currentField.value || props.placeholder;
  }

  return props.placeholder;
});

function onFilterChange(newFilterValue: string): void {
  emit("filter", newFilterValue);
  emit("update:filter", newFilterValue);
}
</script>
