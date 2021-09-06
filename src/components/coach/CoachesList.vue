<template>
    <section>
        فیلتر
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
    export default {
        components:{CoachItem},
        computed:{
            listOfCoaches(){
                return this.$store.getters.finalCoachesList;
            },
            hasCoaches(){
                return this.$store.getters.hasCoaches;
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