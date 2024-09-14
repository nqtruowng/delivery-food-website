import Home from '../pages/Home/Home'
import Cart from '../pages/Cart/Cart'
import PlaceOrder from '../pages/PlaceOrder/PlaceOrder'
import Menu from '../pages/Menu/Menu'
import MobileApp from  '../pages/MobileApp/MobileApp'
import Contact from '../pages/ContactUs/Contact'

export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/order', component: PlaceOrder },
    { path: '/menu', component: Menu},
    { path: '/mobile-app', component: MobileApp},
    { path: '/contact-us', component: Contact}
]