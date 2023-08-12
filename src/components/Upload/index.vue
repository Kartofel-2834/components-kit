<template>
  <label class="upload" :class="{ [theme]: true }">
    <input type="file" class="upload__input" @change="onFileLoad" />

    <SingleLoader>
      <template v-if="slots?.label" #label>
        <slot name="label" :file="file" :filename="file?.name" />
      </template>

      <template v-if="slots?.button" #button>
        <slot name="button" />
      </template>
    </SingleLoader>
  </label>
</template>

<script setup>
import { defineProps, ref, provide, useSlots } from "vue";

// Components
import Button from "@/components/Button";
import SingleLoader from "./single.vue";

const slots = useSlots();

const props = defineProps({
  theme: { type: String, default: "primary" },
  placeholder: { type: String, default: "Click to upload" },
  test: { type: Function, required: false },
});

const file = ref(null);

provide("dependencies", props);
provide("file", file);

function onFileLoad(event) {
  const { target } = event;
  const { files } = target;

  if (!files.length) return;

  const [currentFile] = files;

  if (typeof props.test === "function" && !props.test(currentFile)) {
    return event.preventDefault();
  }

  file.value = currentFile;
}
</script>

<style>
.upload__input {
  display: none;
}
</style>
