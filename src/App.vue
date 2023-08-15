<template>
  <Button @click="a">Kamal</Button>
</template>

<script lang="ts" setup>
// Components
import Button from "@/components/Button";

function a() {
  alert(2);
}
</script>

<style src="@/assets/css/index.css" />
