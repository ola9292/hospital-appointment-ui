<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore()

const formData = ref({
    email:'',
    password:''
})

const submitForm = () => {
    authStore.login(formData.value)
}
</script>

<template>
  <main class="w-[92%] max-w-7xl mx-auto border border-gray-100 rounded-lg shadow-sm p-4 sm:p-8 my-8">
    <div class="border rounded-lg w-full max-w-sm mx-auto p-4 sm:p-6">
         <h1 class="text-3xl">Login</h1>
         <div v-if="authStore.errorMessage" role="alert" class="alert alert-warning my-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{{ authStore.errorMessage }}</span>
        </div>
         <form @submit.prevent="submitForm">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Email</legend>
                <input type="text" class="input w-full" placeholder="Type here" v-model="formData.email"/>
                <p v-if=" authStore.errors['email']">{{ authStore.errors['email'] }}</p>
            </fieldset>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Password</legend>
                <input type="password" class="input w-full" v-model="formData.password"/>
                <p v-if=" authStore.errors['password']">{{ authStore.errors['password'] }}</p>
            </fieldset>
            <div class="mt-4">
                <input type="submit" class="btn btn-soft btn-primary" value="Login">
            </div>
            
        </form>
    </div>
  </main>
</template>