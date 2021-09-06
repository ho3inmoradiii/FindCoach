<template>
    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="firstname">نام</label>
            <input type="text" id="firstname" v-model.trim="firstName">
        </div>
        <div class="form-control">
            <label for="lastname">نام خانوادگی</label>
            <input type="text" id="lastname" v-model.trim="lastName">
        </div>
        <div class="form-control">
            <label for="description">توضیحات</label>
            <textarea id="description" rows="5" v-model.trim="description"></textarea>
        </div>
        <div class="form-control">
            <label for="rate">هزینه تدریس</label>
            <input type="number" id="rate" v-model.number="rate">
        </div>
        <div class="form-control">
            <h3>زمینه های تخصصی تان را تیک بزنید</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas">
                <label for="frontend">Frontend development</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="areas">
                <label for="backend">Backend development</label>
            </div>
            <div>
                <input type="checkbox" id="fullstack" value="fullstack" v-model="areas">
                <label for="fullstack">Fullstack development</label>
            </div>
        </div>
        <the-button>ثبت نام</the-button>
    </form>
</template>
<script>
    export default {
        data(){
            return{
                firstName:'',
                lastName:'',
                description:'',
                rate:null,
                areas:[]
            }
        },
        methods:{
            submitForm(){
                const newCoach = {
                    first : this.firstName,
                    last : this.lastName,
                    desc:this.description,
                    rate:this.rate,
                    areas:this.areas,
                }
                console.log(newCoach);
            }
        }
    }
</script>