<template>
  <div>
    <p v-if="rtc" @click="leave">Leave</p>
    <p @click="join('1')">Join 1</p>
    <p @click="join('2')">Join 2</p>
  </div>
</template>

<script>
import RTCMultiConnection from "rtcmulticonnection";

export default {
  name: "App",
  data() {
    return {
      rtc: null,
    };
  },
  mounted: function() {
    this.rtc = new RTCMultiConnection();
    this.rtc.socketURL = "localhost:3001/";
  },
  methods: {
    oui() {
      this.rtc.streamEvents.selectAll().forEach(function(streamEvent) {
        console.log(streamEvent.stream.stop());
      });
      this.rtc.closeSocket();
    },
    join(room) {
      console.log(this.rtc.attachStreams);
      this.rtc.session = {
        audio: true,
      };
      this.rtc.mediaConstraints = {
        audio: true,
        video: false,
      };

      this.rtc.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: false,
      };
      this.rtc.openOrJoin(room);
    },
  },
};
</script>
