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
      <jo-upload-row v-if="type === 'row'">
        <template #label>
          <slot name="label" :file="file" :filename="file?.name">
            {{ file?.name || "Click to upload" }}
          </slot>
        </template>

        <template v-if="slots?.button" #button>
          <slot name="button" />
        </template>
      </jo-upload-row>

      <jo-upload-card
        v-else-if="type === 'card'"
        :file="file"
        :extension="ext"
        :fileurl="fileurl"
        editable
      >
        <template v-for="slotname of fileSlots" #[slotname]>
          <slot :name="slotname" />
        </template>
      </jo-upload-card>
    </template>
  </label>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed, useSlots } from "vue";

// Components
import JoUploadRow from "./row.vue";
import JoUploadCard from "./card.vue";

// Types
import { Slots, Ref } from "vue";

// Interfaces
interface IProps {
  theme?: string;
  type?: "row" | "card";
  multiple?: boolean;
  test?: (update: File | FileList) => boolean;
}

interface IEvents {
  (event: "change", value: File | FileList | null): void;
}

defineComponent({
  name: "jo-upload",
});

const emit = defineEmits<IEvents>();

const slots: Slots = useSlots();

const props = withDefaults(defineProps<IProps>(), {
  theme: "primary",
  type: "row",
  multiple: false,
});

const filereader: FileReader = new FileReader();

const files: Ref<FileList | null> = ref(null);
const file: Ref<File | null> = ref(null);
const fileurl: Ref<string> = ref("");

const fileSlots = computed<Array<string>>(() => {
  return Object.keys(slots).filter((slotname) => /^file-.+/.test(slotname));
});

const ext = computed<string>(() => {
  return file.value?.name
    ? file.value.name.slice(file.value.name.lastIndexOf(".") + 1)
    : "";
});

filereader.onload = function (): void {
  if (typeof this.result !== "string") return;

  fileurl.value = this.result;
};

function onFileLoad(event: Event): void {
  const target = event.target as HTMLInputElement;
  const newFiles: FileList | null = target?.files;

  if (!newFiles || !newFiles.length) return;

  const [currentFile] = newFiles;

  if (typeof props.test === "function") {
    const exam = props.test(props.multiple ? newFiles : currentFile);

    if (!exam) {
      event.preventDefault();
      return;
    }
  }

  files.value = newFiles;
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
