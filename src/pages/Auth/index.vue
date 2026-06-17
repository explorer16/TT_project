<script setup>
import { useAuthStore } from '../../stores/auth.js'

const auth = useAuthStore()

const login = () => {
  auth.loginWithGoogle()
}
</script>
<template>
  <div style="height: 100vh; display: flex; justify-content: center; align-items: center;">
    <el-card style="width: 320px; text-align: center;">
      <h2>Login</h2>
      <el-button type="primary" @click="login">
        Continue with Google
      </el-button>
    </el-card>
  </div>
</template>
<style scoped>

</style>