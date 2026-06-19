<script setup>
import {ref, onMounted, onUnmounted} from "vue";
import { supabase } from "../services/supabase.js";
import { useAuthStore } from "../stores/auth.js";
import { ConversationService } from "../services/conversation.js";
import NewConversationModal from "./NewConversationModal.vue";

const auth = useAuthStore();
let channel = null
const conversations = ref([])
const emit = defineEmits(['select'])
const props = defineProps({
  selectedId: String,
})

onMounted(async () => {
  conversations.value = await ConversationService.getAll()
  subscribeToConversations()
})

onUnmounted(() => {
  if (channel) supabase.removeChannel(channel)
})

const selectConversation = (conversation) => {
  emit('select', conversation)
}
const showModal = ref(false)
const onConversationCreated = (conversation) => {
  conversations.value.unshift(conversation)
}
const subscribeToConversations = () => {
  channel = supabase
      .channel('my_conversations')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'conversation_members',
        filter: `profile_id=eq${auth.user.id}`,
      }, async (payload) => {
        const conversation = await ConversationService.getById(payload.new.conversation_id)
        conversations.value.unshift(conversation)
      })
      .subscribe()
}
</script>
<template>
  <div class="conversation-list">
    <el-button type="primary" style="width: 100%" @click="showModal = true">
      New chat
    </el-button>
    <NewConversationModal
      v-model="showModal"
      @created="onConversationCreated"
    />
    <div
        v-for="conversation in conversations"
        :key="conversation.id"
        class="conversation-item"
        :class="{ 'active': conversation.id === selectedId }"
        @click="selectConversation(conversation)"
    >
      {{ conversation.name }}
    </div>
  </div>
</template>

<style scoped>
.conversation-item {
  background: #e8f0fe;
  color: #1a73e8;
}
</style>