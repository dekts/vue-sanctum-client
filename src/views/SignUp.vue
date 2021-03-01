<template>
    <form action="#" @submit.prevent="submit">
        <div>
            <label for="name">Name</label>
            <input type="text" name="name" id="name" v-model="form.name">
        </div>
        <div>
            <label for="email">Email</label>
            <input type="text" name="email" id="email" v-model="form.email">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="text" name="password" id="password" v-model="form.password">
        </div>
        <div>
            <label for="password_confirmation">Password Confirmation</label>
            <input type="text" name="password_confirmation" id="password_confirmation" v-model="form.password_confirmation">
        </div>
        <div>
            <button type="submit">
                Submit
            </button>
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'SignUp',

    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }
        }
    },

    methods: {
        ...mapActions ({
            signUp: 'auth/signUp'
        }),

        async submit() {
            await this.signUp(this.form)

            this.$router.replace({ name: 'Home' })
        }
    }
}
</script>