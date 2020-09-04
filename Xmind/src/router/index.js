import Vue from 'vue'
import Router from 'vue-router'
import bills from '@/components/bills'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Bills',
      component: bills
    }
  ]
})
