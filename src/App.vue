<template>
  <jo-button @click="a">Kamal</jo-button>

  <jo-link>{{ kamal }}</jo-link>

  <jo-range v-model="kamal" />
</template>

<script lang="ts" setup>
import { ref } from "vue";

// Types
import { Ref } from "vue";

// Components
import JoButton from "@/components/jo-button.vue";
import JoLink from "@/components/jo-link.vue";
import JoRange from "@/components/jo-range.vue";

const kamal: Ref<number> = ref(0);

function a() {
  alert(2);
}
</script>

<style src="@/assets/css/index.css" />
