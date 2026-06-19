<script setup>
import {onMounted, onUnmounted, ref, watch} from "vue";
import {supabase} from "../services/supabase.js";
import {messageService} from "../services/message.js";
import {useAuthStore} from "../stores/auth.js";
import {profileService} from "../services/profile.js";
import { commandService } from "../services/commands/index.js";

const auth = useAuthStore()
const newMessage = ref('')
const messages = ref([])
let channel = null

const props = defineProps({
  conversationId: {
    type: String,
    required: true,
  },
})

onMounted(async () => {
  messages.value = await messageService.getAll(props.conversationId)
  subscribeToMessages()
})
onUnmounted(() => {
  unsubscribe()
})
watch(() => props.conversationId, async (newId) => {
  unsubscribe()
  messages.value = await messageService.getAll(newId)
  subscribeToMessages()
})
const send = async () => {
  const content = newMessage.value.trim()
  if (!content) return

  const handled = await commandService.execute(content, {
    conversationId: props.conversationId,
    senderId: auth.user.id,
  })

  if (!handled) {
    await messageService.create({
      conversation_id: props.conversationId,
      sender_id: auth.user.id,
      content: content
    })
  }
  newMessage.value = ''
}
const subscribeToMessages = () => {
  channel = supabase
      .channel('messages:'+props.conversationId)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${props.conversationId}`
      }, async (payload) => {
        const message = payload.new
        if (message.sender_id === auth.user.id) {
          message.sender = { display_name: auth.profile.display_name }
        } else {
          message.sender = await profileService.getById(message.sender_id)
        }
        messages.value.push(payload.new)
      })
      .subscribe()
}
const unsubscribe = () => {
  if (channel) {
    supabase.removeChannel(channel)
    channel = null
  }
}
const isOwnMessage = (message) => message.sender_id === auth.user.id;
</script>
<template>
  <div class="chat-window">
    <div class="message-list">
      <div
          class="message"
          v-for="message in messages"
          :key="message.id"
          :class="isOwnMessage(message) ? 'own-message' : 'not-own-message'"
      >
        <div class="message-header">{{ message.sender?.display_name }}</div>
        <div class="message-body">{{ message.content }}</div>
      </div>
    </div>
    <div class="message-input">
      <el-input
        v-model="newMessage"
        placeholder="Message..."
        @keyup.enter="send"
      />
      <button
        @click="send"
        :disabled="!newMessage.trim()"
      >
        Send
      </button>
    </div>
  </div>
</template>
<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.message-input {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #e0e0e0;
  background: #fff;
}
.message {
  max-width: 600px;
  padding: 8px 12px;
  border-radius: 16px;
  word-break: break-word;
}
.own-message {
  align-self: flex-end;
  background: #f0f0f0;
  color: #222;
  border-bottom-left-radius: 4px;
}
.not-own-message {
  align-self: flex-start;
  background: #f0f0f0;
  color: #222;
  border-bottom-left-radius: 4px;
}
.message-header {
  font-size: 11px;
  opacity: 0.7;
  margin-bottom: 4px;
}
</style>