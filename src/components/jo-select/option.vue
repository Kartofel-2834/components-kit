<template>
  <div
    class="select__options__option"
    :class="{ select__options__option_selected: selected }"
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
