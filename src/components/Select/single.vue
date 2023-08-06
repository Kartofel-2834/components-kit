<template>
  <Input
    :value="inputValue"
    :placeholder="currentPlaceholder"
    :disabled="!filterable"
    class="select__field"
    @change="onFilterChange"
  >
    <template #icon>
      <Icon icon="ep:arrow-up-bold" class="select__field__opener" />
    </template>
  </Input>
</template>

<script setup>
import { defineProps, defineEmits, computed, inject } from "vue";

// Components
import Input from "@/components/Input";
import { Icon } from "@iconify/vue";

const emit = defineEmits(["update:filter", "filter"]);

const props = defineProps({
  filterable: { type: Boolean, default: false },
  filter: { type: String, default: "" },
  placeholder: { type: String, default: "Select" },
});

const field = inject("field");
const opened = inject("opened");

const inputValue = computed(() => {
  return props.filterable && opened.value ? props.filter : field.value;
});

const currentPlaceholder = computed(() => {
  if (props.filterable && opened.value) {
    return field.value || props.placeholder;
  }

  return props.placeholder;
});

function onFilterChange(newFilterValue) {
  emit("filter", newFilterValue);
  emit("update:filter", newFilterValue);
}
</script>
