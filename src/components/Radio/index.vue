<template>
  <div class="radio" :class="{ [theme]: true, radio_point: type === 'point' }">
    <div
      v-for="item in items"
      :key="getKey(item)"
      :class="{
        radio__item_active: checkIsActiveItem(item),
        radio__item_disabled: item?.disabled,
      }"
      class="radio__item"
      @click="() => onItemClick(item)"
    >
      {{ label ? item[label] : item }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  value: { required: true },
  type: { type: String, default: "point" },
  theme: { type: String, default: "primary" },
  items: { type: Array, default: [] },
  field: { type: String, required: false },
  label: { type: String, required: false },
  keymap: { type: Function, required: false },
});

const emit = defineEmits(["change"]);

function onItemClick(item) {
  if (item?.disabled) return;

  emit("change", item);
}

function getKey(item) {
  if (props.keymap) return props.keymap(item);

  return props.field ? item[props.field] : item;
}

function checkIsActiveItem(item) {
  try {
    if (props.field) {
      return item[props.field] === props.value[props.field];
    }

    return item === props.value;
  } catch (err) {
    return false;
  }
}
</script>

<style src="@/assets/css/components/radio.css" />
