import { createApp } from 'vue';
import {createRouter,createWebHistory} from "vue-router";

import App from './App';
import CoachList from './components/coach/CoachesList';
import RequestList from './components/request/RequestsList';
import CoachDetail from './components/coach/CoachDetail';
import CoachRegistration from './components/coach/CoachRegistration';
import ContactCoach from './components/request/ContactCoach';
import NotFound from './components/UI/NotFound';

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',redirect:'/coaches'},
        {path:'/coaches',component:CoachList},
        {
            path:'/coaches/:id',
            component:CoachDetail,
            children:[
                {path:'contact',component:ContactCoach}
            ]
        },
        {path:'/register',component:CoachRegistration},
        {path:'/requests',component:RequestList},
        {path:'/:notFound(.*)',component:NotFound}
    ]
})

const app = createApp(App)

app.use(router);

app.mount('#app');
