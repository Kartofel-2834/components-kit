<template>
  <div style="width: 80%; margin: 0 auto">
    <Upload :test="validation">
      <template #button> Загрузить </template>
    </Upload>
  </div>

  <p style="color: white">{{ kamal }}</p>
</template>

<script setup>
import { ref } from "vue";

import Upload from "@/components/Upload";

const kamal = ref(null);

function validation(file) {
  const { name: filename } = file;

  if (!filename) return false;

  const extension = filename.slice(filename.lastIndexOf(".") + 1);

  return /txt/.test(extension);
}
</script>

<style src="@/assets/css/index.css" />
