<template>
   <section>
       <base-card>
           <h2>{{ fullName }}</h2>
           <h3>$ {{ rate }}/hour</h3>
       </base-card>

   </section>
    <section>
        <base-card>
            <header>
                <h2>برای ارتباط با این مدرس کلیک کنید</h2>
                <the-button link :to="contactLink">ارتباط</the-button>
            </header>
            <router-view></router-view>
        </base-card>
    </section>
    <section>
        <base-card>
            <base-badge v-for="area in areas" :key="area" :type="area" :title="area">{{ area }}</base-badge>
            <p>{{ description }}</p>
        </base-card>
    </section>
</template>

<script>
    export default {
        props:['id'],
        data(){
          return{
              selectedCoach:null
          }
        },
        computed:{
            contactLink(){
                return '/coaches/' + this.id + '/contact';
            },
            fullName() {
                return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
            },
            rate(){
                return this.selectedCoach.hourlyRate
            },
            areas(){
                return this.selectedCoach.areas
            },
            description(){
                return this.selectedCoach.description
            }
        },
        created() {
            this.selectedCoach = this.$store.getters.finalCoachesList.find((coach) => coach.id === this.id);
        }
    }
</script>