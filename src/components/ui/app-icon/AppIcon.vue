<script setup lang="ts">
import { AppIconPropsType } from "@/components/ui/app-icon/app-icon.types";
import useIcon from "@/components/ui/app-icon/useIcon";
import { computed } from "vue";

const props = defineProps<AppIconPropsType>();

const { SVGComponent } = useIcon(props);

const computedStyles = computed<Record<string, string>>(() => {
  const styles: Record<string, string> = {};

  if (props.size) {
    styles.width = `${props.size}px`;
    styles.height = `${props.size}px`;
  }

  if (props.width) {
    styles.width = `${props.width}px`;
  }

  if (props.height) {
    styles.height = `${props.height}px`;
  }

  return styles;
});
</script>

<template>
  <SVGComponent :style="computedStyles" />
</template>
