import Home from '../pages/Home/Home'
import Cart from '../pages/Cart/Cart'
import PlaceOrder from '../pages/PlaceOrder/PlaceOrder'
import Menu from '../pages/Menu/Menu'
import Contact from '../pages/ContactUs/Contact'
import Add from '../pages/Add/Add'
import Orders from '../pages/Orders/Orders'
import List from '../pages/List/List'
import MyOrder from '../pages/MyOrder/MyOrder'
import Support from '../pages/Support/Support'
import Analytics from '../pages/Analytics/Analytics'

import AdminLayout from  '../Layout/AdminLayout/AdminLayout'
import UserLayout from '../Layout/UserLayout/UserLayout'

export const publicRoutes = [
    { path: '/', component: Home, layout: UserLayout },
    { path: '/cart', component: Cart, layout: UserLayout },
    { path: '/placeorder', component: PlaceOrder, layout: UserLayout },
    { path: '/menu', component: Menu, layout: UserLayout },
    { path: '/contact-us', component: Contact, layout: UserLayout },
    { path: '/my-order', component: MyOrder, layout: UserLayout}
]

export const adminRoutes = [
    { path: '/admin/add', component: Add,  layout: AdminLayout},
    { path: '/admin/orders', component: Orders, layout: AdminLayout},
    { path: '/admin/list', component: List, layout: AdminLayout},
    { path: '/admin/support', component: Support, layout: AdminLayout},
    { path: '/admin/analytics', component: Analytics, layout: AdminLayout}
]