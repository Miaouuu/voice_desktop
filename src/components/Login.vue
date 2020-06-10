<template>
  <div>
    <form class="login" @submit.prevent="login(email, password)">
      <h1>Sign in</h1>
      <label>Email</label>
      <input required v-model="email" type="email" placeholder="Name" />
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password" />
      <hr />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login(email, password) {
      this.$store
        .dispatch("login", { email, password })
        .then(() => {})
        .catch(err => console.log(err));
    }
  }
};
</script>