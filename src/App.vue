<template>
  <div style="width: 20%; margin: 0 auto">
    <Select
      v-model="kamal"
      :options="options"
      multiple
      filterable
      label="name"
      field="name"
    />
  </div>

  <p style="color: white">{{ kamal }}</p>
</template>

<script setup>
import { ref } from "vue";

import Select from "@/components/Select";

const kamal = ref(null);
const options = [
  { name: "Kamal".repeat(10) },
  { name: "Ambar" },
  { name: "Ambal" },
  { name: "Lamar" },
  { name: "Albert" },
  { name: "Lukas" },
  { name: "Mortimor" },
];
</script>

<style src="@/assets/css/index.css" />
