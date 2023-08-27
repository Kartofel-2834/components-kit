<template>
  <div
    class="jo-select"
    :class="{ [theme]: true, 'jo-select_opened': opened }"
    @click.stop="toggle"
  >
    <jo-multiple-select
      v-if="multiple"
      v-model:filter="filterValue"
      :filterable="filterable"
      :placeholder="placeholder"
      @tag="onTagClick"
    />

    <jo-single-select
      v-else
      v-model:filter="filterValue"
      :placeholder="placeholder"
      :filterable="filterable"
    />

    <div class="jo-select__options" @click.stop>
      <jo-select-option
        v-for="option in filteredOptions"
        :key="getKey(option)"
        :selected="checkIsSelected(option)"
        @click="() => onSelect(option)"
      >
        {{ getLabel(option) }}
      </jo-select-option>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  defineComponent,
  ref,
  provide,
  computed,
  onMounted,
  onUnmounted,
} from "vue";

// Components
import JoSelectOption from "./option.vue";
import JoMultipleSelect from "./multiple.vue";
import JoSingleSelect from "./single.vue";

// Types
import { Ref, ComputedRef } from "vue";
import { ElementKey } from "../../types/index";

export type Option = string | null | { [key: string]: any };
export type PropertyPicker = (option: Option) => ElementKey;

// Interfaces
interface IEvents {
  (event: "change", value: Option): void;
  (event: "update:modelValue", value: Option): void;
}

interface IProps {
  value?: Option;
  modelValue?: Option;

  theme?: string;
  placeholder?: string;

  multiple?: boolean;
  filterable?: boolean;
  filter?: (value: string, option: Option) => boolean;

  options?: Array<Option>;
  field?: string | PropertyPicker;
  label?: string | PropertyPicker;
  keymap?: string | PropertyPicker;
}

defineComponent({
  name: "jo-select",
});

const emit = defineEmits<IEvents>();

const props = withDefaults(defineProps<IProps>(), {
  value: null,
  modelValue: null,
  theme: "primary",
  placeholder: "Select",
  field: "value",
  label: "label",
  keymap: "id",
  multiple: false,
  filterable: false,
  options: () => [] as Array<Option>,
});

const opened: Ref<boolean> = ref(false);
const filterValue: Ref<string> = ref("");

const currentValue = computed<Option>(() => props.value || props.modelValue);

provide<ComputedRef<Option>>("value", currentValue);

provide<PropertyPicker>("getKey", getKey);
provide<PropertyPicker>("getField", getField);
provide<PropertyPicker>("getLabel", getLabel);

provide<Ref<boolean>>("opened", opened);
provide<() => void>("open", open);

const filteredOptions = computed<Array<Option>>(() => {
  if (!props.filterable || !filterValue.value.length) return props.options;

  if (!Array.isArray(props.options)) return [];

  const lowerFilter: string = filterValue.value.toLowerCase();
  const currentFilter = props.filter || defaultFilter;

  return props.options.filter((option) => currentFilter(lowerFilter, option));
});

function toggle(): void {
  console.log("toggle");
  opened.value = !opened.value;
}

function close(): void {
  opened.value = false;
}

function open(): void {
  opened.value = true;
}

function getValue(
  option: Option,
  field: "keymap" | "field" | "label"
): ElementKey {
  if (typeof option === "string") return option;

  if (field in props && props[field] instanceof Function) {
    const mapper = props[field] as PropertyPicker;

    return mapper(option);
  }

  const key = props[field] as string;

  return option && key in option ? option[key] : null;
}

function getKey(option: Option): ElementKey {
  return getValue(option, "keymap") || getField(option);
}

function getField(option: Option): ElementKey {
  return getValue(option, "field");
}

function getLabel(option: Option): ElementKey {
  return getValue(option, "label");
}

function defaultFilter(value: string, option: Option): boolean {
  return String(getField(option)).toLowerCase().includes(value);
}

function checkIsSelected(option: Option): boolean {
  const field: ElementKey = getField(option);

  if (!props.multiple) {
    return getField(currentValue.value) === field;
  }

  if (!Array.isArray(currentValue.value)) return false;

  return !!currentValue.value.find((v) => getField(v) === field);
}

function onSelect(option: Option): void {
  if (checkIsSelected(option)) return;

  let update: Option | Array<Option> = option;

  if (props.multiple) {
    update = Array.isArray(currentValue.value)
      ? [...currentValue.value, update]
      : [update];
  } else {
    close();
  }

  emit("change", update);
  emit("update:modelValue", update);
}

function onTagClick(tagIndex: number): void {
  const update: Array<Option> = Array.from(currentValue.value as Array<Option>);
  update.splice(tagIndex, 1);

  emit("change", update);
  emit("update:modelValue", update);
}

onMounted(() => {
  window.addEventListener("click", close);
});

onUnmounted(() => {
  window.removeEventListener("click", close);
});
</script>

<style>
.jo-select {
  position: relative;
  --selected: rgba(255, 255, 255, 20%);
}

.jo-select__field .jo-input:disabled {
  pointer-events: none;
  cursor: pointer;
  opacity: 1;
}

.jo-select__field__opener {
  cursor: pointer;
  width: 0.8em;
  height: 0.8em;
  transition: 0.2s ease-in-out;
}

.jo-select__options {
  position: absolute;
  max-height: 15em;
  overflow-y: auto;
  width: calc(100% - 2px);
  background-color: var(--theme-filled);
  color: var(--theme-text);
  border: 1px solid grey;
  border-top: 0;
  transform: scaleY(0%);
  transform-origin: top;
  transition: 0.2s ease-in-out;
}

/* Opened */

.jo-select_opened .jo-select__field .input,
.jo-select_opened .jo-select__field_multiple {
  border-color: var(--theme);
}

.jo-select_opened .jo-select__field__opener {
  transform: rotate(180deg);
}

.jo-select_opened .jo-select__options {
  transform: scaleY(100%);
}
</style>
