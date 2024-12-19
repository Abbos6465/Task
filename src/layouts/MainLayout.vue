<script
		setup
		lang="ts"
>
import {useAuthStore} from "@/modules/auth/auth.store";
import {computed, onMounted, ref} from "vue";
import Header from "@/components/layouts/header/Header.vue";
import NavDraver from "@/components/layouts/nav-draver/NavDraver.vue";
import {NavListLinkType} from "@/components/layouts/nav-draver/nav-draver.types";

const authStore = useAuthStore();


const headerHeight = ref<number>(0);
const navDrawerWidth = ref<number>(0);

onMounted(() => {
    authStore.fetchUser();
});

const items = computed<NavListLinkType[]>(() => {
    return [
        {
            title: "Пользователи",
            value: "user",
            icon: "users"
        },
        {
            title: "Страны",
            value: "country",
            icon: "location"
        }
    ]
})

</script>

<template>
    <div>
	    <Header
			    :style="`width: calc(100% - ${navDrawerWidth}px);`"
			    class="transition-all duration-200"
			    @changeHeight="height => headerHeight = height"
	    />
	    <NavDraver
			    @changeWidth="width => navDrawerWidth = width"
			    :items
	    />
	    <div
			    class="ml-auto px-6 transition-all duration-200"
			    :style="`margin-top: ${headerHeight}px; width:calc(100% - ${navDrawerWidth}px);`"
	    >
	    <div class="container">
		    <RouterView/>
	    </div>
	    </div>
    </div>
</template>
