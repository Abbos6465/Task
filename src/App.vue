<script
		setup
		lang="ts"
>

import {useRoute} from "vue-router";
import {computed} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

const route = useRoute();

const layout = computed(() => route.meta.layout);

const layouts = {
    MainLayout,
    AuthLayout
}

</script>

<template>
    <component
		    v-if="layout"
		    :is="layouts[layout]"
		    :key="layout"
    >
    <RouterView/>
  </component>

</template>