<template>
  <div style="width: 20%; margin: 0 auto">
    <Switch v-model="kamal" disabled />
  </div>

  <p style="color: white">{{ kamal }}</p>
</template>

<script setup>
import { ref } from "vue";

import Switch from "@/components/Switch";

const kamal = ref(null);
</script>

<style src="@/assets/css/index.css" />
