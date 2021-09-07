<template>
    <base-card>
        <h2>مربی مورد نظر خود را پیدا کنید</h2>
        <div class="filter-option-box">
            <div class="filter-option">
                <input type="checkbox" id="frontend" checked @change="setFilter">
                <label for="frontend">Frontend</label>
            </div>
            <div class="filter-option">
                <input type="checkbox" id="backend" checked @change="setFilter">
                <label for="backend">Backend</label>
            </div>
            <div class="filter-option">
                <input type="checkbox" id="fullstack" checked @change="setFilter">
                <label for="fullstack">Fullstack</label>
            </div>
        </div>
    </base-card>
</template>

<script>
    export default {
        emits:['change-filter'],
        data(){
            return{
                filters:{
                    frontend:true,
                    backend:true,
                    fullstack:true
                }
            }
        },
        methods:{
            setFilter(event){
                const inputId = event.target.id;
                const isActive = event.target.checked;
                const newFilter = {
                    ...this.filters,
                    [inputId]:isActive
                }
                this.filters = newFilter;
                this.$emit('change-filter',newFilter);
            }
        }
    }
</script>

<style scoped>
    h2 {
        margin: 0.5rem 0;
        text-align: right;
    }

    .filter-option {
        margin-left: 1rem;
        text-align: right;
        direction: rtl;
    }

    .filter-option label,
    .filter-option input {
        vertical-align: middle;
    }

    .filter-option label {
        margin-left: 0.25rem;
    }

    .filter-option.active label {
        font-weight: bold;
    }

    .filter-option-box{
        display: flex;
        text-align: right;
        direction: rtl;
    }
</style>