<template>
    <base-dialog :show="!!error" title="یه مشکلی به وجود آمده است" @close="closeDialog">
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <the-button mode="outline" @click="loadCoaches">تازه سازی</the-button>
                <the-button link to="/register" v-if="!isCoach && !isLoading">ثبت نام به عنوان مدرس</the-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasCoaches">
                <coach-item
                        v-for="coach in listOfCoaches"
                        :key="coach.id"
                        :id="coach.id"
                        :firstName="coach.firstName"
                        :lastName="coach.lastName"
                        :hourlyRate="coach.hourlyRate"
                        :areas="coach.areas"
                ></coach-item>
            </ul>
            <h4 v-else>هیچ مربی هنوز ثبت نام نکرده است</h4>
        </base-card>
    </section>
</template>

<script>
    import CoachItem from './CoachItem';
    import CoachFilter from "./CoachFilter";
    import BaseSpinner from '../UI/BaseSpinner';
    import BaseDialog from "../UI/BaseDialog";
    export default {
        components:{BaseDialog, CoachItem,CoachFilter,BaseSpinner},
        data(){
            return{
                isLoading:false,
                error:null,
                activeFilters:{
                    frontend: true,
                    backend: true,
                    fullstack: true,
                }
            }
        },
        computed:{
            listOfCoaches(){
                const coaches = this.$store.getters.finalCoachesList;
                return coaches.filter(coach => {
                    if (this.activeFilters.frontend && coach.areas.includes('frontend')){
                        return true;
                    }
                    if (this.activeFilters.backend && coach.areas.includes('backend')){
                        return true;
                    }
                    if (this.activeFilters.fullstack && coach.areas.includes('fullstack')){
                        return true;
                    }
                    return false;
                })
            },
            hasCoaches(){
                return !this.isLoading && this.$store.getters.hasCoaches;
            },
            isCoach(){
                return this.$store.getters.isCoach;
            },
        },
        created() {
            this.loadCoaches();
        },
        methods:{
            setFilters(updatedFilters){
                this.activeFilters = updatedFilters;
            },
            async loadCoaches() {
                this.isLoading = true;
                try {
                    await this.$store.dispatch('loadCoaches');
                }catch (e) {
                    this.error = e.message || 'مشکلی توی دریافت داده رخ داده است اگه میتونی فیلتر شکنت رو روشن کن'
                }

                this.isLoading = false;
            },
            closeDialog(){
                this.error = null;
            }
        }
    }
</script>

<style scoped>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .controls {
        display: flex;
        justify-content: space-between;
    }
</style>