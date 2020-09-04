<template>
    <div>
        <b-navbar fixed="top" toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#">
            <img src="./../assets/logo.png" style="width: 50px; height: 50px;" alt="logo">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
            <b-nav-item disabled>总收入：{{income}} 元</b-nav-item>
            <b-nav-item disabled>总支出：{{outcome}} 元</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-select v-model="selectedMonths" :options="optionsMonths" @change="selectMonth($event)"></b-form-select>
                    <b-button class="primary" v-b-modal.modifyModal>创建新账单</b-button>
                    <b-modal id="modifyModal" ref="modal" title="添加账单" @show="resetModal" @hidden="resetModal" @ok="handleOk">
                        <form ref="form" @submit.stop.prevent="handleSubmit">
                            <b-form-group :state="timeState" label="账单时间" label-for="time-input" invalid-feedback="账单时间必填！">
                            <b-form-input id="time-input" v-model="time" :state="timeState" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="账单分类" label-for="category-input">
                            <b-form-select v-model="selectedCategory" :options="optionsCategory" id="category-input"></b-form-select>
                            </b-form-group>
                            <b-form-group :state="amountState" label="账单金额" label-for="amount-input" invalid-feedback="账单金额必填！">
                            <b-form-input id="amount-input" v-model="amount" :state="amountState" onkeyPress="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d\d$/.test(value))event.returnValue=false" required></b-form-input>
                            </b-form-group>
                        </form>
                    </b-modal>
                </b-nav-form>
            </b-navbar-nav>
        </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
// import bills from './bills'
import axios from 'axios'
export default {
  name: 'Navbar',
  data () {
    return {
      selectedMonths: 'all',
      optionsMonths: [
        {value: 'all', text: '全部月份'},
        {value: '0', text: '一月'},
        {value: '1', text: '二月'},
        {value: '2', text: '三月'},
        {value: '3', text: '四月'},
        {value: '4', text: '五月'},
        {value: '5', text: '六月'},
        {value: '6', text: '七月'},
        {value: '7', text: '八月'},
        {value: '8', text: '九月'},
        {value: '9', text: '十月'},
        {value: '10', text: '十一月'},
        {value: '11', text: '十二月'}
      ],
      selectedCategory: '1bcddudhmh',
      optionsCategory: [
        {value: '1bcddudhmh', text: '车贷'},
        {value: 'hc5g66kviq', text: '车辆保养'},
        {value: '8s0p77c323', text: '房贷'},
        {value: '0fnhbcle6hg', text: '房屋租赁'},
        {value: 'odrjk823mj8', text: '家庭用品'},
        {value: 'bsn20th0k2o', text: '交通'},
        {value: 'j1h1nohhmmo', text: '旅游'},
        {value: '3tqndrjqgrg', text: '日常饮食'},
        {value: 's73ijpispio', text: '工资'},
        {value: '1vjj47vpd28', text: '股票投资'},
        {value: '5il79e11628', text: '基金投资'}
      ],
      time: '',
      amount: ''
    }
  },
  computed: {
    income () {
      return parseFloat(this.$store.state.income).toFixed(2)
    },
    outcome () {
      return parseFloat(this.$store.state.outcome).toFixed(2)
    },
    timeState () {
      return this.time.length !== 0
    },
    amountState () {
      return this.amount.length !== 0
    }
  },
  methods: {
    selectMonth: function (event) {
      var datas = this.$store.state.datas
      var items = []
      for (var c of datas) {
        var time = new Date(c['time'])
        if (this.selectedMonths !== 'all' && time.getMonth() === parseInt(this.selectedMonths)) {
          items.push(c)
        } else
        if (this.selectedMonths === 'all') {
          items.push(c)
        }
      }
      this.$store.commit('items', items)
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      // console.log(valid)
      // this.nameState = valid
      return valid
    },
    resetModal () {
      // this.type = ''
      // this.typeState = null
      this.time = ''
      // this.timeState = null
      // this.category = ''
      // this.categoryState = null
      this.amount = ''
      // this.amountState = null
    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      if (!this.checkFormValidity()) {
        return
      }
      var uploadData = {time: this.time, category: this.selectedCategory, amount: this.amount}
      axios.post('http://localhost:8081/api/addbills', uploadData)
        .then(function (res) {
          window.location.href = '/'
        })
        .catch(function (e) {
          console.log(e)
        })
      this.$nextTick(() => {
        this.$bvModal.hide('modifyModal')
      })
    }
  }
}
</script>
