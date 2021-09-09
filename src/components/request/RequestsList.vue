<template>
    <base-dialog :show="!!error" title="یه مشکلی به وجود آمده است" @close="closeDialog">
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <base-card>
            <header>
                <h2>درخواست های ارسالی</h2>
            </header>
            <base-spinner v-if="isLoading"></base-spinner>
            <ul v-else-if="hasRequests && !isLoading">
                <request-item v-for="req in receivedRequests" :key="req.id" :email="req.email" :message="req.message"></request-item>
            </ul>
            <h3 v-else>درخواستی موجود نمیباشد</h3>
        </base-card>
    </section>
</template>

<script>
    import RequestItem from './RequestItem';
    import BaseSpinner from '../UI/BaseSpinner';
    export default {
        components:{RequestItem,BaseSpinner},
        data(){
            return{
                isLoading:false,
                error:null
            }
        },
        computed:{
            receivedRequests(){
                return this.$store.getters.getRequests;
            },
            hasRequests(){
                return this.$store.getters.hasRequests;
            }
        },
        created() {
            this.loadRequests();
        },
        methods:{
            async loadRequests(){
                this.isLoading = true;
                try {
                    await this.$store.dispatch('fetchRequests');
                }catch (e) {
                    this.error = e.message || 'مشکلی توی دریافت داده رخ داده است اگه میتونی فیلتر شکنت رو روشن کن'
                }
                this.isLoading = false;
            },
            closeDialog(){
                this.error = null;
            }
        }
    }
</script>

<style scoped>
    header {
        text-align: center;
    }

    ul {
        list-style: none;
        margin: 2rem auto;
        padding: 0;
        max-width: 30rem;
    }

    h3 {
        text-align: center;
    }
</style>