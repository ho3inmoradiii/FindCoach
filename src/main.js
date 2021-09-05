import { createApp } from 'vue';
import {createRouter,createWebHistory} from "vue-router";

import App from './App';
import CoachList from './components/coach/CoachesList';
import RequestList from './components/request/RequestsList';

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',redirect:'/coaches'},
        {path:'/coaches',component:CoachList},
        {
            path:'/coaches/:id',
            component:null,
            children:[
                {path:'contact',component:null}
            ]
        },
        {path:'/register',component:null},
        {path:'/requests',component:RequestList},
        {path:'/:notFound(.*)',component:null}
    ]
})

const app = createApp(App)

app.use(router);

app.mount('#app');
