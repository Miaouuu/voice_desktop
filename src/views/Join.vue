<template>
  <div>{{message}}</div>
</template>
<script>
export default {
  name: "Join",
  data() {
    return {
      message: "test"
    };
  },
  mounted() {
    this.$http
      .post("http://localhost:3000/api/server/join/" + this.$route.params.inv)
      .then(res => {
        this.message = res.data.message;
      });
  }
};
</script>