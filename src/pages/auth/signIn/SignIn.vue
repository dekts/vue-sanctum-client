<template>
  <base-auth-layout>
    <div class="card-body d-flex flex-column">
      <div class="logo mb-5">
        <router-link :to="{ name: 'Personalise' }">
          <img src="images/logo.png" alt="Logo" />
        </router-link>
      </div>
      <h2 class="mb-2">Awesome you’re back</h2>
      <h6 class="mb-3">Sign in to continue</h6>
      <sign-in-using-social-media></sign-in-using-social-media>
      <h6 class="m-0 mt-3">Or use your email</h6>
      <b-form class="my-4 pt-2">
        <b-form-group :invalid-feedback="getInvalidFieldMessage('email')">
          <label class="form-lbl text-uppercase">Email</label>
          <b-form-input
            type="email"
            class="form-control"
            placeholder="Enter email"
            v-model="signInData.email"
            :state="validateState('email')"
            @keyup.enter="signInUser"
            autocomplete="on"
          />
        </b-form-group>
        <b-form-group
          :invalid-feedback="getInvalidFieldMessage('required')"
          :state="validateState('password')"
        >
          <label class="form-lbl text-uppercase">Password</label>
          <div class="icon-field">
            <b-form-input
              :type="getPasswordField"
              class="form-control custom-validate"
              placeholder="Enter password"
              v-model="signInData.password"
              :state="validateState('password')"
              @keyup.enter="signInUser"
            />
            <span class="icon cursor-pointer">
              <img
                :src="getPasswordIcon"
                @click="passwordField = !passwordField"
                alt="Twitter"
              />
            </span>
          </div>
        </b-form-group>
        <div class="d-flex justify-content-between align-items-center">
          <div
            class="custom-switch-toggle d-flex justify-content-center align-items-center"
          >
            <label class="switch m-0">
              <input
                v-model="signInData.rememberMe"
                value="true"
                type="checkbox"
              />
              <span class="slider round"></span>
            </label>
            <span class="switch-lbl ml-2">Remember me</span>
          </div>
          <router-link :to="{ name: 'SignUp' }">Create an account</router-link>
        </div>
      </b-form>
      <div
        class="btn-box mt-auto d-flex justify-content-between align-items-end"
      >
        <button
          @keyup.enter="signInUser"
          @click="signInUser"
          id="signInButton"
          type="button"
          class="btn btn-custom btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  </base-auth-layout>
</template>

<script>
import validationMessages from "@/static/validation/validation-messages";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
} from "vuelidate/lib/validators";
import { authHTTP } from "@/utils/http-request";

export default {
  name: "SignIn",
  mixins: [validationMixin],
  mounted: function () {
    if (localStorage.getItem("rememberMe") != null) {
      this.signInData.rememberMe = JSON.parse(localStorage.getItem("rememberMe"));
    }
    this.remember_token = this.getProfileData.rememberToken;
  },
  data() {
    return {
      signInData: {
        email: "",
        password: "",
        rememberMe: false,
      },
      passwordField: true,
      isLoading: true,
      remember_token: null,
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
    signInData: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    signInUser() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.setLoadingState(true);
      const signData = {
        email: this.signInData.email,
        password: this.signInData.password,
        remember_me: this.signInData.rememberMe,
      };
        localStorage.setItem("rememberMe", this.signInData.rememberMe);
        authHTTP
        .post("sign-in", signData)
        .then((result) => {
            signData["request_id"] = result.data.request_id;
            this.setLoadingState(false);
            this.$router.push({
                name: "Home"
            });
        })
        .catch((err) => {
            this.setLoadingState(false);
            this.$toast.error(err.response.data.message);
        });
    },
    validateState(signInDataItem) {
      const { $dirty, $error } = this.$v.signInData[signInDataItem];
      return $dirty ? !$error : null;
    },
    getInvalidFieldMessage(field, replaceItem = "", replaceWith = "") {
      return validationMessages[field].replace(replaceItem, replaceWith);
    },
  },
};
</script>

<style scoped>
.password-invalid {
  border-color: #dc3545;
}
</style>
