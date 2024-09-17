import {createRouter,createWebHistory}from"vue-router";
import TopicHome from "@/components/TopicHome.vue";
import UserList from "@/components/UserList.vue";
import UserForm from "@/components/UserForm.vue";
import HomePage from "@/components/HomePage.vue";


const routes=[
    {
        path:'/',
        name:'TopicHome',
        component:TopicHome,
        props: true

    },{
        path:'/userform',
        name:'UserForm',
        component:UserForm,
        props: true

    },
    {
        path:'/userlist',
        name:'UserList',
        component:UserList,
        props: true
    },
    {
        path: '/homepage',
        name: 'HomePage',
        component:HomePage,
        props: true
    },
]
const router=createRouter({
    history:createWebHistory(),
    routes
});
export default router;