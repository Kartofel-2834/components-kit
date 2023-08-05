<template>
  <div style="width: 20%; margin: 0 auto">
    <Input v-model="kamal" type="phone" />
  </div>

  <p style="color: white">{{ kamal }}</p>
</template>

<script setup>
import { ref } from "vue";

import Input from "@/components/Input";

const kamal = ref("kamal");
const options = [
  "aaa ".repeat(50),
  "b".repeat(50),
  "c".repeat(50),
  "d".repeat(30),
  "e".repeat(30),
  "f".repeat(30),
  "g".repeat(30),
  "h".repeat(30),
];
</script>

<style src="@/assets/css/index.css" />
