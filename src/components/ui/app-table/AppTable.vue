<script
    setup
    lang="ts"
>

import { AppTablePropsType } from "@/components/ui/app-table/app-table.types";
import { useSlots } from "vue";

const props = withDefaults(defineProps<AppTablePropsType>(), {
  emptyText: "Нет информации",
  columns: [],
  data: [],
  itemClass: ""
});

const emit = defineEmits<{
  currentChange: [value: any]
}>();

const currentChange = (value: any) => {
  console.log(value);
  emit("currentChange", value);
};


const slots = useSlots();

</script>

<template>
  <ElTable
      v-loading="loading"
      :data
      :empty-text
      highlight-current-row
      @current-change="currentChange"
      class="app-table"
  >
    <ElTableColumn
        v-for="column in columns"
        :key="column.prop"
        :label="column.label"
        :column="column"
        :align="column.align"
        :width="column.width"
    >
      <template #default="{$index, row}">
        <div :class="['app-table__item', itemClass]">
          <template v-if="column.prop === 'idx'">
            {{ $index + 1 }}
          </template>
          <slot
              v-else-if="slots[column.prop]"
              :name="column.prop"
              v-bind="{$index, row}"
          />
          <template v-else-if="!slots[column.prop]">
            {{ row[column.prop] || "-" }}
          </template>
        </div>
        <slot/>
      </template>
    </ElTableColumn>
  </ElTable>
</template>

<style lang="scss">
.app-table {
  thead tr > th {
    border-top: var(--el-table-border);
    background-color: var(--light-periwinkle) !important;
    padding: 14px 16px !important;

    @apply first:rounded-tl-2xl last:rounded-tr-2xl;
  }

  tr {
    & > th:first-of-type, td:first-of-type {
      border-left: var(--el-table-border) !important;
    }

    & > th:last-of-type, td:last-of-type {
      border-right: var(--el-table-border) !important;
    }
  }

  tbody tr:last-of-type td {
    @apply first:rounded-bl-2xl last:rounded-br-2xl;
  }

  .el-table__inner-wrapper:before {
    display: none;
  }

  .el-table__empty-block {
    border: var(--el-table-border);
    border-top: 0;
    @apply rounded-b-2xl;
  }
}
</style>