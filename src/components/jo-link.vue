<template>
  <a
    v-if="to.length"
    class="jo-link"
    :class="linkClasses"
    :disabled="disabled"
    :href="to"
  >
    <slot />
  </a>

  <div v-else class="jo-link" :class="linkClasses" :disabled="disabled">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

// Types
import { Dictionary } from "@/types";

// Interfaces
import { IComponent } from "@/interfaces";

interface IProps extends IComponent {
  to?: string;
  lineOrigin?: string;
  withoutLine?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  theme: "primary",
  to: "",
  lineOrigin: "center",
  withoutLine: false,
  disabled: false,
});

const linkClasses = computed<Dictionary<boolean>>(() => ({
  [props.theme]: true,
  "jo-link_without-line": props.withoutLine,
  "jo-link_left": props.lineOrigin === "left",
  "jo-link_right": props.lineOrigin === "right",
}));
</script>

<style>
.jo-link {
  appearance: none;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  font-size: 1em;
  gap: 5px;
  color: var(--theme-text);
  cursor: pointer;
  width: fit-content;
  transition: 0.2s ease-in-out;
}

.jo-link:disabled,
.jo-link[disabled="true"] {
  opacity: 0.8;
}

.jo-link.jo-link_without-line:hover:not(:disabled, [disabled="true"]) {
  color: var(--theme);
}

.jo-link.jo-link_without-line::after {
  display: none;
}

.jo-link::after {
  content: "";
  width: 100%;
  height: 2px;
  border-radius: 8px;
  background-color: var(--theme);
  transform: scaleX(0);
  transition: 0.2s ease-in-out;
}

.jo-link.jo-link_left::after {
  transform-origin: left;
}

.jo-link.jo-link_right::after {
  transform-origin: right;
}

.jo-link:hover:not(:disabled, [disabled="true"])::after {
  transform: scaleX(100%);
}
</style>
