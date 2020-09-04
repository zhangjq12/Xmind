<template>
    <div class="container" style="padding-top: 80px;">
        <b-table hover :items="disp" :fields="fields">
        </b-table>
    </div>
</template>

<script>
import axios from 'axios'
// import navbar from './navbar'
export default {
  name: 'bills',
  data () {
    return {
      selected: 'all',
      fields: [{
        key: 'type',
        label: '账单类型',
        sortable: true
      },
      {
        key: 'time',
        label: '账单时间',
        sortable: true
      },
      {
        key: 'category',
        label: '账单分类',
        sortable: false
      },
      {
        key: 'amount',
        label: '账单金额',
        sortable: true
      }],
      income: 0,
      outcome: 0
    }
  },
  computed: {
    disp () {
      var items = this.$store.state.items
      this.incomeCount()
      this.outcomeCount()
      return items
    }
  },
  methods: {
    incomeCount () {
      var sum = 0.00
      for (var c of this.$store.state.items) {
        if (c.type === '收入') {
          sum += parseFloat(c.amount)
        }
      }
      this.income = sum
      this.$store.commit('income', this.income)
      // navbar.method.incomeChange()
    },
    outcomeCount () {
      var sum = 0.00
      for (var c of this.$store.state.items) {
        if (c.type === '支出') {
          sum += parseFloat(c.amount)
        }
      }
      this.outcome = sum
      this.$store.commit('outcome', this.outcome)
      // navbar.method.outcomeChange()
    }
  },
  mounted () {
    axios.get('http://localhost:8081/api/bills').then(Response => {
      var datas = Response.data.table
      var items = datas
      this.$store.commit('items', items)
      this.$store.commit('datas', datas)
      this.incomeCount()
      this.outcomeCount()
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
