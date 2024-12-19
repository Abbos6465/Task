<script
  setup
  lang="ts"
>

import { AppEmptyPropsType } from "@/components/ui/app-empty/app-empty.types";
import { computed } from "vue";

const props = defineProps<AppEmptyPropsType>();

const computedDescription = computed(() => {
  return props.description ?? "Нет информации";
});

</script>

<template>
  <ElEmpty
    class="min-h-[60vh]"
    :description="computedDescription"
  />
</template>