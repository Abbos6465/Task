<script
    setup
    lang="ts"
>
import {
  AppMediaUploaderPropsType,
  AppMediaUploaderValueType
} from "@/components/ui/form/app-media-uploader/app-media-uploader.type";
import { computed, ref, useTemplateRef, watch } from "vue";
import { generateRandomID } from "@/utils/helper";
import AppIcon from "@/components/ui/app-icon/AppIcon.vue";

const id = generateRandomID();

const model = defineModel<AppMediaUploaderValueType>({
  default: ""
});

const props = withDefaults(defineProps<AppMediaUploaderPropsType>(), {
  height: 224,
  loading: false
});

const computedHeight = computed(() => {
  if (typeof props.height === "string") return props.height;
  return `${props.height}px`;
});

const emit = defineEmits<{
  (event: "clear"): void;
}>();


const inputFile = useTemplateRef<HTMLInputElement>("input-file");
const fileType = ref<string>("");
const mediaFile = ref<string | ArrayBuffer | null>("");

const uploadImage = async (event: Event) => {
  const target = event.target as HTMLInputElement | null;

  if (!target || !target.files || !target.files[0]) return;

  const file: File = target.files[0];

  fileType.value = file.type.split("/")[0];
  model.value = file;
};

const readImage = async () => {
  if (!model.value) return;

  if (model.value instanceof File) {
    const reader = new FileReader();

    mediaFile.value = await new Promise<string | ArrayBuffer | null>(
        (resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(model.value as File);
        }
    );
  }
};

const clear = () => {
  mediaFile.value = "";
  model.value = "";
  if (inputFile.value) {
    inputFile.value.value = "";
  }
  emit("clear");
};

watch(
    () => props.value,
    newValue => {
      if (newValue && !model.value) {
        mediaFile.value = newValue;
      }
    },
    { immediate: true }
);

watch(model, readImage, { immediate: true });

const setDefaultImage = (event: any) => {
  event.target.src = "https://www.landuse-ca.org/wp-content/uploads/2019/04/no-photo-available.png";
};
</script>

<template>
  <div class="app-media-uploader w-full">
    <input
        :id
        ref="input-file"
        type="file"
        accept="image/png, image/jpeg"
        class="app-media-uploader__input absolute left-0 top-0 opacity-0 invisible"
        @input="uploadImage"
    />
    <label
        :for="id"
        :class="[
        'bg-white-blue rounded-2xl border-dashed border border-gray-300 overflow-y-hidden flex items-center justify-center',
        { 'cursor-pointer': !mediaFile },
      ]"
        :style="{ height: computedHeight }"
    >
      <ElProgress
          v-if="loading"
          type="circle"
          :stroke-width="5"
          :percentage="30"
          status="success"
          :show-text="false"
          :indeterminate="true"
          :duration="1"
      />
      <span
          v-if="mediaFile"
          class="relative cursor-pointer z-1 group w-full"
      >
        <img
            @error="setDefaultImage"
            :src="mediaFile as string"
            alt="file img"
            :class="['w-full rounded-2xl object-contain h-full p-2']"
            :style="{ 'max-height': computedHeight }"
        />
        <button
            class="cursor-pointer pointer-events-none absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Изменить фото
        </button>
      </span>
      <span
          v-else-if="!mediaFile && !loading"
          class="flex flex-col items-center justify-center p-6"
      >
        <span class="bg-white rounded-2xl p-4">
         <AppIcon icon="upload"/>
        </span>
        <span class="text-gray-700 text-sm mt-6">
          Перетащите фотографию для загрузки
        </span>
        <span class="text-gray-400 text-xs mt-1">
          Максимальный размер фотографии 10 МБ
        </span>
        <button
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-6 pointer-events-none"
        >
          Выбрать фото
        </button>
      </span>
    </label>
  </div>
</template>
