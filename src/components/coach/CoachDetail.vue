<template>
   <section>
       <base-card>
           <div class="name-rate">
               <h2>{{ fullName }}</h2>
               <h3>{{ rate }}تومان\ساعت</h3>
           </div>
       </base-card>
   </section>
    <section>
        <base-card>
            <header>
                <h2 class="textRight">برای ارتباط با این مدرس کلیک کنید</h2>
                <the-button link :to="contactLink">ارتباط</the-button>
            </header>
            <router-view></router-view>
        </base-card>
    </section>
    <section>
        <base-card>
            <div class="textRight">
                <base-badge v-for="area in areas" :key="area" :type="area" :title="area">{{ area }}</base-badge>
            </div>
            <p class="textRight dirRTL">{{ description }}</p>
        </base-card>
    </section>
</template>

<script>
    import TheButton from "../UI/TheButton";
    export default {
        components: {TheButton},
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

<style scoped>
    header{
        display: flex;
        justify-content: space-between;
        direction: rtl;
        line-height: 0;
    }

    header a{
        width: 100px;
        height: 40px;
        text-align: center;
        line-height: 17px;
    }

    .textRight{
        text-align: right;
    }

    .name-rate{
        display: flex;
        justify-content: space-between;
        direction: rtl;
    }

    .dirRTL{
        direction: rtl;
    }
</style>