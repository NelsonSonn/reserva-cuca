import {createRouter,createWebHistory}from"vue-router";
import CalendarUser from "@/components/CalendarUser.vue";
import LoginUser from "@/components/LoginUser.vue";
import RegisterUser from "@/components/RegisterUser.vue";
import RegisterRoom from "../components/RegisterRoom.vue";

const routes=[
    {
        path:'/',
        name:'LoginUser',
        component:LoginUser,
        props: true
    },{
        path:'/register',
        name:'RegisterUser',
        component:RegisterUser,
        props: true
    },{
        path:'/calendar',
        name:'CalendarUser',
        component:CalendarUser,
        props: true
    },{
        path:'/registerroom',
        name:'RegisterRoom',
        component:RegisterRoom,
        props: true
    }
]
const router=createRouter({
    history:createWebHistory(),
    routes
});
export default router;