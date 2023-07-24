<template>
  <div style="width: 20%; margin: 0 auto">
    <Select
      multiple
      :value="kamal"
      :options="options"
      @change="(v) => (kamal = v)"
    />
  </div>

  <p style="color: white">{{ kamal }}</p>
</template>

<script setup>
import { ref } from "vue";

import Select from "@/components/Select";
import Option from "@/components/Select/option.vue";

const kamal = ref(null);
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
