import {createRouter,createWebHistory}from"vue-router";
import TopicHome from "@/components/TopicHome.vue";
import UserList from "@/components/UserList.vue";
import UserForm from "@/components/UserForm.vue";
import HomePage from "@/components/HomePage.vue";
import LoginUser from "@/components/LoginUser.vue";
import RegisterUser from "@/components/RegisterUser.vue";
import Menu from "@/components/Menu.vue";
import MenuItem from "@/components/MenuItem.vue";
import AgendaRoom from "@/components/AgendaRoom.vue";
import ReserveRoom from "@/components/ReserveRoom.vue";


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
        path:'/topichome',
        name:'TopicHome',
        component:TopicHome,
        props: true

    },{
        path:'/userform',
        name:'UserForm',
        component:UserForm,
        props: true
    },{
        path:'/userlist',
        name:'UserList',
        component:UserList,
        props: true
    },{
        path:'/side',
        name:'Menu',
        component:Menu,
        props: true
    },{
        path:'/sideitem',
        name:'MenuItem',
        component:MenuItem,
        props: true

    },
    {
        path: '/homepage',
        name: 'HomePage',
        component:HomePage,
        props: true
    },{
        path: '/agendaRoom',
        name: 'AgendaRoom',
        component:AgendaRoom,
        props: true
    },{
        path: '/reserve',
        name: 'ReserveRoom',
        component:ReserveRoom,
        props: true
    },
]
const router=createRouter({
    history:createWebHistory(),
    routes
});
export default router;