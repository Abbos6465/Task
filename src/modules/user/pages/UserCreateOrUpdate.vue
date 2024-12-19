<script
    setup
    lang="ts"
>

import AppBreadcrumb from "@/components/ui/app-breadcrumb/AppBreadcrumb.vue";
import { useRoute, useRouter } from "vue-router";
import AppInput from "@/components/ui/form/app-input/AppInput.vue";
import AppOverlay from "@/components/ui/app-overlay/AppOverlay.vue";
import { computed, reactive, ref } from "vue";
import { UserDataType } from "@/modules/user/user.types";
import AppForm from "@/components/ui/form/app-form/AppForm.vue";
import { ValidationType } from "@/components/ui/form/app-form/app-form.type";
import { useCommonStore } from "@/stores/common.store";
import { useUserStore } from "@/modules/user/user.store";
import AppSelect from "@/components/ui/form/app-select/AppSelect.vue";
import AppDatePicker from "@/components/ui/form/app-date-picker/AppDatePicker.vue";
import { getStatusText } from "@/utils/helper";

const route = useRoute();

const method = computed(() => route.meta.method ?? "");

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
};

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
    <AppOverlay
        :rounded="24"
        parent-class-name="mt-6 rounded-3xl p-6 border border-pastel-blue"
        class="min-h-[60vh] flex flex-col justify-between"
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
            v-model="form.password"
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
    </AppOverlay>
    <div class="flex items-center justify-between mt-6 gap-x-10">
      <ElButton
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