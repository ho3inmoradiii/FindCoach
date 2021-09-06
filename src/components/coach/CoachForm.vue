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
            <div class="checkboxDiv">
                <label for="frontend">Frontend development</label>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas">
            </div>
            <div class="checkboxDiv">
                <label for="backend">Backend development</label>
                <input type="checkbox" id="backend" value="backend" v-model="areas">
            </div>
            <div class="checkboxDiv">
                <label for="fullstack">Fullstack development</label>
                <input type="checkbox" id="fullstack" value="fullstack" v-model="areas">
            </div>
        </div>
        <the-button>ثبت نام</the-button>
    </form>
</template>
<script>
    export default {
        emits:['save-coach'],
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
                this.$store.dispatch('registerCoach',newCoach);
                this.$router.replace('/coaches')
            }
        }
    }
</script>

<style scoped>
    .form-control {
        margin: 0.5rem 0;
        text-align: right;
    }

    label {
        font-weight: bold;
        display: block;
        margin-bottom: 0.5rem;
    }

    input[type='checkbox'] + label {
        font-weight: normal;
        display: inline;
        margin: 0 0 0 0.5rem;
    }

    input,
    textarea {
        display: block;
        width: 100%;
        border: 1px solid #ccc;
        font: inherit;
        text-align: right;
    }

    input:focus,
    textarea:focus {
        background-color: #f0e6fd;
        outline: none;
        border-color: #3d008d;
    }

    .checkboxDiv{
        position: relative;
    }

    .checkboxDiv input{
        position: absolute;
        top: 0;
        right: -100px;
    }
</style>