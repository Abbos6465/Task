<script
    setup
    lang="ts"
>
import AppBreadcrumb from "@/components/ui/app-breadcrumb/AppBreadcrumb.vue";
import { useRoute } from "vue-router";

const route = useRoute();

</script>

<template>
  <section>
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
  </section>
</template>

<style lang="scss">

</style>