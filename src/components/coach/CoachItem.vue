<template>
    <li>
        <div class="name-rate">
            <h3>{{ fullName }}</h3>
            <h4>{{ hourlyRate }}تومان\ساعت</h4>
        </div>
        <div class="badges">
            <base-badge v-for="area in areas" :key="area" :type="area" :title="area">{{ area }}</base-badge>
        </div>
        <div class="actions">
            <the-button link mode="outline" :to="coachContactLink">ارتباط با مدرس</the-button>
            <the-button link :to="coachDetailLink">اطلاعات مدرس</the-button>
        </div>
    </li>
</template>

<script>
    export default {
        props:['id','firstName','lastName','hourlyRate','areas'],
        computed:{
            fullName(){
                return this.firstName + ' ' + this.lastName;
            },
            coachContactLink(){
                return '/coaches/' + this.id + '/contact';
            },
            coachDetailLink(){
                return '/coaches/' + this.id;
            }
        }
    }
</script>

<style scoped>
    li {
        margin: 1rem 0;
        border: 1px solid #424242;
        border-radius: 12px;
        padding: 1rem;
    }

    h3 {
        font-size: 1.5rem;
        text-align: right;
    }

    h3,
    h4 {
        margin: 0.5rem 0;
    }

    div {
        margin: 0.5rem 0;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
    }
    .badges{
        text-align: right;
    }

    .name-rate{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        direction: rtl;
    }
</style>