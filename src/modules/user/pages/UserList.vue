<script
    setup
    lang="ts"
>

import AppBreadcrumb from "@/components/ui/app-breadcrumb/AppBreadcrumb.vue";
import { useRoute, useRouter } from "vue-router";
import { computed, reactive, watch } from "vue";
import AppInput from "@/components/ui/form/app-input/AppInput.vue";
import AppIcon from "@/components/ui/app-icon/AppIcon.vue";
import AppTable from "@/components/ui/app-table/AppTable.vue";
import { UserItemType, UserListParamsType } from "@/modules/user/user.types";
import { useUserStore } from "@/modules/user/user.store";
import { filterObjectValues } from "@/utils/helper";
import { watchDebounced } from "@vueuse/core";
import { AppTableColumnType } from "@/components/ui/app-table/app-table.types";
import AppPagination from "@/components/ui/app-pagination/AppPagination.vue";

const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const routeTitle = computed(() => route.meta.title ?? "");

const form = reactive<UserListParamsType>({
  search: "",
  limit: 10,
  offset: 0
});

const fetchUsers = () => {
  const query = route.query as Record<string, string>;

  const limit = parseInt(query.limit);
  const offset = parseInt(query.offset);

  form.search = String(query.search ?? "");
  form.limit = !isNaN(limit) ? limit : 10;
  form.offset = !isNaN(offset) ? offset : 0;

  userStore.fetchUsers(filterObjectValues(form));
};

const tableColumns = computed<AppTableColumnType[]>(() => {
  return [
    {
      prop: "idx",
      label: "№",
      width: "80",
      align: "center"
    },
    {
      prop: "full_name",
      label: "Фамилия И.О"
    },
    {
      prop: "user_name",
      label: "Имя пользователя"
    },
    {
      prop: "status",
      label: "Статус"
    },
    {
      prop: "phone",
      label: "Телефон"
    },
    {
      prop: "role",
      label: "Роль"
    },
    {
      prop: "action",
      label: "Действие"
    }
  ];
});

const currentChange = (user: UserItemType) => {
  router.push({ name: "user.show", params: { id: user.id } });
};

watchDebounced(() => form.search, (newValue) => {
  if (newValue) router.replace({ query: filterObjectValues({ search: form.search }) });
}, { debounce: 500, maxWait: 1000 });

watch(() => route.query, () => {
  fetchUsers();
}, { immediate: true });

</script>

<template>
  <section>
    <AppBreadcrumb
        :items="[
            {
                label: routeTitle,
                isActionable: true,
            }
		      ]"
    />
    <div class="flex items-center justify-between">
      <h1
          v-if="routeTitle"
          class="title"
      >
        {{ routeTitle }}
      </h1>
      <div class="flex items-center gap-x-4">
        <AppInput
            v-model="form.search"
            size="large"
            custom-type="search"
            class="w-[300px]"
        />
        <ElButton
            tag="RouterLink"
            :to="{name: 'user.create'}"
            type="primary"
            size="large"
            class="!h-12 min-w-[158px]"
        >
          <span class="flex items-center gap-x-2 text-lg font-medium">
            <AppIcon
                class="w-6"
                icon="plus"
            />
            <span>
              Добовит
            </span>
          </span>
        </ElButton>
      </div>
    </div>
    <AppTable
        :loading="userStore.usersLoading"
        class="mt-6"
        :data="userStore.users?.results ?? []"
        :columns="tableColumns"
        @current-change="currentChange"
    >
      <template #full_name="{row}:{row:UserItemType}">
        <div
            v-if="row.avatar|| row.full_name"
            class="flex items-center gap-x-3"
        >
          <img
              v-if="row.avatar"
              :src="row.avatar"
              :alt="row.full_name || row.user_name || 'avatar'"
              class="rounded-full object-contain size-8"
          />
          <span
              v-if="row.full_name"
              class="text-slate-gray text-sm"
          >
            {{ row.full_name }}
          </span>
        </div>
        <template v-else>
          -
        </template>
      </template>
      <template #status="{row}:{row:UserItemType}">
        <div
            :class="['py-2 px-4 rounded-full text-center text-sm font-medium inline-flex items-center justify-center w-[125px] min-h-10',row.status ? 'text-[#22A95E] bg-[#D4F4E2]' : 'text-[#8F9194] bg-[#EEEEEF]']"
        >
          {{ row.status ? "Активный" : "Неактивный" }}
        </div>
      </template>
      <template #action="{row}:{row:UserItemType}">
        <div
            @click.stop
            class="actions"
        >
          <RouterLink
              :to="{name: 'user.show', params: {id: row.id}}"
              class="action-btn"
          >
            <AppIcon
                icon="eye"
                class="action-btn__icon"
            />
          </RouterLink>
          <RouterLink
              :to="{name: 'user.edit', params: {id: row.id}}"
              class="action-btn"
          >
            <AppIcon
                icon="pencil"
                class="action-btn__icon"
            />
          </RouterLink>
        </div>
      </template>
    </AppTable>
    <AppPagination
        v-model="form.offset"
        :limit="form.limit"
        :count="userStore.users?.count"
    />
  </section>
</template>

<style
    scoped
    lang="scss"
>

</style>