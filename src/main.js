import { createApp } from 'vue';
import {createRouter,createWebHistory} from "vue-router";
import {createStore} from 'vuex';

import App from './App';
import BaseCard from './components/UI/BaseCard';
import TheButton from './components/UI/TheButton';
import BaseBadge from './components/UI/BaseBadge';
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
            props:true,
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
            userId:'c3',
            coaches:[
                {
                    id: 'c1',
                    firstName: 'Maximilian',
                    lastName: 'Schwarzmüller',
                    areas: ['frontend', 'backend', 'fullstack'],
                    description:
                        "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                    hourlyRate: 30
                },
                {
                    id: 'c2',
                    firstName: 'Julie',
                    lastName: 'Jones',
                    areas: ['frontend', 'fullstack'],
                    description:
                        'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                    hourlyRate: 30
                }
            ],
            requests:[]
        }
    },
    getters:{
        finalCoachesList(state){
            return state.coaches;
        },
        hasCoaches(state){
            return state.coaches && state.coaches.length>0;
        },
        userId(state){
            return state.userId;
        },
        isCoach(_,getters,_2,rootGetters){
            const coaches = getters.finalCoachesList;
            const userId = rootGetters.userId;
            return coaches.some(coach => coach.id === userId);
        },
        getRequests(state,_,_2,rootGetters){
            const coachId = rootGetters.userId;
            console.log(coachId);
            return state.requests.filter(request => request.coachId === coachId);
        },
        hasRequests(_,getters){
            return getters.getRequests && getters.getRequests.length > 0;
        }
    },
    mutations:{
        registerCoach(state,payload){
            state.coaches.push(payload);
        },
        sendMessage(state,payload){
            state.requests.push(payload);
        }
    },
    actions:{
        registerCoach(context,payload){
            const coachData = {
                id:context.rootGetters.userId,
                firstName: payload.first,
                lastName: payload.last,
                areas:payload.areas,
                hourlyRate:payload.rate,
                description:payload.desc,
            };
            context.commit('registerCoach',coachData);
        },
        sendMessage(context,payload){
            const newReq = {
                id:new Date().toISOString(),
                coachId:payload.coachId,
                email:payload.email,
                message:payload.message,
            }
            context.commit('sendMessage',newReq);
        }
    }
})

const app = createApp(App)

app.use(router);
app.use(store);

app.component('base-card',BaseCard);
app.component('base-badge',BaseBadge);
app.component('the-button',TheButton);

app.mount('#app');
