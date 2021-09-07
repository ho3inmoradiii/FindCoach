<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalidDiv : !firstName.isValid }">
            <label for="firstname">نام</label>
            <input type="text" id="firstname" v-model.trim="firstName.val" @blur="clearValidity('firstName')">
            <p v-if="!firstName.isValid">نام نباید خالی باشد</p>
        </div>
        <div class="form-control" :class="{ invalidDiv : !lastName.isValid }">
            <label for="lastname">نام خانوادگی</label>
            <input type="text" id="lastname" v-model.trim="lastName.val" @blur="clearValidity('lastName')">
            <p v-if="!lastName.isValid">نام خانوادگی نباید خالی باشد</p>
        </div>
        <div class="form-control" :class="{ invalidDiv : !description.isValid }">
            <label for="description">توضیحات</label>
            <textarea id="description" rows="5" v-model.trim="description.val" @blur="clearValidity('description')"></textarea>
            <p v-if="!description.isValid">توضیحات نباید خالی باشد</p>
        </div>
        <div class="form-control" :class="{ invalidDiv : !rate.isValid }">
            <label for="rate">هزینه تدریس</label>
            <input type="number" id="rate" v-model.number="rate.val" @blur="clearValidity('rate')">
            <p v-if="!rate.isValid">هزینه تدریس نباید خالی باشد</p>
        </div>
        <div class="form-control">
            <h3>زمینه های تخصصی تان را تیک بزنید</h3>
            <div class="checkboxDiv" :class="{ invalidDiv : !areas.isValid }">
                <label for="frontend">Frontend development</label>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas.val" @blur="clearValidity('areas')">
            </div>
            <div class="checkboxDiv" :class="{ invalidDiv : !areas.isValid }">
                <label for="backend">Backend development</label>
                <input type="checkbox" id="backend" value="backend" v-model="areas.val" @blur="clearValidity('areas')">
            </div>
            <div class="checkboxDiv" :class="{ invalidDiv : !areas.isValid }">
                <label for="fullstack">Fullstack development</label>
                <input type="checkbox" id="fullstack" value="fullstack" v-model="areas.val" @blur="clearValidity('areas')">
            </div>
            <p v-if="!areas.isValid">زمینه های تخصصی نباید خالی باشد</p>
        </div>
        <p v-show="!formIsValid" class="text-right">ارور های موجود را رفع کنید سپس نسبت به تایید اقدام کنید</p>
        <the-button>ثبت نام</the-button>
    </form>
</template>
<script>
    export default {
        emits:['save-coach'],
        data(){
            return{
                firstName:{
                    val:'',
                    isValid:true
                },
                lastName:{
                    val:'',
                    isValid:true
                },
                description:{
                    val:'',
                    isValid:true
                },
                rate:{
                    val:null,
                    isValid:true
                },
                areas:{
                    val:[],
                    isValid:true
                },
                formIsValid:true
            }
        },
        methods:{
            clearValidity(input){
                this[input].isValid = true;
            },
            validateForm(){
                if (this.firstName.val === ''){
                    this.formIsValid = false;
                    this.firstName.isValid = false;
                }
                if (this.lastName.val === ''){
                    this.formIsValid = false;
                    this.lastName.isValid = false;
                }
                if (this.description.val === ''){
                    this.formIsValid = false;
                    this.description.isValid = false;
                }
                if (this.rate.val === null || this.rate.val < 0){
                    this.formIsValid = false;
                    this.rate.isValid = false;
                }
                if (this.areas.val.length === 0){
                    this.formIsValid = false;
                    this.areas.isValid = false;
                }
            },
            submitForm(){
                this.validateForm(); //زمانی که یه فانکشن خارجی تعریف کردیم و موقع سابمیت فرم میخوایم از اون استفاده کنیم

                console.log(this.rate);

                if (!this.formIsValid){
                    return;
                }

                const newCoach = {
                    first : this.firstName.val,
                    last : this.lastName.val,
                    desc:this.description.val,
                    rate:this.rate.val,
                    areas:this.areas.val,
                }
                this.$store.dispatch('registerCoach',newCoach);
                this.$router.replace('/coaches')
            }
        }
    }
</script>

<style scoped>
    .text-right{
        text-align: right;
    }
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

    .invalidDiv label{
        color: red;
    }

    .invalidDiv input,
    .invalidDiv textarea{
        border: 1px solid red;
    }
</style>