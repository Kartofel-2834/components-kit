<template>
  <div class="upload__single upload__single_simple">
    <div class="upload__single__label">
      <span>
        <slot name="label" :file="file" :filename="file?.name">
          {{ file?.name || placeholder }}
        </slot>
      </span>
    </div>

    <Button class="upload__single__button">
      <slot name="button">Upload</slot>
    </Button>
  </div>
</template>

<script setup>
import { defineProps, inject } from "vue";

// Components
import Button from "@/components/Button";

const props = defineProps({
  type: {
    type: String,
    default: "simple",
    validator: (type) => ["simple"].includes(type),
  },
});

const file = inject("file", null);
</script>

<style>
.upload__single {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.upload__single__label {
  display: flex;
  align-items: center;
  padding: 0 1em;
  font-size: 1.25em;
  min-height: 3.15em;
  min-width: 12em;
  text-overflow: ellipsis;
  color: var(--theme-text);
  max-width: 20em;
  overflow: hidden;
  border: 1px solid var(--theme-text);
  border-right: none;
  transition: 0.2s ease-in-out;
}

.upload__single__label span {
  display: block;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.upload__single__button {
  pointer-events: none;
}

.upload__single:hover .upload__single__label {
  border-color: var(--primary);
}

.upload__single:hover .upload__single__button {
  border-color: var(--primary);
  background-color: var(--primary);
}
</style>
