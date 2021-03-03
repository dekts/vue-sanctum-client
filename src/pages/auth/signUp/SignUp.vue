<template>
    <div class="card-body d-flex flex-column">
      <div class="logo mb-5">
        <router-link :to="{ name: 'Home' }">
          <img src="images/logo.png" alt="Logo" />
        </router-link>
      </div>
      <h2 class="mb-2">Create an account</h2>
      <b-form class="my-4 pt-2">
        <b-form-group :invalid-feedback="getInvalidField('email')">
          <label class="form-lbl text-uppercase">Email</label>
          <b-form-input
            type="email"
            class="form-control"
            :state="validateState('email')"
            v-model="signUpData.email"
            placeholder="Enter email"
            @keyup.enter="signUp"
          />
        </b-form-group>
        <b-form-group
          :invalid-feedback="getInvalidField('password', '{len}', '8')"
          :state="validateState('password')"
        >
          <label class="form-lbl text-uppercase">Password</label>
          <div class="icon-field">
            <b-form-input
              :type="getPasswordField"
              class="form-control"
              :state="validateState('password')"
              v-model="signUpData.password"
              placeholder="Enter password"
              @keyup.enter="signUp"
            />
            <span class="icon cursor-pointer">
              <img :src="getPasswordIcon" @click="passwordField = !passwordField" alt="Twitter" />
            </span>
          </div>
        </b-form-group>
      </b-form>
      <div class="btn-box mt-auto d-flex justify-content-between align-items-end">
        <button
          type="button"
          id="next"
          @keyup.enter="signUp"
          @click="signUp"
          class="btn btn-custom btn-red-shade"
        >Next</button>
        <router-link tag="a" :to="{ name: 'SignIn' }">Already have an account?</router-link>
      </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import validationMessages from "@/static/validation/validation-messages";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import { authHTTP } from "@/utils/http-request";
export default {
  name: "Registration",
  mixins: [validationMixin],
  data() {
    return {
      signUpData: {
        email: "",
        password: "",
      },
      passwordField: true
    };
  },
  computed: {
    getPasswordField() {
      return this.passwordField ? "password" : "text";
    },
    getPasswordIcon() {
      return this.passwordField
        ? "images/svg/eye-hide.svg"
        : "images/svg/eye.svg";
    },
  },
  validations: {
    signUpData: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8),
        maxLenth: maxLength(20)
      },
    }
  },
  methods: {
    ...mapMutations(["setLoadingState"]),
    signUp() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.setLoadingState(true);
      const signData = {
        email: this.signUpData.email,
        password: this.signUpData.password,
      };
      const url = "sign-up";
      authHTTP
        .post(url, signData)
        .then(() => {
          this.setLoadingState(false);
          this.$router.push({
            name: "Home",
          });
        })
        .catch(err => {
          this.setLoadingState(false);
          this.$toast.error(err.response.data.message);
        });
    },
    validateState(signUpDataItem) {
      const { $dirty, $error } = this.$v.signUpData[signUpDataItem];
      return $dirty ? !$error : null;
    },
    getInvalidField(field, replaceItem = "", replaceWith = "") {
      return validationMessages[field].replace(replaceItem, replaceWith);
    }
  }
};
</script>
