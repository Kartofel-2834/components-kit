<template>
  <label class="upload" :class="{ [theme]: true }">
    <input
      type="file"
      :multiple="multiple"
      class="upload__input"
      @change="onFileLoad"
    />

    <template v-if="multiple"> </template>

    <template v-else>
      <SimpleLoader v-if="type === 'row'">
        <template #label>
          <slot name="label" :file="file" :filename="file?.name">
            {{ file?.name || "Click to upload" }}
          </slot>
        </template>

        <template v-if="slots?.button" #button>
          <slot name="button" />
        </template>
      </SimpleLoader>

      <CardLoader
        v-else-if="type === 'card'"
        :file="file"
        :extension="ext"
        :fileurl="fileurl"
        editable
      >
        <template v-for="slotname of fileSlots" #[slotname]>
          <slot :name="slotname" />
        </template>
      </CardLoader>
    </template>
  </label>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, useSlots } from "vue";

// Components
import Button from "@/components/Button";
import SimpleLoader from "./simple.vue";
import CardLoader from "./card.vue";

const props = defineProps({
  type: {
    type: String,
    default: "row",
    validator: (type) => ["row", "card"].includes(type),
  },
  theme: { type: String, default: "primary" },
  test: { type: Function, required: false },
  multiple: { type: Boolean, default: false },
});

const emit = defineEmits(["change"]);

const slots = useSlots();

const filereader = new FileReader();

const files = ref(null);
const file = ref(null);
const fileurl = ref("");

const fileSlots = computed(() => {
  return Object.keys(slots).filter((slotname) => /^file-.+/.test(slotname));
});

const ext = computed(() => {
  return file.value?.name
    ? file.value.name.slice(file.value.name.lastIndexOf(".") + 1)
    : "";
});

filereader.onload = function () {
  fileurl.value = this.result;
};

function onFileLoad(event) {
  const { target } = event;
  const { files } = target;

  if (!files.length) return;

  const [currentFile] = files;

  if (typeof props.test === "function") {
    const exam = props.test(props.multiple ? files : currentFile);

    if (!exam) return event.preventDefault();
  }

  files.value = files;
  file.value = currentFile;

  emit("change", currentFile);

  if (!currentFile.type.includes("image")) return;

  filereader.readAsDataURL(currentFile);
}
</script>

<style>
.upload__input {
  display: none;
}
</style>
