<template>
  <jo-button @click="a">Kamal</jo-button>

  <jo-link>{{ kamal }}</jo-link>

  <jo-radio
    v-model="kamal"
    :items="[{ label: 'a' }, { label: 'b' }, { label: 'c' }]"
    label="label"
    keymap="label"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

// Types
import { Ref } from "vue";

// Components
import JoButton from "@/components/jo-button.vue";
import JoLink from "@/components/jo-link.vue";
import JoRadio from "@/components/jo-radio.vue";

const kamal: Ref<string> = ref("");

function a() {
  alert(2);
}
</script>

<style src="@/assets/css/index.css" />
