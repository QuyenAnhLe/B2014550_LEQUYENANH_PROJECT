import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";

import EmployeeLogin from "@/views/employee/EmployeeLogin.vue";
import EmployeeHome from "@/views/employee/EmployeeHome.vue";
import EmployeeBook from "@/views/employee/EmployeeBook.vue";
import EmployeePublisher from "@/views/employee/EmployeePublisher.vue";

import ReaderLogin from "@/views/reader/ReaderLogin.vue";
import ReaderRegister from "@/views/reader/ReaderRegister.vue";
import ReaderHome from "@/views/reader/ReaderHome.vue";

import BookEdit from "@/views/book/BookEdit.vue";
import BookAdd from "@/views/book/BookAdd.vue";

import PublisherAdd from "@/views/publisher/PublisherAdd.vue";
import PublisherEdit from "@/views/publisher/PublisherEdit.vue";


const routes = [
    {
        path: "/",
        name: "homepage",
        component: HomePage,
    },
    {
        path: "/employee/login",
        name: "employee.login",
        component: EmployeeLogin,
    },
    {
        path: "/reader/login",
        name: "reader.login",
        component: ReaderLogin,
    },
    {
        path: "/reader/register",
        name: "reader.register",
        component: ReaderRegister,
    },
    {
        path: "/reader/readerhome",
        name: "reader.readerhome",
        component: ReaderHome,
    },
    {
        path: "/employee/employeehome",
        name: "employee.employeehome",
        component: EmployeeHome,
    },
    {
        path: "/employee/employeehome",
        name: "employee.employeehome",
        component: EmployeeHome,
    },
    {
        path: "/employee/employeebook",
        name: "employee.employeebook",
        component: EmployeeBook,
    },
    {
        path: "/employee/employeepublisher",
        name: "employee.employeepublisher",
        component: EmployeePublisher,
    },
    {
        path: "/book/bookedit/:id",
        name: "book.bookedit",
        component: BookEdit,
        props: true 
    },
    {
        path: "/book/bookadd",
        name: "book.bookadd",
        component: BookAdd,
    },
    {
        path: "/publisher/publisheradd",
        name: "publisher.publisheradd",
        component: PublisherAdd,
    },
    {
        path: "/publisher/publisheredit/:id",
        name: "publisher.publisheredit",
        component: PublisherEdit,
        props: true 
    }

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;