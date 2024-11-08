import {createRouter,createWebHistory}from"vue-router";
import CalendarUser from "@/components/CalendarUser.vue";
import UserForm from "@/components/UserForm.vue";
import LoginUser from "@/components/LoginUser.vue";
import RegisterUser from "@/components/RegisterUser.vue";


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
        path:'/userform',
        name:'UserForm',
        component:UserForm,
        props: true
    },{
        path:'/calendar',
        name:'CalendarUser',
        component:CalendarUser,
        props: true
    }
]
const router=createRouter({
    history:createWebHistory(),
    routes
});
export default router;