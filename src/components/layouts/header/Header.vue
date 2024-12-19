<script
		setup
		lang="ts"
>

import HeaderUser from "@/components/layouts/header-user/HeaderUser.vue";
import AppInput from "@/components/ui/form/app-input/AppInput.vue";
import {computed, useTemplateRef, watch} from "vue";

const emit = defineEmits<{
    changeHeight: [value: number]
}>();

const header = useTemplateRef<HTMLElement>("header");

const headerHeight = computed<number>(() => {
    if (!header.value) return 0;

    return header.value.offsetHeight;
});

watch(headerHeight, (newValue) => {
    emit("changeHeight", newValue);
}, {immediate: true})

</script>

<template>
  <header
		  ref="header"
		  class="header bg-white fixed z-10 top-0 right-0 px-6 py-4"
  >
	  <div class="container pb-4 border-b border-white-gray flex justify-between">
		  <AppInput
				  size="large"
				  class="header__input"
				  custom-type="search"
				  rounded="lg"
		  />
			<HeaderUser/>
	  </div>
  </header>
</template>

<style
		lang="scss"
>
	.header {

    &__input {
      @apply w-[40%];

      .el-input__wrapper {
        border-radius: 16px;
        background-color: var(--light-periwinkle);
      }
    }
  }
</style>