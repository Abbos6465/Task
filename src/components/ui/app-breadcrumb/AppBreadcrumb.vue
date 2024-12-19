<script
    setup
    lang="ts"
>

import {
  BreadcrumbItemTagType,
  BreadcrumbItemType,
  BreadcrumbPropsType
} from "@/components/ui/app-breadcrumb/app-breadcrumb.types";
import AppIcon from "@/components/ui/app-icon/AppIcon.vue";

const { items = [] } = defineProps<BreadcrumbPropsType>();

const breadcrumbItemTag = (breadcrumbItem: BreadcrumbItemType): BreadcrumbItemTagType => {
  if (breadcrumbItem.to) return "RouterLink";
  else if (breadcrumbItem.click) return "button";

  return "span";
};

</script>

<template>
  <div
      v-if="items.length>0"
      class="mb-6 flex flx-wrap items-center"
  >
    <RouterLink to="/">
      <AppIcon
          icon="home"
          class="size-5"
      />
    </RouterLink>
    <template
        v-for="item in items"
        :key="item.label"
    >
      <AppIcon
          icon="arrow"
          class="w-1.5 h-2.5 mx-3"
      />
      <component
          :is="breadcrumbItemTag(item)"
          :to="item.to"
          @click="item.click"
          :class="['text-xs font-medium', `${item.isActionable ? 'text-dark-gray' : 'text-soft-gray'}`]"
      >
        {{ item.label}}
      </component>
    </template>
  </div>
</template>