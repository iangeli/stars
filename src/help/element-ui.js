import Vue from 'vue'
import {
  Tag,
  Input,
  Button,
  Popover,
  Autocomplete,
  Notification,
  RadioGroup,
  RadioButton,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Dialog,
  Switch,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Table,
  TableColumn
} from 'element-ui'

Vue.use(Tag)
Vue.use(Input)
Vue.use(Button)
Vue.use(Popover)
Vue.use(Autocomplete)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)

Vue.prototype.$notify = Notification
