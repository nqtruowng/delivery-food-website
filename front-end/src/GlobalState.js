import { atom } from "recoil";

export const cartItem = atom({
    key: "cartItem",
    default: []
})

export const userInfor = atom({
    key: "userInfor",
    default: {}
})

export const isLogin = atom({
    key: "isLogin",
    default: false
})