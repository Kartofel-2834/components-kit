<template>
  <BaseInput
    :type="realType"
    icon="mdi:eye-outline"
    icon-clickable
    @icon="toggleType"
  />
</template>

<script setup>
import { ref } from "vue";

// Components
import BaseInput from "./base.vue";

const realType = ref("password");

function toggleType() {
  realType.value = realType.value === "password" ? "text" : "password";
}
</script>
