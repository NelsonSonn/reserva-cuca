import {createRouter,createWebHistory}from"vue-router";
import TopicHome from "@/components/TopicHome.vue";
import UserList from "@/components/UserList.vue";
import UserForm from "@/components/UserForm.vue";

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

    }
]
const router=createRouter({
    history:createWebHistory(),
    routes
});
export default router;