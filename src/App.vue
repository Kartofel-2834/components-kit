<template>
  <div style="width: 20%; margin: 0 auto">
    <Range v-model="kamal" :min="0" :max="5" :step="0.25" />
  </div>

  <p style="color: white">{{ kamal }}</p>
</template>

<script setup>
import { ref } from "vue";

import Range from "@/components/Range";

const kamal = ref(null);
</script>

<style src="@/assets/css/index.css" />
