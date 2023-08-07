<template>
  <div
    class="range"
    ref="rangeElement"
    :class="{ [theme]: true, range_dragging: isDragging }"
    @mousedown="onDragStart"
  >
    <div v-if="marks" class="range__marks">
      <div v-for="mark in marksList" :key="mark" class="range__marks__mark" />
    </div>

    <div class="range__bar" :style="{ width: `${progress}%` }">
      <div class="range__bar__button" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["change", "update:modelValue"]);

const props = defineProps({
  value: { type: Number, required: false },
  modelValue: { type: Number, required: false },
  theme: { type: String, default: "primary" },

  marks: { type: Boolean, default: false },
  step: { type: Number, default: 5 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
});

const rangeElement = ref(null);

const start = ref(0);
const end = ref(0);
const isDragging = ref(false);

const currentValue = computed(() => {
  if (!isNaN(props.modelValue)) return props.modelValue;
  if (!isNaN(props.value)) return props.value;

  return props.min;
});

const percent = computed(() => (props.max - props.min) / 100);
const percentPx = computed(() => (end.value - start.value) / 100);
const progress = computed(() => {
  return (currentValue.value - props.min) / percent.value;
});

const marksList = computed(() => {
  const result = [];

  if (!props.marks) return result;

  for (let mark = props.min; mark <= props.max; mark += props.step) {
    result.push(mark);
  }

  return result;
});

function updateSizes() {
  if (!rangeElement.value) return;

  const bounding = rangeElement.value.getBoundingClientRect();

  start.value = bounding?.left || 0;
  end.value = bounding?.right || 0;
}

function updateValue(currentPointX) {
  let update = (currentPointX - start.value) / percentPx.value;

  update = props.min + roundToStep(update * percent.value);

  if (update > props.max) {
    update = props.max;
  } else if (update < props.min) {
    update = props.min;
  }

  emit("change", update);
  emit("update:modelValue", update);
}

function onDragStart(event) {
  updateSizes();
  isDragging.value = true;
  updateValue(event.x);
}

function onDragEnd(event) {
  if (!isDragging.value) return;

  isDragging.value = false;
  updateValue(event.x);
}

function onDrag(event) {
  if (isDragging.value) updateValue(event.x);
}

function roundToStep(someNumber) {
  const excessPart = someNumber % props.step;

  if (!excessPart) return someNumber;

  const a = someNumber - excessPart;
  const b = a + props.step;

  return someNumber - a > b - someNumber ? b : a;
}

onMounted(() => {
  updateSizes();

  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", onDragEnd);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mousemove", onDragEnd);
});
</script>

<style src="@/assets/css/components/range.css" />
