<template>
  <div class="inputbase" :class="{ [theme]: true }">
    <input
      :value="value"
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder"
      class="input"
      :class="{ input_icon: !!icon || slots?.icon }"
      @input="(e) => setValue(e.target.value)"
      @keydown="(e) => emit('keydown', e)"
      @focus="(e) => emit('focus', e)"
      @blur="(e) => emit('blur', e)"
    />

    <span class="inputbase__icon">
      <slot name="icon">
        <Icon
          v-if="icon"
          :icon="icon"
          :class="{
            inputbase__icon_hided: iconHided,
            inputbase__icon_clickable: iconClickable,
            inputbase__icon_active: iconActive,
            inputbase__icon_disabled: disabled,
          }"
          @click="() => emit('icon')"
        />
      </slot>
    </span>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, useSlots } from "vue";

// Components
import { Icon } from "@iconify/vue";

const emit = defineEmits(["change", "icon", "keydown", "focus", "blur"]);

const slots = useSlots();

const props = defineProps({
  value: { type: String, default: "" },
  type: { type: String, default: "text" },
  theme: { type: String, default: "primary" },
  placeholder: { type: String, default: "" },
  icon: { type: String, required: false },
  disabled: { type: Boolean, default: false },
  iconClickable: { type: Boolean, default: false },
  iconActive: { type: Boolean, default: false },
  iconHided: { type: Boolean, default: false },
});

function setValue(v) {
  emit("change", v);
}
</script>
