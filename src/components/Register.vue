<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent="register(email, password, password_confirmation)">
      <label for="email">E-Mail Address</label>
      <input id="email" type="email" v-model="email" required />
      <label for="password">Password</label>
      <input id="password" type="password" v-model="password" required />
      <label for="password-confirm">Confirm Password</label>
      <input id="password-confirm" type="password" v-model="password_confirmation" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    register(email, password, password_confirmation) {
      console.log(password_confirmation);
      this.$store
        .dispatch("register", { email, password })
        .then(() => {})
        .catch(err => console.log(err));
    }
  }
};
</script>