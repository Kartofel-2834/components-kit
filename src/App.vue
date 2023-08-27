<template>
  <jo-select v-model="kamal" :options="options" multiple filterable />
</template>

<script lang="ts" setup>
import { ref } from "vue";

// Types
import { Ref } from "vue";

// Components
import JoSelect from "@/components/jo-select/index.vue";

const kamal: Ref<string> = ref("");
const options = ["Red", "Green", "Blue"];

function a() {
  alert(2);
}
</script>

<style src="@/assets/css/index.css" />
