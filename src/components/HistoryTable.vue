<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ 'Amount' | localize }}</th>
        <th>{{ 'Date' | localize }}</th>
        <th>{{ 'Category' | localize }}</th>
        <th>{{ 'Type' | localize }}</th>
        <th>{{ 'Open' | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) in records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ record.amount | currency }}</td>
        <td>{{ record.date | date('datetime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]"
            >{{ record.typeText }}
          </span>
        </td>
        <td>
          <button
            v-tooltip="'Редактировать запись'"
            class="btn-small btn"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">create</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from '../filters/localize.filter'

export default {
  name: 'HistoryTable',
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
}
</script>

<style scoped></style>
