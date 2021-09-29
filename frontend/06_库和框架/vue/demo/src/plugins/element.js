import Vue from 'vue'
import {
  Container,
  Header,
  Aside,
  Main,
  Form,
  FormItem,
  Input,
  CheckboxGroup,
  Checkbox,
  Button,
  Image,
  Loading,
  MessageBox,
  Message,
  Notification,
  Menu,
  MenuItem,
  // PageHeader,
  Table,
  TableColumn,
  Pagination,
  Radio,
  Dialog,
  Submenu,
  RadioGroup,
  RadioButton
} from 'element-ui'
// TODO 样式可以不用全部引入
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(Image)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
// Vue.use(PageHeader)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Radio)
Vue.use(Dialog)
Vue.use(Loading)
Vue.use(Submenu)
Vue.use(RadioGroup)
Vue.use(RadioButton)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
