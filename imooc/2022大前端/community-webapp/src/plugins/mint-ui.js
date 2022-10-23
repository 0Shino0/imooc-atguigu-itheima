import Vue from 'vue'
import {
  Button,
  Cell,
  Header,
  Loadmore,
  Spinner,
  Toast,
  InfiniteScroll,
  Field,
  Actionsheet,
  Indicator,
  Popup,
  Picker
} from 'mint-ui'

Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Header.name, Header)
Vue.component(Field.name, Field)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Popup.name, Popup)
Vue.component(Picker.name, Picker)

Vue.prototype.$Toast = Toast
Vue.prototype.$Loading = {
  show (msg) {
    Indicator.open({
      text: msg || '加载中...', // 文字
      spinnerType: 'fading-circle' // 样式
    })
  },
  close () {
    Indicator.close()
  }
}
