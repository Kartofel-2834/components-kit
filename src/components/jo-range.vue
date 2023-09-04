<template>
  <label class="jo-range" :class="{ [theme]: true }">
    <div class="jo-range__content">
      <div
        class="jo-range__content__progress"
        :style="{ transform: `scaleX(${progress}%)` }"
      >
        <span
          class="jo-range__content__progress__ball"
          :style="{ transform: `scaleX(${100 * (100 / progress)}%)` }"
        />
      </div>
    </div>

    <input
      :value="currentValue"
      class="jo-range__input"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      @input="onChange"
    />
  </label>
</template>

<script lang="ts" setup>
import { computed } from "vue";

// Interfaces
interface IProps {
  theme?: string;
  value?: number;
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

interface IEvents {
  (event: "change", value: number): void;
  (event: "update:modelValue", value: number): void;
}

const { floor } = Math;

const emit = defineEmits<IEvents>();

const props = withDefaults(defineProps<IProps>(), {
  theme: "primary",
  value: 0,
  modelValue: 0,
  min: 0,
  max: 100,
});

const currentValue = computed<number>(() => props.value || props.modelValue);
const percent = computed<number>(() => (props.max - props.min) / 100);
const progress = computed<number>(() => {
  return floor((currentValue.value - props.min) / percent.value) || 0.25;
});

function onChange(event: Event): void {
  const target = event.target as HTMLInputElement;

  const update = Number(target.value);

  emit("change", update);
  emit("update:modelValue", update);
}
</script>

<style>
.jo-range {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.jo-range > * {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.jo-range__input {
  z-index: 10;
  opacity: 0;
  margin-top: -0.25em;
  cursor: grab;
}

.jo-range__content {
  border-radius: 8px;
  display: flex;
  width: 100%;
  height: 8px;
  background-color: grey;
  font-size: 2em;
  color: white;
  border-radius: 8px;
  transition: 0.2s ease-in-out;
}

.jo-range__content__progress {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 8px;
  width: 100%;
  background-color: var(--theme);
  transform-origin: left;
}

.jo-range__content__progress__ball {
  cursor: grab;
  content: "";
  display: flex;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-color: var(--theme-text);
}

/* Hover */
.jo-range:hover .jo-range__content {
  opacity: 0.7;
}

/* Focus */
.jo-range:active .jo-range__content {
  opacity: 1;
}

.jo-range:active .jo-range__input,
.jo-range:active .jo-range__content__progress__ball {
  cursor: grabbing;
}
</style>
