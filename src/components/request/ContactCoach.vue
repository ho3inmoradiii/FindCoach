<template>
    <form @submit.prevent="submitMessage">
        <div>
            <label for="email">
                ایمیل
            </label>
            <input id="email" v-model.trim="email">
        </div>
        <div>
            <label for="message">
                پیام
            </label>
            <textarea id="message" rows="5" v-model.trim="message"></textarea>
        </div>
        <p v-if="!formIsValid">قسمت ایمیل و قسمت پیام نبایستی خالی باشند و باید ایمیل معتبر وارد کنید</p>
        <div class="actions">
            <the-button>ارسال پیام</the-button>
        </div>
    </form>
</template>

<script>
    export default {
        data(){
            return{
                email:'',
                message:'',
                formIsValid:true,
            }
        },
        methods:{
            submitMessage(){
                this.formIsValid = true;
                if (this.email === '' || this.message === '' || !this.email.includes('@')){
                    this.formIsValid = false;
                    return;
                }
                const dataMessage = {
                    coachId:this.$route.params.id,
                    email: this.email,
                    message: this.message,
                }
                this.$store.dispatch('sendMessage',dataMessage);
                this.$router.replace('/coaches');
            }
        }
    }
</script>

<style scoped>
    form {
        margin: 1rem;
        border: 1px solid #ccc;
        border-radius: 12px;
        padding: 1rem;
    }

    .form-control {
        margin: 0.5rem 0;
    }

    label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        display: block;
        text-align: right;
    }

    input,
    textarea {
        display: block;
        width: 100%;
        font: inherit;
        border: 1px solid #ccc;
        padding: 0.15rem;
        text-align: right;
    }

    input:focus,
    textarea:focus {
        border-color: #3d008d;
        background-color: #faf6ff;
        outline: none;
    }

    .errors {
        font-weight: bold;
        color: red;
    }

    .actions {
        text-align: center;
        margin-top: 1rem;
    }
</style>