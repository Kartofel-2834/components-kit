<template>
  <BaseInput type="text" @change="onChange" @keydown="onKeydown">
    <template v-if="dependencies.controls" #icon>
      <div class="input_number__controls">
        <Button
          :theme="dependencies.theme"
          :disabled="dependencies.disabled"
          icon="ri:arrow-up-s-line"
          @click="up"
        />
        <Button
          :theme="dependencies.theme"
          :disabled="dependencies.disabled"
          icon="ri:arrow-up-s-line"
          @click="down"
        />
      </div>
    </template>
  </BaseInput>
</template>

<script setup>
import { defineEmits, inject, computed } from "vue";

// Components
import Button from "../Button";
import BaseInput from "./base.vue";

const { round, pow } = Math;

const emit = defineEmits(["change", "update:model"]);
const dependencies = inject("dependencies");
const currentValue = inject("currentValue");

const allowedKeys = new Set(["Backspace", "ArrowLeft", "ArrowRight"]);
const specialKeys = {
  ArrowUp: up,
  ArrowDown: down,
};

function onChange(newValue) {
  const isNegative = newValue.match(/-/g)?.length === 1;
  let update = roundTo(
    Number(
      newValue
        .split(".")
        .map((s) => s.replaceAll(/[^0-9]/g, ""))
        .join(".")
    ),
    dependencies.precision
  );

  update = update * (isNegative ? -1 : 1);
  update = update > dependencies.max ? dependencies.max : update;
  update = update < dependencies.min ? dependencies.min : update;
  update = `${update}`;

  emit("change", update);
  emit("update:model", update);
}

function onKeydown(event) {
  if (event.ctrlKey) return;

  const { value: inputValue, selectionStart } = event.target;
  const { key } = event;

  let precision = inputValue.split(".");
  precision = precision?.length > 1 ? precision.pop() : null;

  if (allowedKeys.has(key)) return;

  if (specialKeys[key]) {
    specialKeys[key](event);
    return event.preventDefault();
  }

  const n = Number(currentValue.value) || 0;

  if (/[0-9]/g.test(key) && n < dependencies.max && n >= dependencies.min) {
    if (!precision || selectionStart <= inputValue.indexOf(".")) return;
    if (precision?.length < dependencies.precision) return;
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

function offset(offsetValue = 1) {
  return roundTo(
    (Number(currentValue.value) || 0) + offsetValue,
    dependencies.precision
  );
}

function up() {
  let update = offset(1);

  if (update > dependencies.max) return;

  update = `${update}`;

  emit("change", update);
  emit("update:model", update);
}

function down() {
  let update = offset(-1);

  if (update < dependencies.min) return;

  update = `${update}`;

  emit("change", update);
  emit("update:model", update);
}

function roundTo(num, precision = 2) {
  const step = pow(10, precision);

  return round(num * step) / step;
}
</script>
