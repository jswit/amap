import Vue from 'vue'
import Amap from './test/Amap.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Amap),
  // render: h => h(),
}).$mount('#app')
