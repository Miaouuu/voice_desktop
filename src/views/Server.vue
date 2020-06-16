<template>
  <div>
    <p>{{server.name}}</p>
    <div v-if="userId === server.creator">
      <p @click="isVisible = !isVisible">{{isVisible ? "-" : "+"}}</p>
      <form v-if="isVisible" @submit.prevent="createChannel(name, selected, server._id)">
        <input type="text" v-model="name" />
        <select v-model="selected">
          <option v-for="selection in selections" :key="selection">{{selection}}</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
    <div>
      <div v-for="channel in server.channels" :key="channel._id">
        <p @click="showChannel(channel._id)">{{channel.name}}</p>
      </div>
    </div>
    <div v-if="channelSelected.selected">
      <p>{{channelSelected.name}}</p>
      <form @submit.prevent="sendMessage(message)">
        <input type="text" v-model="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Server",
  data() {
    return {
      server: {},
      isVisible: false,
      name: "",
      selected: "TEXT",
      selections: ["TEXT", "VOICE", "BOTH"],
      message: "",
      channelSelected: {
        selected: false,
        id: "",
        name: "",
        messages: []
      }
    };
  },
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.$http
        .get("http://localhost:3000/api/server/" + this.$route.params.id)
        .then(data => (this.server = data.data));
    }
  },
  methods: {
    createChannel(name, selected, serverId) {
      this.$http
        .post("http://localhost:3000/api/channel/", {
          name: name,
          server: serverId,
          type: selected
        })
        .then(data => (this.server = data.data));
      this.name = "";
    },
    showChannel(id) {
      this.channelSelected.selected = true;
      this.$http.get("http://localhost:3000/api/channel/" + id).then(data => {
        this.channelSelected.name = data.data.name;
        this.channelSelected.id = data.data._id;
        this.channelSelected.messages = data.data.messages;
      });
    },
    sendMessage(message) {
      this.message = "";
      console.log(message);
    }
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    }
  }
};
</script>