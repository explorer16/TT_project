<script setup>
import ChatNavbar from "../../components/ChatNavbar.vue";
import {ref} from "vue";

const selectedConversation = ref(null);
</script>

<template>
  <div>
    <ChatNavbar :conversation-name="selectedConversation?.name" />
  </div>
</template>

<style scoped>

</style>