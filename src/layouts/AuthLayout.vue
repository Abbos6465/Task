<script
		setup
		lang="ts"
>
import {ElCard} from "element-plus";
import {useRoute} from "vue-router";

const route = useRoute();

</script>

<template>
  <div class="auth-layout flex mt-10 items-center justify-center min-h-[75vh]">
    <div>
      <h6
		      class="mt-20 max-w-[832px] mx-auto text-center text-lg font-medium text-soft-gray"
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        maiores pariatur fuga dolorem in amet minima distinctio ipsam, beatae
        ratione accusantium atque aliquid quas accusamus aliquam mollitia, eaque
        totam corporis?
      </h6>
      <ElCard class="max-w-[496px] w-full mx-auto mt-12 !rounded-3xl pt-5 pb-16">
        <div class="mb-6">
          <h1
		          v-if="route.meta.title"
		          class="text-2xl font-semibold text-dark-gray text-center"
          >
            {{
	            route.meta.title
            }}
          </h1>
          <p
		          v-if="route.meta.description"
		          class="text-sm text-dark-gray text-center mt-1.5"
          >
            {{
	            route.meta.description
            }}
          </p>
        </div>
        <RouterView/>
      </ElCard>
    </div>
  </div>
</template>
