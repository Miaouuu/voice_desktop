<template>
  <div>
    <p>{{ server.name }}</p>
    <div v-if="userId === server.creator">
      <p @click="isVisible = !isVisible">{{ isVisible ? "-" : "+" }}</p>
      <form v-if="isVisible" @submit.prevent="createChannel(name, selected, server._id)">
        <input type="text" v-model="name" />
        <select v-model="selected">
          <option v-for="selection in selections" :key="selection">
            {{
            selection
            }}
          </option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
    <div>
      <div v-for="channel in server.channels" :key="channel._id">
        <p
          v-if="channel.accesses.indexOf(userId) !== -1"
          @click="showChannel(channel._id)"
        >{{ channel.name }}</p>
      </div>
    </div>
    <div v-if="channelSelected.selected">
      <p>{{ channelSelected.name }}</p>
      <p v-for="message in channelSelected.messages" :key="message._id">{{message.text}}</p>
      <form @submit.prevent="sendMessage(message)">
        <input type="text" v-model="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";

const socket = io("http://localhost:3000/", {
  transports: ["websocket"],
  query: {
    token: localStorage.getItem("token")
  }
});
console.log(localStorage.getItem("token"));

Vue.use(VueSocketIOExt, socket);

export default {
  name: "Server",
  sockets: {
    RES_MESSAGE(msg) {
      this.channelSelected.messages.push({ _id: msg._id, text: msg.text });
    }
  },
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
      this.$socket.client.emit("MESSAGE", {
        channel: this.channelSelected.id,
        text: message
      });
      this.message = "";
    }
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    }
  }
};
</script>
