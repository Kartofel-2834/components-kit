<template>
  <div class="select__field_multiple">
    <span
      v-if="!filterable && placeholder?.length"
      v-show="!value?.length"
      class="select__field__placeholder"
    >
      {{ placeholder }}
    </span>

    <div class="select__field__content">
      <span
        v-for="(option, index) of value"
        :key="keymap(option)"
        class="select__field__content__tag"
        @click.stop="() => onTagClick(index, option)"
      >
        {{ label(option) }}
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

<script setup>
import { defineProps, defineEmits, computed, inject } from "vue";

// Components
import { Icon } from "@iconify/vue";

const emit = defineEmits(["update:filter", "filter", "tag"]);

const props = defineProps({
  filterable: { type: Boolean, default: false },
  filter: { type: String, default: "" },
  placeholder: { type: String, default: "Select" },
  keymap: { type: Function, required: true },
  label: { type: Function, required: true },
});

const value = inject("value");
const open = inject("open");

function onFilterChange(event) {
  const { value: newFilterValue } = event.target;

  emit("filter", newFilterValue);
  emit("update:filter", newFilterValue);
}

function onTagClick(tagIndex, option) {
  emit("tag", tagIndex, option);
}
</script>
