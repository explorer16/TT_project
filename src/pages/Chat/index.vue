<script setup>
import ChatNavbar from "../../components/ChatNavbar.vue";
import {ref} from "vue";
import ConversationList from "../../components/ConversationList.vue";
import ChatWindow from "../../components/ChatWindow.vue";

const selectedConversation = ref(null);
</script>

<template>
  <div class="chat-page">
    <ChatNavbar :conversation-name="selectedConversation?.name" />
    <div class="chat-body">
      <ConversationList :selected-id="selectedConversation?.id" @select="selectedConversation = $event" />
      <ChatWindow v-if="selectedConversation" :conversation-id="selectedConversation.id"/>
    </div>
  </div>
</template>

<style scoped>
.chat-window {
  flex: 1;
}
.chat-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.chat-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.conversation-list {
  width: 280px;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
}
</style>