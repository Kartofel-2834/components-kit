<template>
  <div
    class="select"
    :class="{ [theme]: true, select_opened: opened }"
    @click.stop="toggle"
  >
    <Multiple
      v-if="multiple"
      v-model:filter="filterValue"
      :filterable="filterable"
      :placeholder="placeholder"
      @tag="onTagClick"
    />

    <Single
      v-else
      v-model:filter="filterValue"
      :placeholder="placeholder"
      :filterable="filterable"
    />

    <div class="select__options" @click.stop>
      <Option
        v-for="option in filteredOptions"
        :key="getKey(option)"
        :selected="checkIsSelected(option)"
        @click="() => onSelect(option)"
      >
        {{ getLabel(option) }}
      </Option>
    </div>
  </div>
</template>

<script setup>
import {
  defineProps,
  defineEmits,
  ref,
  provide,
  computed,
  onMounted,
  onUnmounted,
} from "vue";

// Components
import Option from "./option.vue";
import Multiple from "./multiple.vue";
import Single from "./single.vue";

const emit = defineEmits(["change", "update:modelValue"]);

const props = defineProps({
  value: { required: false },
  modelValue: { required: false },

  multiple: { type: Boolean, default: false },
  filterable: { type: Boolean, default: false },
  filter: { type: Function, required: false },
  theme: { type: String, default: "primary" },
  placeholder: { type: String, default: "Select" },

  options: { type: Array, default: () => [] },
  field: { type: [String, Function], default: "value" },
  label: { type: [String, Function], default: "label" },
  keymap: { type: [String, Function], default: "id" },
});

const opened = ref(false);
const filterValue = ref("");

const currentValue = computed(() => props.value || props.modelValue);

provide("value", currentValue);

provide("getKey", getKey);
provide("getField", getField);
provide("getLabel", getLabel);

provide("opened", opened);
provide("open", open);

const filteredOptions = computed(() => {
  if (!props.filterable || !filterValue.value.length) return props.options;

  if (!Array.isArray(props.options)) return [];

  let filterFunction = props.filter;

  if (typeof filterFunction !== "function") {
    const lowerFilter = filterValue.value.toLowerCase();

    filterFunction = (option) => {
      return String(getField(option)).toLowerCase().includes(lowerFilter);
    };
  }

  return props.options.filter(filterFunction);
});

function toggle() {
  opened.value = !opened.value;
}

function close() {
  opened.value = false;
}

function open() {
  opened.value = true;
}

function getValue(option, field) {
  if (typeof props[field] === "function") {
    return props[field](option);
  }

  if (!option?.hasOwnProperty || !option.hasOwnProperty(props[field])) {
    return option;
  }

  return option[props[field]];
}

function getKey(option) {
  return getValue(option, "keymap") || getField(option);
}

function getField(option) {
  return getValue(option, "field");
}

function getLabel(option) {
  return getValue(option, "label");
}

function checkIsSelected(option) {
  const field = getField(option);

  if (!props.multiple) {
    return getField(currentValue.value) === field;
  }

  if (!Array.isArray(currentValue.value)) return false;

  return !!currentValue.value.find((v) => getField(v) === field);
}

function onSelect(option) {
  if (checkIsSelected(option)) return;

  let update = option;

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

function onTagClick(tagIndex) {
  const update = Array.from(currentValue.value);
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

<style src="@/assets/css/components/select.css" />
