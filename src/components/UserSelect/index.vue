<script lang="ts" setup>
import { reactive, watch } from 'vue';
import debounce from 'lodash/debounce';
import unionBy from 'lodash/unionBy';
import { getEmployeeList } from '@/api/employee';
import { Employee } from '@/entities/User';

const props = withDefaults(defineProps<{ value?: string[]; initialOptions?: Employee[]; debounceTime?: number }>(), {
  value: () => [],
  initialOptions: undefined,
  debounceTime: 300,
});

defineEmits(['update:value']);

let lastFetchId = 0;

const state = reactive({
  data: props.initialOptions || [],
  fetching: false,
});

const fetchUser = debounce((value) => {
  lastFetchId += 1;
  const fetchId = lastFetchId;
  state.data = [];
  state.fetching = true;
  getEmployeeList({ pageNo: 1, pageSize: 20, keyWord: value })
    .then((data) => {
      if (fetchId !== lastFetchId) {
        return;
      }
      state.data = data.list;
      state.fetching = false;
    })
    .catch(() => {
      state.data = [];
      state.fetching = false;
    });
}, props.debounceTime);

watch(
  () => props.initialOptions,
  (newVal = []) => {
    state.data = unionBy([...state.data, ...newVal], 'adAccount');
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <a-select
    :value="value"
    mode="multiple"
    placeholder="请选择"
    :filter-option="false"
    :not-found-content="state.fetching ? undefined : null"
    :field-names="{ label: 'nickName', value: 'adAccount' }"
    :options="state.data"
    @search="fetchUser"
    @update:value="$emit('update:value', $event)"
  >
    <template v-if="state.fetching" #notFoundContent>
      <a-spin size="small" />
    </template>
  </a-select>
</template>
