<template>
     <loading :active.sync="getLoadingState" 
        :is-full-page="true"
        loader="bars"
        color="#613bff"
        background="#eee"
        >
        </loading>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
    name: 'BaseLoader',
    props: {
        isLoading: Boolean
    },
    computed: {
        ...mapGetters(['getLoadingState'])
    }
}
</script>