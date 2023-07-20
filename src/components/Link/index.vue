<template>
  <a
    v-if="to.length"
    class="link"
    :class="linkClasses"
    :disabled="disabled"
    :href="to"
  >
    <slot />
  </a>

  <div v-else class="link" :class="linkClasses" :disabled="disabled">
    <slot />
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  theme: { type: String, default: "primary" },
  to: { type: String, default: "" },
  lineOrigin: { type: String, default: "center" },
  withoutLine: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const linkClasses = computed(() => ({
  [props.theme]: true,
  "link_without-line": props.withoutLine,
  link_left: props.lineOrigin === "left",
  link_right: props.lineOrigin === "right",
}));
</script>

<style src="@/assets/css/components/link.css" />
