<template>
  <div
    class="jo-select__options__option"
    :class="{ 'jo-select__options__option_selected': selected }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

// Interfaces
interface IProps {
  selected?: boolean;
}

defineComponent({
  name: "jo-select-option",
});

withDefaults(defineProps<IProps>(), { selected: false });
</script>

<style>
.jo-select__options__option {
  overflow: hidden;
  max-width: 100%;
  cursor: pointer;
  font-weight: 600;
  padding: 0.75em 1em;
  border-bottom: 1px solid grey;
  transition: 0.2s ease-in-out;
}

.jo-select__options__option_selected,
.jo-select__options__option:hover {
  background-color: var(--selected);
}

.jo-select__options__option_selected {
  cursor: default;
  border-color: var(--selected);
}
</style>
