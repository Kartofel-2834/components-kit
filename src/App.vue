<template>
  <div style="width: 20%; margin: 0 auto">
    <Input
      :value="kamal"
      type="phone"
      placeholder="Телефон"
      @change="(v) => (kamal = v)"
    />
  </div>

  {{ kamal }}
</template>

<script setup>
import { ref } from "vue";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "@/components/Link";
import Radio from "@/components/Radio";
import Checkbox from "@/components/Checkbox";

const kamal = ref("");
</script>

<style src="@/assets/css/index.css" />
