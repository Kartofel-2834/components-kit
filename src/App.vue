<template>
  <jo-button @click="a">Kamal</jo-button>

  <jo-checkbox v-model="kamal" />
</template>

<script lang="ts" setup>
import { ref } from "vue";

// Types
import { Ref } from "vue";

// Components
import JoButton from "@/components/jo-button.vue";
//import JoSwitch from "@/components/jo-switch.vue";
import JoCheckbox from "@/components/jo-checkbox.vue";

const kamal: Ref<boolean> = ref(false);

function a() {
  alert(2);
}
</script>

<style src="@/assets/css/index.css" />
