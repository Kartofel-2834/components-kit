<template>
  <div
    class="jo-radio"
    :class="{ [theme]: true, 'jo-radio_point': type === 'point' }"
  >
    <div
      v-for="item in items"
      :key="getItemProperty(item, 'keymap')"
      :class="{
        'jo-radio__item_active': checkIsActiveItem(item),
        'jo-radio__item_disabled': checkIsItemDisabled(item),
      }"
      class="jo-radio__item"
      @click="() => onItemClick(item)"
    >
      {{ getItemProperty(item, "label") }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

// Types
import { Item, ElementKey } from "@/types";

// Interfaces
import { IComponent } from "@/interfaces";

type PropertyPicker = (item: Item) => ElementKey;

interface IEvents {
  (event: "change", value: Item): void;
  (event: "update:modelValue", value: Item): void;
}

interface IProps extends IComponent {
  value?: Item;
  modelValue?: Item;
  type?: "point" | "button";
  items: Array<Item>;
  label?: string | PropertyPicker;
  keymap?: string | PropertyPicker;
}

const emit = defineEmits<IEvents>();

const props = withDefaults(defineProps<IProps>(), {
  theme: "primary",
  type: "point",
  items: () => [] as Array<Item>,
});

const currentValue = computed<Item>(
  () => props.value || props.modelValue || null
);

function onItemClick(item: Item): void {
  if (checkIsItemDisabled(item)) return;

  emit("change", item);
  emit("update:modelValue", item);
}

function getItemProperty(item: Item, property: "keymap" | "label"): ElementKey {
  const key = props[property];

  if (typeof key === "function") {
    return key(item);
  }

  if (
    !item ||
    typeof item !== "object" ||
    typeof key !== "string" ||
    !(key in item)
  ) {
    return item as ElementKey;
  }

  return item[key] as ElementKey;
}

function checkIsItemDisabled(item: Item): boolean {
  return !!(
    item &&
    typeof item === "object" &&
    "disabled" in item &&
    item.disabled
  );
}

function checkIsActiveItem(item: Item): boolean {
  return (
    getItemProperty(item, "keymap") ===
    getItemProperty(currentValue.value, "keymap")
  );
}
</script>

<style>
.jo-radio {
  display: flex;
  width: fit-content;
}

.jo-radio__item {
  font-weight: 600;
  color: var(--theme-text);
  padding: 1em 2em;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.jo-radio__item {
  border: 1px solid grey;
}

.jo-radio__item:not(:first-child) {
  border-left: 0px;
}

.jo-radio__item:hover:not(.jo-radio__item_active, .jo-radio__item_disabled) {
  color: var(--theme);
}

.jo-radio__item_active:not(.jo-radio__item_disabled) {
  background-color: var(--theme);
  border-color: var(--theme);
  color: var(--theme-text);
}

.jo-radio__item_disabled {
  opacity: 0.7;
}

.jo-radio.jo-radio_point {
  flex-direction: column;
  gap: 1em;
}

.jo-radio.jo-radio_point .jo-radio__item {
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0;
  border: none;
}

.jo-radio.jo-radio_point .jo-radio__item::before {
  content: "";
  display: flex;
  min-width: 0.85em;
  min-height: 0.85em;
  max-width: 0.85em;
  max-height: 0.85em;
  border-radius: 100%;
  border: 2px solid grey;
  transition: 0.15s linear;
}

.jo-radio.jo-radio_point .jo-radio__item:hover:not(.jo-radio__item_active) {
  color: var(--theme-text);
  opacity: 0.8;
}

.jo-radio.jo-radio_point .jo-radio__item.jo-radio__item_active {
  background-color: transparent;
}

.jo-radio.jo-radio_point .jo-radio__item.jo-radio__item_active::before {
  border-color: var(--theme-text);
  background-color: var(--theme);
}
</style>
