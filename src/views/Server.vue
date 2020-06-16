<template>
  <div>
    <p>{{server.name}}</p>
    <div v-if="userId === server.creator">
      <p>Create</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Server",
  data() {
    return {
      server: {}
    };
  },
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.$http
        .get("http://localhost:3000/api/server/" + this.$route.params.id)
        .then(data => (this.server = data.data));
    }
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    }
  }
};
</script>