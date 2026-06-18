<script setup>
import { onMounted } from 'vue'
import { supabase } from '../../services/supabase'
import { useRouter } from 'vue-router'
import { useAuthStore } from "../../stores/auth.js";

const router = useRouter()

onMounted(async () => {
  const { data, error } = await supabase.auth.exchangeCodeForSession(
      window.location.href
  )

  const { data: sessionData } = await supabase.auth.getSession()

  if (sessionData?.session && !error) {
    const user = sessionData.session.user;
    const auth = useAuthStore()
    await auth.ensureProfile(user);

    router.replace('/chat')
  } else {
    router.replace('/auth')
  }
})
</script>
<template>
  <div>Signing in...</div>
</template>