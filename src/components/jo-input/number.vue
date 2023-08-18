<template>
  <jo-base-input type="text" @change="onChange" @keydown="onKeydown">
    <template v-if="dependencies.controls" #icon>
      <div class="jo-input_number__controls">
        <jo-button
          :theme="dependencies.theme"
          :disabled="dependencies.disabled"
          icon="ri:arrow-up-s-line"
          @click="up"
        />
        <jo-button
          :theme="dependencies.theme"
          :disabled="dependencies.disabled"
          icon="ri:arrow-up-s-line"
          @click="down"
        />
      </div>
    </template>
  </jo-base-input>
</template>

<script lang="ts" setup>
import { defineComponent, inject } from "vue";

// Components
import JoButton from "../jo-button.vue";
import JoBaseInput from "./base.vue";

// Types
import { ComputedRef } from "vue";

// Interfaces
import { IProps } from "./index.vue";

interface IEvents {
  (event: "change", value: string): void;
  (event: "update:modelValue", value: string): void;
}

interface ISpecialKeys {
  [key: string]: (event: KeyboardEvent) => void;
}

defineComponent({
  name: "jo-input-number",
});

const { round, pow } = Math;

const emit = defineEmits<IEvents>();
const dependencies: IProps = inject("dependencies", {} as IProps);
const currentValue: ComputedRef<string> = inject(
  "currentValue",
  {} as ComputedRef
);

const allowedKeys = new Set<string>(["Backspace", "ArrowLeft", "ArrowRight"]);
const specialKeys: ISpecialKeys = {
  ArrowUp: up,
  ArrowDown: down,
};

function onChange(newValue: string): void {
  const isNegative: boolean = newValue.match(/-/g)?.length === 1;

  let update: number = roundTo(
    Number(
      newValue
        .split(".")
        .map((s) => s.replace(/[^0-9]/g, ""))
        .join(".")
    ),
    dependencies.precision
  );

  update = update * (isNegative ? -1 : 1);

  if (dependencies?.max && update > dependencies.max) {
    update = dependencies.max;
  }

  if (dependencies?.min && update < dependencies.min) {
    update = dependencies.min;
  }

  const result = `${update}`;

  emit("change", result);
  emit("update:modelValue", result);
}

function onKeydown(event: KeyboardEvent): void {
  if (event.ctrlKey) return;

  const target = event.target as HTMLInputElement;

  const { value: inputValue, selectionStart } = target;

  const { key } = event;

  const precision: string | undefined = inputValue.split(".")[1];

  if (allowedKeys.has(key)) return;

  if (specialKeys[key]) {
    specialKeys[key](event);
    event.preventDefault();
    return;
  }

  const n = Number(currentValue.value) || 0;

  if (
    /[0-9]/g.test(key) &&
    (!dependencies?.max || n < dependencies.max) &&
    (!dependencies?.min || n >= dependencies.min)
  ) {
    if (!precision || !selectionStart) return;
    if (selectionStart <= inputValue.indexOf(".")) return;

    if (!dependencies?.precision || precision.length < dependencies.precision) {
      return;
    }
  }

  switch (key) {
    case ".":
      if (!inputValue.includes(".")) return;
      break;
    case "-":
      return;
  }

  event.preventDefault();
}

function offset(offsetValue = 1): number {
  return roundTo(
    (Number(currentValue.value) || 0) + offsetValue,
    dependencies.precision
  );
}

function up(): void {
  let update: number = offset(1);

  if (dependencies?.max && update > dependencies.max) return;

  const result = `${update}`;

  emit("change", result);
  emit("update:modelValue", result);
}

function down(): void {
  let update: number = offset(-1);

  if (dependencies?.min && update < dependencies.min) return;

  const result = `${update}`;

  emit("change", result);
  emit("update:modelValue", result);
}

function roundTo(num: number, precision = 2): number {
  const step: number = pow(10, precision);

  return round(num * step) / step;
}
</script>

<style>
.jo-input_number__controls {
  display: flex;
  flex-direction: column;
  font-size: 0.4em;
  margin-right: -0.85rem;
}

.jo-input_number__controls .jo-button {
  min-width: 3rem;
  justify-content: center;
}

.jo-input_number__controls .jo-button:last-child svg {
  transform: scaleY(-1);
}
</style>
