<template>
    <base-card>
        <h2>هم اکنون به عنوان مدرس ثبت نام کنید</h2>
        <coach-form></coach-form>
    </base-card>
</template>

<script>
    import CoachForm from './CoachForm';
    export default {
        components:{CoachForm},
        methods:{
            // saveCoach(newCoach){
            //     this.$store.dispatch('registerCoach',newCoach)
            // }
        }
    }
</script>

<style scoped>
    h2{
        text-align: center;
    }
</style>