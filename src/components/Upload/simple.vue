<template>
  <div class="upload__simple">
    <div class="upload__simple__label">
      <span>
        <slot name="label"> Click to upload file </slot>
      </span>
    </div>

    <Button class="upload__simple__button">
      <slot name="button">Upload</slot>
    </Button>
  </div>
</template>

<script setup>
import Button from "@/components/Button";
</script>

<style>
.upload__simple {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.upload__simple__label {
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

.upload__simple__label span {
  display: block;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.upload__simple__button {
  pointer-events: none;
}

.upload__simple:hover .upload__simple__label {
  border-color: var(--primary);
}

.upload__simple:hover .upload__simple__button {
  border-color: var(--primary);
  background-color: var(--primary);
}
</style>
