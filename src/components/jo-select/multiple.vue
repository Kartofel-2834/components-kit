<template>
  <div class="select__field_multiple">
    <span
      v-if="!filterable && placeholder?.length"
      v-show="!currentValue?.length"
      class="select__field__placeholder"
    >
      {{ placeholder }}
    </span>

    <div class="select__field__content">
      <span
        v-for="(option, index) of currentValue"
        :key="getKey(option)"
        class="select__field__content__tag"
        @click.stop="() => onTagClick(index, option)"
      >
        {{ getLabel(option) }}
      </span>

      <input
        v-if="filterable"
        :value="filter"
        :placeholder="placeholder"
        class="select__field__content__filter"
        @input="onFilterChange"
        @click.stop="open"
      />
    </div>

    <Icon icon="ep:arrow-up-bold" class="select__field__opener" />
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
