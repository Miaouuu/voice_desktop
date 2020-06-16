<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <span @click="logout" v-if="isLoggedIn">Logout</span>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {});
    }
  },
  created() {
    this.$store.dispatch("getUser");
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });
  }
};
</script>
