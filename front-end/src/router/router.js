import Home from '../pages/Home/Home'
import Cart from '../pages/Cart/Cart'
import PlaceOrder from '../pages/PlaceOrder/PlaceOrder'
import Menu from '../pages/Menu/Menu'
import MobileApp from  '../pages/MobileApp/MobileApp'
import Contact from '../pages/ContactUs/Contact'
import UserLayout from '../Layout/UserLayout/UserLayout'
import AdminLayout from  '../Layout/AdminLayout/AdminLayout'
import Add from '../pages/Add/Add'
import Orders from '../pages/Orders/Orders'
import List from '../pages/List/List'

export const publicRoutes = [
    { path: '/', component: Home, layout: UserLayout },
    { path: '/cart', component: Cart, layout: UserLayout },
    { path: '/order', component: PlaceOrder, layout: UserLayout },
    { path: '/menu', component: Menu, layout: UserLayout },
    { path: '/mobile-app', component: MobileApp, layout: UserLayout },
    { path: '/contact-us', component: Contact, layout: UserLayout }
]

export const adminRoutes = [
    { path: '/admin/add', component: Add,  layout: AdminLayout},
    { path: '/admin/orders', component: Orders, layout: AdminLayout},
    { path: '/admin/list', component: List, layout: AdminLayout}
]