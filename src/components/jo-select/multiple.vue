<template>
  <div class="jo-select__field_multiple">
    <span
      v-if="!filterable && placeholder?.length"
      v-show="!currentValue?.length"
      class="jo-select__field__placeholder"
    >
      {{ placeholder }}
    </span>

    <div class="jo-select__field__content">
      <span
        v-for="(option, index) of currentValue"
        :key="getKey(option)"
        class="jo-select__field__content__tag"
        @click.stop="() => onTagClick(index, option)"
      >
        {{ getLabel(option) }}
      </span>

      <input
        v-if="filterable"
        :value="filter"
        :placeholder="placeholder"
        class="jo-select__field__content__filter"
        @input="onFilterChange"
        @click.stop="open"
      />
    </div>

    <Icon icon="ep:arrow-up-bold" class="jo-select__field__opener" />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, inject } from "vue";

// Components
import { Icon } from "@iconify/vue";

// Types
import { ComputedRef } from "vue";
import { Option, PropertyPicker } from "./index.vue";

// Interfaces
interface IEvents {
  (event: "update:filter", value: string): void;
  (event: "filter", value: string): void;
  (event: "tag", tagIndex: number, option: Option): void;
}

interface IProps {
  filterable?: boolean;
  filter?: string;
  placeholder: string;
}

defineComponent({
  name: "jo-select-multiple",
});

const emit = defineEmits<IEvents>();

withDefaults(defineProps<IProps>(), {
  filterable: false,
  filter: "",
  placeholder: "Select",
});

const open = inject<() => void>("open", () => undefined);
const currentValue: ComputedRef<Array<Option>> = inject(
  "value",
  {} as ComputedRef<Array<Option>>
);

const getKey: PropertyPicker = inject("getKey", () => undefined);
const getLabel: PropertyPicker = inject("getLabel", () => undefined);

function onFilterChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  const newFilterValue: string = target.value;

  emit("filter", newFilterValue);
  emit("update:filter", newFilterValue);
}

function onTagClick(tagIndex: number, option: Option): void {
  emit("tag", tagIndex, option);
}
</script>

<style>
.jo-select__field_multiple {
  display: grid;
  grid-template-columns: auto min-content;
  grid-template-rows: 1fr;
  align-items: center;
  gap: 0.5em;

  font-size: 1.15em;
  min-height: 1.6em;
  padding: 0.5em;
  border: 1px solid var(--theme-text);
  color: var(--theme-text);
  background-color: transparent;
  transition: 0.2s ease-in-out;
}

.jo-select__field__content,
.jo-select__field__placeholder {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.jo-select__field__content {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  gap: 0.5em;
}

.jo-select__field__placeholder {
  opacity: 0.6;
  margin: auto 0;
  margin-left: 0.5em;
}

.jo-select__field__content__tag {
  max-width: 20%;
  max-height: 1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  user-select: none;
  padding: 0.45em 0.75em;
  background-color: var(--selected);
  font-size: 0.85em;
  border-radius: 4px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.jo-select__field__content__tag:hover {
  opacity: 0.8;
}

.jo-select__field__content__filter {
  outline: none;
  font-size: inherit;
  background-color: transparent;
  padding-left: 0.5em;
  max-width: 8em;
  border: none;
  color: var(--theme-text);
}

.jo-select__field_multiple .jo-select__field__opener {
  margin-right: 0.5em;
}
</style>
