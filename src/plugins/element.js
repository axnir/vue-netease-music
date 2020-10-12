import Vue from 'vue'
import {
  Button,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Input,
  Menu,
  Avatar,
  MenuItem,
  Dialog,
  Carousel,
  CarouselItem,
  Message,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Image
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Avatar)
Vue.use(MenuItem)
Vue.use(Dialog)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Image)
// message需要全局挂载
Vue.prototype.$message = Message
