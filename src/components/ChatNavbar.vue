<script setup>
import { useAuthStore } from "../stores/auth.js";

const auth = useAuthStore()

const logout = () => {
  auth.logout()
}

const props = defineProps({
  conversationName: {
    type: String,
    default: 'Chat not selected'
  }
})
</script>

<template>
  <div class="chat-navbar">
    <div>
      <span id="chatName">{{ props.conversationName }}</span>
    </div>
    <div>
      <el-dropdown trigger="click">
        <el-avatar :src="auth.user?.user_metadata?.avatar_url" style="cursor: pointer">
          {{ auth.profile?.display_name?.charAt(0) }}
        </el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.chat-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: #e8f4fd;
  border-bottom: 1px solid #c2d9ed;
}
</style>