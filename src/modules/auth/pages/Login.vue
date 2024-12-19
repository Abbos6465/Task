<script
    setup
    lang="ts"
>
import AppInput from "@/components/ui/form/app-input/AppInput.vue";
import AppForm from "@/components/ui/form/app-form/AppForm.vue";
import { reactive, ref } from "vue";
import { LoginDataType } from "@/modules/auth/auth.types";
import { useAuthStore } from "@/modules/auth/auth.store";
import { ValidationType } from "@/components/ui/form/app-form/app-form.type";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const authStore = useAuthStore();

const router = useRouter();

const form = reactive<LoginDataType>({
  username: "",
  password: ""
});

const v$ = ref<ValidationType | null>(null);

const sendForm = async () => {
  if (!v$.value) return;

  if (!(await v$.value.validate())) {
    return;
  }

  await authStore.login(form);
  await router.push("/");
  toast.success("Войти успешно");
};

</script>

<template>
  <AppForm
      :value="form"
      @validation="value => v$ = value"
      class="login"
  >
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
        label="Пароль"
        class="mt-5"
        required
        :min="3"
    />
    <ElButton
        @click="sendForm"
        type="primary"
        :loading="authStore.loginLoading"
        size="large"
        class="w-full mt-8"
    >
      Войти
    </ElButton>
  </AppForm>
</template>
