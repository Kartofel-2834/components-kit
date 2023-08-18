<template>
  <div
    class="jo-range"
    ref="rangeElement"
    :class="{ [theme]: true, 'jo-range_dragging': isDragging }"
    @mousedown="onDragStart"
  >
    <div v-if="marks" class="jo-range__marks">
      <div
        v-for="mark in marksList"
        :key="mark"
        class="jo-range__marks__mark"
      />
    </div>

    <div class="jo-range__bar" :style="{ width: `${progress}%` }">
      <div class="jo-range__bar__button" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IComponent } from "@/interfaces";
import { computed, ref, onMounted, onUnmounted } from "vue";

// Types
import { Ref } from "vue";

// Interfaces
interface IProps extends IComponent {
  value?: number;
  modelValue?: number;
  marks?: boolean;
  step?: number;
  min?: number;
  max?: number;
}

interface IEvents {
  (event: "change", value: number): void;
  (event: "update:modelValue", value: number): void;
}

const emit = defineEmits<IEvents>();

const props = withDefaults(defineProps<IProps>(), {
  theme: "primary",
  marks: false,
  step: 5,
  min: 0,
  max: 100,
});

const rangeElement: Ref<HTMLDivElement | null> = ref(null);

const start: Ref<number> = ref(0);
const end: Ref<number> = ref(0);
const isDragging: Ref<boolean> = ref(false);

const currentValue = computed<number>(() => {
  const modelValue = Number(props.modelValue);
  const value = Number(props.value);
  const min = Number(props.min);

  if (!isNaN(modelValue)) return modelValue;
  if (!isNaN(value)) return value;

  return min;
});

const percent = computed<number>(() => (props.max - props.min) / 100);
const percentPx = computed<number>(() => (end.value - start.value) / 100);
const progress = computed<number>(() => {
  return (currentValue.value - props.min) / percent.value;
});

const marksList = computed<Array<number>>(() => {
  const result: Array<number> = [];

  if (!props.marks) return result;

  let mark: number;

  for (mark = props.min; mark <= props.max; mark += props.step) {
    result.push(mark);
  }

  return result;
});

function updateSizes(): void {
  if (!rangeElement.value) return;

  const bounding: DOMRect = rangeElement.value.getBoundingClientRect();

  start.value = bounding?.left || 0;
  end.value = bounding?.right || 0;
}

function updateValue(currentPointX: number): void {
  let update: number = (currentPointX - start.value) / percentPx.value;

  update = props.min + roundToStep(update * percent.value);

  if (update > props.max) {
    update = props.max;
  } else if (update < props.min) {
    update = props.min;
  }

  emit("change", update);
  emit("update:modelValue", update);
}

function onDragStart(event: MouseEvent): void {
  updateSizes();
  isDragging.value = true;
  updateValue(event.x);
}

function onDragEnd(event: MouseEvent): void {
  if (!isDragging.value) return;

  isDragging.value = false;
  updateValue(event.x);
}

function onDrag(event: MouseEvent): void {
  if (isDragging.value) updateValue(event.x);
}

function roundToStep(someNumber: number): number {
  const excessPart: number = someNumber % props.step;

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

<style>
.jo-range {
  user-select: none;
  display: grid;
  height: 5px;
  background-color: grey;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  border-radius: 8px;
}

.jo-range > * {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

.jo-range__bar {
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 0%;
  background-color: var(--theme);
  border-radius: 8px;
  transform-origin: left;
}

.jo-range__bar__button {
  display: flex;
  position: absolute;
  width: 1em;
  height: 1em;
  background: white;
  border-radius: 100%;
  transform: translateX(0.5em);
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.jo-range__marks {
  z-index: 0;
  width: 100%;
  display: flex;
  align-items: center;
  margin: auto 0;
  justify-content: space-between;
}

.jo-range__marks__mark {
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: white;
}

.jo-range__marks__mark:last-child {
  opacity: 0;
}

/* Dragging */

.jo-range_dragging .jo-range__bar__button {
  transform: translateX(0.5em) scale(1.15);
}
</style>
