<template>
  <jo-button @click="a">Kamal</jo-button>

  <jo-link>Kamal</jo-link>

  <jo-input v-model="kamal" type="password" />
</template>

<script lang="ts" setup>
import { ref } from "vue";

// Types
import { Ref } from "vue";

// Components
import JoButton from "@/components/jo-button.vue";
import JoLink from "@/components/jo-link.vue";
import JoInput from "@/components/jo-input/index.vue";

const kamal: Ref<string> = ref("");

function a() {
  alert(2);
}
</script>

<style src="@/assets/css/index.css" />
