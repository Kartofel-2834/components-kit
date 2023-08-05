<template>
  <BaseInput :type="realType">
    <template #icon>
      <Icon icon="mdi:eye-outline" @click="toggleType" />
    </template>
  </BaseInput>
</template>

<script setup>
import { ref } from "vue";

// Components
import BaseInput from "./base.vue";
import { Icon } from "@iconify/vue";

const realType = ref("password");

function toggleType() {
  realType.value = realType.value === "password" ? "text" : "password";
}
</script>
