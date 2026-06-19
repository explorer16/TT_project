<script setup>
import {ref} from "vue";
import {useAuthStore} from "../stores/auth.js";
import {ConversationService} from "../services/conversation.js";
import { profileService } from "../services/profile.js";

const props = defineProps({
  modelValue: Boolean
})
const emit = defineEmits([
    'update:modelValue',
    'created'
])

const chatName = ref('')
const selectedUsers = ref([])
const searchResults = ref([])
const loading = ref(false)

const auth = useAuthStore()
const searchUsers = async (query) => {
  if (!query) return
  searchResults.value = await profileService.search(query, auth.user.id)
}

const createConversation = async () => {
  const isGroup = selectedUsers.value.length > 1
  const conversation = await ConversationService.create({
    name: isGroup ?
        chatName.value :
        searchResults.value.find(u => u.id === selectedUsers.value[0])?.display_name,
    is_group: isGroup,
  })
  await ConversationService.addMember({
    conversation_id: conversation.id,
    profile_id: auth.user.id,
  })
  for (const userId of selectedUsers.value) {
    await ConversationService.addMember({
      conversation_id: conversation.id,
      profile_id: userId,
    })
  }
  emit("created", conversation)
  emit("update:modelValue", false)
}
</script>
<template>
  <el-dialog
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)" title="New Chat"
  >
    <el-input
      v-if="selectedUsers.length > 1"
      v-model="chatName"
      placeholder="Group Name"
    />

    <el-select
      v-model="selectedUsers"
      multiple
      filterable
      remote
      :remote-method="searchUsers"
      placeholder="Search user"
      style="width: 100%; margin-top: 12px"
    >
      <el-option
        v-for="user in searchResults"
        :key="user.id"
        :label="user.display_name"
        :value="user.id"
      />
    </el-select>

    <template #footer>
      <el-button @click="emit('update:modelValue', false)">Cancel</el-button>
      <el-button type="primary" @click="createConversation()">Create</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>