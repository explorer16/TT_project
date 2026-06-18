<script setup>
import { ref, onMounted } from "vue";
import { ConversationService } from "../services/conversation.js";
import NewConversationModal from "./NewConversationModal.vue";

const conversations = ref([])

const emit = defineEmits(['select'])

onMounted(async () => {
  conversations.value = await ConversationService.getAll()
})

const selectConversation = (conversation) => {
  emit('select', conversation)
}

const showModal = ref(false)
const onConversationCreated = (conversation) => {
  conversations.value.unshift(conversation)
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
        @click="selectConversation(conversation)"
    >
      {{ conversation.name }}
    </div>
  </div>
</template>

<style scoped>

</style>