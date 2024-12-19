<script
    setup
    lang="ts"
>

import { AppPaginationPropsType } from "@/components/ui/app-pagination/app-pagination.types";

const offset = defineModel<number>({
  default: 0
});

const props = withDefaults(defineProps<AppPaginationPropsType>(), {
  count: 0,
  limit: 0
});

const currentChange = (value: number) => {
  offset.value = value - 1;
};

</script>

<template>
  <div
      v-show="count>limit"
      class="app-pagination flex items-center justify-between mt-6"
  >
    <p class="text-cool-gray text-sm">
      {{ limit }}
      Показано {{ offset + 1 }}–{{ offset + limit + 1 }} из {{ count }} результатов
    </p>
    <ElPagination
        @current-change="currentChange"
        class="float-right"
        background
        layout="prev, pager, next"
        :page-size="limit"
        :total="count"
    />
  </div>
</template>

<style lang="scss">
.app-pagination {

  .el-pagination {
    --el-pagination-border-radius: 4px;
  }

  & > p {
    margin: 0;
  }
}
</style>