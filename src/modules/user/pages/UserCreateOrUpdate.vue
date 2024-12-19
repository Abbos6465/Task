<script
    setup
    lang="ts"
>

import AppBreadcrumb from "@/components/ui/app-breadcrumb/AppBreadcrumb.vue";
import { useRoute, useRouter } from "vue-router";
import AppInput from "@/components/ui/form/app-input/AppInput.vue";
import AppOverlay from "@/components/ui/app-overlay/AppOverlay.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { UserDataType } from "@/modules/user/user.types";
import AppForm from "@/components/ui/form/app-form/AppForm.vue";
import { ValidationType } from "@/components/ui/form/app-form/app-form.type";
import { useCommonStore } from "@/stores/common.store";
import { useUserStore } from "@/modules/user/user.store";
import AppSelect from "@/components/ui/form/app-select/AppSelect.vue";
import AppDatePicker from "@/components/ui/form/app-date-picker/AppDatePicker.vue";
import { getStatusText } from "@/utils/helper";
import { toast } from "vue3-toastify";
import AppMediaUploader from "@/components/ui/form/app-media-uploader/AppMediaUploader.vue";

enum TABS {
  FORM = 1,
  FACEID
}

const defaultTab = TABS.FORM;

const tabs = computed(() => {
  return [
    {
      title: "Данные кандидата",
      value: TABS.FORM
    },
    {
      title: "Фотография для Face ID",
      value: TABS.FACEID
    }
  ];
});

const activeTab = computed(() => {
  return route.query.tab ? +route.query.tab : defaultTab;
});

const route = useRoute();

const method = computed(() => route.meta.method ?? "");

const methodLoading = computed(() => {
  if (method.value === "create") return userStore.createUserLoading;
  else if (method.value === "update") return userStore.updateUserLoading;
  return false;
});

const router = useRouter();

const commonStore = useCommonStore();
const userStore = useUserStore();

const form = reactive<UserDataType>({
  username: "",
  full_name: "",
  password: "",
  birth_date: "",
  gender: "",
  status: false,
  phone: "",
  role: "",
  country_id: ""
});

const v$ = ref<ValidationType | null>(null);

const sendForm = async () => {
  if (!v$.value) return;

  if (!(await v$.value.validate())) return;

  if (method.value === "create") {
    await userStore.createUser(form);
    toast.success("Пользователь успешно добавлен.");
  } else {
    await userStore.updateUser(route.params.id, form);
    toast.success("Пользователь успешно изменен");
  }

  router.push({ name: "user.list" });
};

const deleteUser = async () => {
  await userStore.deleteUser(route.params.id);
  toast.success("Пользователь успешно удален");
  router.push({ name: "user.list" });
};

const setForm = () => {
  if (!userStore.user) return;

  form.username = userStore.user.username ?? "";
  form.birth_date = userStore.user.birth_date ?? "";
  form.full_name = userStore.user.full_name ?? "";
  form.status = !!userStore.user.status;
  form.phone = userStore.user.phone ?? "";
  form.gender = userStore.user.gender ?? "";
  form.role = userStore.user.role ?? "";
  form.country_id = userStore.user.country_id ?? "";
};

onMounted(() => {
  if (method.value === "update") {
    userStore.fetchUser(route.params.id);
    setForm();
  }
});

</script>

<template>
  <section class="min-w-[792px] w-[82%]">
    <AppBreadcrumb
        :items="[
        {
          label: 'Пользователи',
          to: {name: 'user.list'}
        },
        {
          label: String(route.meta.breadCrumbItemTitle ?? ''),
          isActionable: true,
        }
    ]"
    />
    <h1 class="title">
      {{ route.meta.title }}
    </h1>
    <div class="app-tabs w-[345px] mt-6">
      <RouterLink
          v-for="item in tabs"
          :key="item.value"
          class="cursor-pointer"
          :class="['app-tab', {'app-tab--active': activeTab === item.value}]"
          :to="{query: {...route.query, tab: item.value}}"
      >
        {{ item.title }}
      </RouterLink>
    </div>
    <AppOverlay
        :rounded="24"
        parent-class-name="mt-6 rounded-3xl p-6 border border-pastel-blue"
    >
      <TransitionGroup
          :name="activeTab>defaultTab ? 'nested' : 'nested-reverse'"
      >
        <div
            class="min-h-[55vh] w-full flex flex-col justify-between"
            v-if="activeTab === TABS.FORM"
        >
          <AppForm
              :value="form"
              class="grid grid-cols-3 gap-x-6 gap-y-4"
              @validation="value => v$ = value"
          >
            <AppInput
                v-model="form.full_name"
                property="full_name"
                label="Фамилия И.О"
                required
            />
            <AppInput
                v-model="form.username"
                prop="username"
                label="Имя пользователя"
                required
            />
            <AppInput
                v-model="form.password"
                prop="password"
                type="password"
                required
                label="Пароль"
            />
            <AppDatePicker
                v-model="form.birth_date"
                property="birth_date"
                required
                label="Дата рождения"
            />
            <AppSelect
                v-model="form.gender"
                prop="gender"
                :items="commonStore.genders"
                item-value="value"
                item-label="name"
                label="Пол"
                required
            />
            <AppSelect
                v-model="form.role"
                prop="role"
                :items="commonStore.roles"
                item-value="value"
                item-label="name"
                label="Роль"
                required
            />
            <AppInput
                v-model="form.phone"
                type="tel"
                prop="phone"
                label="Номер телефона"
                required
            />
            <AppSelect
                v-model="form.country_id"
                prop="country_id"
                label="Страна"
            />
          </AppForm>
          <ElSwitch
              v-model="form.status"
              :active-text="getStatusText(form.status)"
              class="app-switch"
          />
        </div>
        <template v-else>
          <AppMediaUploader
              :height="450"
          />
        </template>
      </TransitionGroup>
    </AppOverlay>
    <div class="flex items-center justify-between mt-6 gap-x-10">
      <ElButton
          @click="deleteUser"
          :loading="userStore.deleteUserLoading"
          v-if="method === 'update'"
          type="danger"
          size="large"
      >
        Удалить
      </ElButton>
      <div class="flex items-center gap-x-4 ml-auto">
        <RouterLink
            class="app-btn app-btn--pastel-blue"
            :to="{name: 'user.list'}"
        >
          Отменить
        </RouterLink>
        <ElButton
            :loading="methodLoading"
            @click="sendForm"
            type="primary"
            size="large"
        >
          {{ method === "create" ? "Добавить" : "Сохранить" }}
        </ElButton>
      </div>
    </div>
  </section>
</template>

<style
    lang="scss"
>

</style>