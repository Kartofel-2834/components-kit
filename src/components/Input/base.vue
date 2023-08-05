<template>
  <div class="inputbase" :class="{ [dependencies.theme]: true }">
    <input
      :value="currentValue"
      :type="currentType"
      :disabled="dependencies.disabled"
      :placeholder="dependencies.placeholder"
      class="input"
      :class="{ input_icon: isWithIcon }"
      @input="onValueChange"
      @keydown="(e) => emit('keydown', e)"
      @focus="(e) => emit('focus', e)"
      @blur="(e) => emit('blur', e)"
    />
    <span class="inputbase__icon">
      <slot name="icon">
        <Icon
          v-if="isWithIcon"
          :icon="dependencies.icon"
          :class="{
            inputbase__icon_hided: dependencies.iconHided,
            inputbase__icon_clickable: dependencies.iconClickable,
            inputbase__icon_active: dependencies.iconActive,
            inputbase__icon_disabled: dependencies.disabled,
          }"
          @click="() => emit('icon')"
        />
      </slot>
    </span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, inject, useSlots, computed } from "vue";

// Components
import { Icon } from "@iconify/vue";

const emit = defineEmits([
  "update:modelValue",
  "change",
  "icon",
  "keydown",
  "focus",
  "blur",
]);

const slots = useSlots();

const dependencies = inject("dependencies");
const currentValue = inject("currentValue", "");

const props = defineProps({
  type: { String, required: false },
});

const currentType = computed(() => props?.type || dependencies.type);
const isWithIcon = computed(() => !!dependencies?.icon || !!slots?.icon);

function onValueChange(event) {
  const newValue = event.target.value;

  emit("update:modelValue", newValue);
  emit("change", newValue);
}
</script>
