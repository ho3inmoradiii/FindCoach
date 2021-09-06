<template>
    <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <the-button mode="outline">تازه سازی</the-button>
                <the-button link to="/register">ثبت نام به عنوان مدرس</the-button>
            </div>
            <ul v-if="hasCoaches">
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
    export default {
        components:{CoachItem,CoachFilter},
        data(){
            return{
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
                return this.$store.getters.hasCoaches;
            }
        },
        methods:{
            setFilters(updatedFilters){
                this.activeFilters = updatedFilters;
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