import { atom } from "recoil";

export const cartItem = atom({
    key: "cartItem",
    default: [
        {
            image: "https://cleverads.vn/blog/wp-content/uploads/2023/10/thi-truong-healthy-food-1.jpg",
            name: "food1",
            price: 10,
            amount: 2,
        },
        {
            image: "https://cleverads.vn/blog/wp-content/uploads/2023/10/thi-truong-healthy-food-1.jpg",
            name: "food1",
            price: 10,
            amount: 5,
        }
    ]
})

export const userInfor = atom({
    key: "userInfor",
    default: {}
})

export const isLogin = atom({
    key: "isLogin",
    default: false
})