<template>
  <div
    class="select"
    :class="{
      [theme]: true,
      select_opened: opened && !disabled,
      select_disabled: disabled,
    }"
    @click.stop
  >
    <div class="select__field" @click="toggleOptions">
      <div v-if="multiple" class="select__field__content">
        <span
          v-for="(option, index) of value"
          :key="option[field] || option || index"
          class="select__field__content__tag"
          @click.stop="() => onTagClick(index)"
        >
          {{ option[label] || option }}
        </span>

        <input
          v-if="filterable"
          v-model="filter"
          :placeholder="placeholder"
          :disabled="!filterable"
          class="select__field__content__filter"
          @click.stop="openOptions"
        />
      </div>

      <Input
        v-else
        :value="opened && filterable ? filter : currentLabel"
        :placeholder="opened && filterable ? currentLabel : placeholder"
        :disabled="!filterable"
        @change="(v) => (filter = v)"
      />

      <Icon icon="ep:arrow-up-bold" class="select__opener" />
    </div>

    <div class="select__dropdown">
      <slot
        v-for="(option, index) in filteredOptions"
        :key="option[field] || option || index"
        :index="index"
        :option="option"
        :selected="checkIsSelected(option)"
        :select="() => onSelect(option)"
        name="option"
      >
        <Option
          :key="option[field] || option || index"
          :selected="checkIsSelected(option)"
          @click="() => onSelect(option)"
        >
          {{ option }}
        </Option>
      </slot>

      <Option
        v-if="!filteredOptions?.length"
        disabled
        class="select__dropdown__nodata"
      >
        No options
      </Option>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, onMounted } from "vue";

// Components
import { Icon } from "@iconify/vue";
import Input from "../Input";
import Option from "./option.vue";

const emit = defineEmits(["change"]);

const props = defineProps({
  value: { required: true },
  disabled: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
  filterable: { type: Boolean, default: false },
  placeholder: { type: String, default: "Select" },
  field: { type: String, default: "value" },
  label: { type: String, default: "label" },
  theme: { type: String, default: "primary" },
  options: { type: Array, default: () => [] },
});

const opened = ref(false);
const filter = ref("");

const currentLabel = computed(() => {
  if (!props.value || props.multiple) return "";

  return props.value[props.label] || props.value;
});

const filteredOptions = computed(() => {
  if (!props.filterable || !filter.value.length) return props.options;

  if (!Array.isArray(props.options)) return [];

  const tester = new RegExp(`${filter.value}`, "gm");

  return props.options.filter((option) => {
    const v = option[props.field] || option;

    return tester.test(`${v}`);
  });
});

function onTagClick(tagIndex) {
  const update = Array.from(props.value);
  update.splice(tagIndex, 1);
  emit("change", update);
}

function onSelect(option) {
  if (props.multiple) {
    multipleSelect(option);
  } else {
    singleSelect(option);
  }
}

function openOptions() {
  if (props.disabled) return;

  opened.value = true;
}

function toggleOptions() {
  if (props.disabled) return;

  opened.value = !opened.value;
}

function singleSelect(option) {
  if (checkIsEqualOptions(props.value, option)) {
    emit("change", null);
  } else {
    emit("change", option);
  }

  opened.value = false;
}

function multipleSelect(option) {
  if (!Array.isArray(props.value)) return emit("change", [option]);

  const update = Array.from(props.value);
  const selectedIndex = checkIsMultipleSelected(option);

  if (selectedIndex === null) {
    update.push(option);
  } else {
    update.splice(selectedIndex, 1);
  }

  emit("change", update);
}

function checkIsSelected(option) {
  if (!props.multiple) return checkIsEqualOptions(props.value, option);

  return checkIsMultipleSelected(option) !== null;
}

function checkIsMultipleSelected(option) {
  if (!Array.isArray(props.value)) return null;

  for (let index = 0; index < props.value.length; index++) {
    if (checkIsEqualOptions(props.value[index], option)) return index;
  }

  return null;
}

function checkIsEqualOptions(a, b) {
  if (!a) return false;

  if (a[props.field]) {
    return a[props.field] === b[props.field];
  }

  return a === b;
}

onMounted(() => {
  window.addEventListener("click", (event) => {
    opened.value = false;
  });
});
</script>

<style src="@/assets/css/components/select.css" />
