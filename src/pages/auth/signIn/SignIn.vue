<template>
    <div class="card-body d-flex flex-column">
      <div class="logo mb-5">
        <router-link :to="{ name: 'Home' }">
          <img src="images/logo.png" alt="Logo" />
        </router-link>
      </div>
      <h2 class="mb-2">Awesome you’re back</h2>
      <h6 class="mb-3">Sign in to continue</h6>
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
                alt="Eye"
              />
            </span>
          </div>
        </b-form-group>
        <div class="d-flex justify-content-between align-items-center">
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
  data() {
    return {
      signInData: {
        email: "",
        password: "",
      },
      passwordField: true,
      isLoading: true,
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
      };
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
