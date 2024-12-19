<script
    setup
    lang="ts"
>

import { NavDrawerPropsType, NavListLinkType } from "@/components/layouts/nav-draver/nav-draver.types";
import { computed, ref, watch } from "vue";
import AppIcon from "@/components/ui/app-icon/AppIcon.vue";
import { useAuthStore } from "@/modules/auth/auth.store";
import { useRoute } from "vue-router";

const route = useRoute();

const routeName = computed<string>(() => route.name as string);

const authStore = useAuthStore();

const { items } = defineProps<NavDrawerPropsType>();

const emit = defineEmits<{
  changeWidth: [value: number]
}>();

const navDrawerItemIsActive = (item: NavListLinkType): boolean => {
  return routeName.value.includes(item.value);
};

const collapse = ref(false);

watch(collapse, (newValue) => {
  emit("changeWidth", newValue ? 64 : 250);
}, { immediate: true });
</script>

<template>
  <div class="fixed left-0 top-0 z-10 h-full py-4">
    <ElMenu
        :collapse
        class="nav-drawer__menu h-full"
        router
    >
      <div class="nav-drawer__logo">
        <RouterLink
            v-if="!collapse"
            to="/"
        >
          {{
            collapse ? "L" : "Logo"
          }}
        </RouterLink>
        <button @click="collapse = !collapse">
          <AppIcon
              icon="arrow"
              :class="['transition duration-200', {'arrow-left': !collapse}]"
          />
        </button>
      </div>
      <template
          v-for="(item, index) in items"
          :key="item.value"
      >
        <ElSubMenu
            v-if="item.children && item.children.length"
            :index="`${index+1}`"
        >
          <template #title>
            <AppIcon
                v-if="item.icon"
                :icon="item.icon"
                class="size-6"
            />
            <span>{{
                item.title
              }}</span>
          </template>
          <ElMenuItem
              v-for="(childItem, childIndex) in item.children"
              :key="childItem.value"
              :index="`${index+1}-${childIndex+1}`"
              :class="['nav-drawer__item', {'nav-drawer__item--active': navDrawerItemIsActive(childItem)}]"
          >
            <AppIcon
                v-if="childItem.icon"
                :icon="childItem.icon"
                class="size-5"
            />
            <span>
					{{
                childItem.title
              }}
				</span>
          </ElMenuItem>
        </ElSubMenu>
        <ElMenuItem
            v-else
            :index="`${index+1}`"
            :route="{name: item.value}"
            :class="['nav-drawer__item', {'nav-drawer__item--active': navDrawerItemIsActive(item)}]"
        >
          <AppIcon
              v-if="item.icon"
              :icon="item.icon"
              class="size-5"
          />
          <span>
					{{
              item.title
            }}
				</span>
        </ElMenuItem>
      </template>
      <ElMenuItem
          @click="authStore.logout"
          class="nav-drawer__item mt-auto"
      >
        <AppIcon icon="logout"/>
        <span class="text-sm font-medium text-red">
					Выход
				</span>
      </ElMenuItem>
    </ElMenu>
  </div>
</template>

<style lang="scss">
.nav-drawer {

  &__logo {
    @apply border-b font-semibold text-3xl border-white-gray w-full h-[55px] mb-2 px-3 pb-2.5 flex items-center justify-between;
  }

  .el-menu--collapse &__logo {
    @apply flex h-[63px] justify-center items-center;
  }

  &__menu {
    padding: 2px;
    @apply flex flex-col gap-y-1.5;


    &:not(.el-menu--collapse) {
      padding: 10px;
      width: 250px;
    }
  }

  &__item {
    @apply cursor-pointer  px-3 py-2.5 w-full flex gap-x-3 font-semibold text-dark !rounded-[8px] transition duration-200 ease-in;

    &:hover, &--active {
      @apply shadow-[0px_1.5px_4px_-1px_#0A090B12] bg-[#F6F8FA];
    }

    span {
      //margin-top: -6px;
    }
  }

  .el-menu--collapse &__item {
    @apply justify-center;

    svg {
      @apply translate-x-1/2;
    }
  }
}
</style>