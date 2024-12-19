<script
		setup
		lang="ts"
>

import {useAuthStore} from "@/modules/auth/auth.store";
import {computed, ref, useTemplateRef} from "vue";
import Avatar from "@/assets/images/avatar.png"
import AppIcon from "@/components/ui/app-icon/AppIcon.vue";

const authStore = useAuthStore();

const dropdown = useTemplateRef<any>("dropdown");

const userImg = computed(() => authStore.user?.avatar ?? Avatar);

const dropdownOpen = ref(false);

const closeDropdown = () => {
    dropdown.value?.handleClose();
    dropdownOpen.value = false;
};

</script>

<template>
  <ElDropdown
		  trigger="click"
		  :hide-on-click="false"
		  ref="dropdown"
		  placement="bottom-start"
		  teleported
		  tabindex="10"
		  popper-class="!rounded-2xl bg-white border !border-white-gray overflow-hidden"
		  @visible-change="(value:boolean) => dropdownOpen = value"
  >
		<div :class="['flex items-center gap-3', {'w-[200px]' : authStore.userLoading}]">
			<img
					:src="userImg"
					:alt="authStore.user?.username ?? 'avatar'"
					class="size-10 object-contain rounded-full"
			/>
			<div class="text-sm flex flex-col">
				<div class="flex  justify-between gap-x-3">
					 <strong class="font-medium text-dark">
            {{
	            authStore.user?.username ?? "-"
            }}
          </strong>
					<AppIcon
							icon="arrow"
							:class="['w-1.5 h-2.5 arrow-top mt-1 transition duration-200 ease-in', {'arrow-bottom': dropdownOpen}]"
					/>
				</div>
				<span class="text-soft-gray">
					{{
						authStore.user?.role ?? "-"
					}}
				</span>
			</div>
		</div>
  <template #dropdown>
	  <div class="w-[300px] px-3 py-4 bg-white">
	  <div class="flex items-center gap-x-2 ">
        <img
		        :src="userImg"
		        :alt="authStore.user?.username ?? 'avatar'"
		        class="size-10 object-contain rounded-full"
        />
	    <div class="mt-2 text-center flex flex-col gap-y-1">
				<strong class="font-medium text-dark mx-auto">
						{{
							authStore.user?.username ?? "-"
						}}
				</strong>
	      <span class="text-soft-gray">
	          {{
		          authStore.user?.role ?? "-"
	          }}
	      </span>
	  </div>
	  </div>
	  <div class="flex flex-col gap-y-2 mt-3">
			<button
					@click="authStore.logout"
					class="px-3 py-2.5 w-full flex gap-x-3 rounded-lg transition duration-200 ease-in hover:shadow-[0px_1.5px_4px_-1px_#0A090B12]"
			>
				<AppIcon
						icon="logout"
						class="size-5"
				/>
				<span class="text-sm font-medium text-red">
					Выход
				</span>
			</button>
	  </div>
	  </div>
  </template>
  </ElDropdown>
</template>