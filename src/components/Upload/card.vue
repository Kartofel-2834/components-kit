<template>
  <div class="upload__card" :class="{ upload__card_editable: editable }">
    <div
      class="upload__card__add"
      :class="{ upload__card__add_hidden: !!file }"
    >
      <Icon icon="material-symbols:add" />
    </div>

    <div v-show="!!file" class="upload__card__content">
      <slot :name="`file-${extension}`">
        <img v-if="isImage" :src="fileurl" />

        <template v-else>
          <Icon icon="material-symbols:unknown-document" />
          <span class="upload__card__content__label">.{{ extension }}</span>
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Components
import { Icon } from "@iconify/vue";

const props = defineProps({
  file: { type: Object, default: null },
  extension: { type: String, required: false },
  fileurl: { type: String, required: false },
  editable: { type: Boolean, default: false },
});

const isImage = computed(
  () => props.fileurl && /jpg|jpeg|png/.test(props.extension)
);
</script>

<style>
.upload__card {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
  width: 15em;
  height: 15em;
  overflow: hidden;
  cursor: pointer;

  border: 1px solid var(--theme-text);
  transition: 0.2s ease-in-out;
}

.upload__card__add,
.upload__card__content {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  font-size: 5em;
  color: var(--theme-text);
}

.upload__card__add {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 10;
  transition: 0.2s ease-in-out;
}

.upload__card__add_hidden {
  opacity: 0;
}

.upload__card__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25em;
  align-items: center;
  overflow: hidden;
}

.upload__card__content img {
  width: 100%;
}

.upload__card__content__label {
  font-size: 0.45em;
}

.upload__card_editable .upload__card__add_hidden {
  background-color: rgba(0 0 0 / 60%);
}

.upload__card_editable:hover {
  border-color: var(--theme);
}

.upload__card_editable:hover .upload__card__add_hidden {
  opacity: 1;
}
</style>
