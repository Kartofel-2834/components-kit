<template>
  <jo-base-input
    class="jo-input_password"
    :type="realType"
    @icon="toggleType"
  />
</template>

<script lang="ts" setup>
import { defineComponent, ref, provide, inject, computed } from "vue";

// Components
import JoBaseInput from "./base.vue";

// Types
import { Ref, ComputedRef } from "vue";

// Interface
import { IProps } from "./index.vue";

defineComponent({
  name: "jo-input-password",
});

const realType: Ref<string> = ref("password");
const dependencies: IProps = inject("dependencies", {} as IProps);

provide<ComputedRef<IProps>>(
  "dependencies",
  computed<IProps>(() => ({
    ...dependencies,
    icon: "mdi:eye-outline",
    iconActive: realType.value === "password",
  }))
);

function toggleType(): void {
  realType.value = realType.value === "password" ? "text" : "password";
}
</script>

<style>
.jo-input_password .jo-inputbase__icon_active {
  color: var(--theme-text);
  opacity: 0.8;
  cursor: pointer;
}
</style>
