<script setup>
import ChatNavbar from "../../components/ChatNavbar.vue";
import {ref} from "vue";
import ConversationList from "../../components/ConversationList.vue";

const selectedConversation = ref(null);
</script>

<template>
  <div class="chat-page">
    <ChatNavbar :conversation-name="selectedConversation?.name" />
    <div class="chat-body">
      <ConversationList @select="selectedConversation = $event" />

    </div>
  </div>
</template>

<style scoped>
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