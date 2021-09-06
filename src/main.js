import { createApp } from 'vue';
import {createRouter,createWebHistory} from "vue-router";
import {createStore} from 'vuex';

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

const store = createStore({
    state(){
        return{
            coaches:[
                {
                    id: 'c1',
                    firstName: 'Maximilian',
                    lastName: 'Schwarzmüller',
                    areas: ['frontend', 'backend', 'career'],
                    description:
                        "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                    hourlyRate: 30
                },
                {
                    id: 'c2',
                    firstName: 'Julie',
                    lastName: 'Jones',
                    areas: ['frontend', 'career'],
                    description:
                        'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                    hourlyRate: 30
                }
            ]
        }
    },
    getters:{
        finalCoachesList(state){
            return state.coaches;
        },
        hasCoaches(state){
            return state.coaches && state.coaches.length>0;
        }
    }
})

const app = createApp(App)

app.use(router);
app.use(store);

app.mount('#app');
