<template>
  <div>
    <div v-if="!isLoggedIn">
      <Login />
      <Register />
    </div>
    <div v-if="isLoggedIn">
      <p @click="isVisible = !isVisible">{{ isVisible ? "-" : "+" }}</p>
      <form v-if="isVisible" @submit.prevent="createServer(name)">
        <input type="text" v-model="name" />
        <button type="submit">Create</button>
      </form>
    </div>
    <div>
      <router-link
        v-for="server in servers"
        :key="server"
        :to="{name:'server', params: {id: server}}"
      >{{server}}</router-link>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

export default {
  name: "Home",
  data() {
    return {
      isVisible: false,
      name: ""
    };
  },
  components: {
    Login,
    Register
  },
  methods: {
    createServer(name) {
      this.$store.dispatch("createServer", name);
      this.name = "";
      this.isVisible = !this.isVisible;
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    servers() {
      return this.$store.getters.getServers;
    }
  }
};
</script>
