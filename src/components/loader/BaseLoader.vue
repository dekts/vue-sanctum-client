<template>
     <loading :active.sync="isLoading" 
        :is-full-page="true"
        loader="bars"
        color="#613bff"
        background="#eee"
        >
        </loading>
</template>


<script>
export default {
    name: 'BaseLoader',
    props: {
        isLoading: Boolean
    },
}
</script>