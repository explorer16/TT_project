<script setup>
import { useAuthStore } from '../../stores/auth.js'

const auth = useAuthStore()

const loginWithGoogle = () => {
  auth.loginWithGoogle()
}
const loginWithGithub = () => {
  auth.loginWithGithub()
}
</script>
<template>
  <div style="height: 100vh; display: flex; justify-content: center; align-items: center;">
    <el-card style="width: 320px;">
      <div class="login-content">
        <h2>Login</h2>
        <div>
          <el-button style="width: 100%" @click="loginWithGoogle()">Continue with Google</el-button>
        </div>
        <div>
          <el-button style="width: 100%" @click="loginWithGithub()">Continue with Github</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<style scoped>
.login-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
}
.login-content h2 {
  text-align: center;
  margin: 0 0 8px 0;
}
</style>