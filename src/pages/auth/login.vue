<template>
  <div class="flex items-center justify-center min-h-screen  p-4">
    <Card class="w-full max-w-lg p-6 rounded-lg shadow-lg ">
      <template #title>
        <h2 class="text-3xl font-bold text-center  mb-6">Login</h2>
      </template>

      <template #content>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block  font-medium">Email</label>
            <InputText
              v-model="email"
              type="email"
              class="w-full p-2 border rounded-md"
              placeholder="Enter your email"
              @blur="validateEmail"
            />
            <Message v-if="emailError" severity="error" class="mt-1">
              {{ emailError }}
            </Message>
          </div>

          <div>
            <label class="block text-gray-700 font-medium">Password</label>
            <Password
              v-model="password"
              class="w-full"
              placeholder="Enter your password"
              toggleMask
              @blur="validatePassword"
            />
            <Message v-if="passwordError" severity="error" class="mt-1">
              {{ passwordError }}
            </Message>
          </div>

          <Button type="submit" class="w-full" :loading="loading" label="Login" />
        </form>

        <div class="text-center mt-4">
          <a class="text-blue-600 hover:underline cursor-pointer" @click="redirectToForgotPassword">
            Forgot Password?
          </a>
        </div>

        <p class="text-center text-gray-600 mt-4">
          Don't have an account?
          <a class="text-blue-600 hover:underline cursor-pointer" @click="redirectToSignup">
            Sign up here
          </a>
        </p>
      </template>
    </Card>

    <Toast />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Message from "primevue/message";
import Toast from "primevue/toast";

const router = useRouter();
const toast = useToast();

const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");
const loading = ref(false);

const validateEmail = () => {
  emailError.value = /\S+@\S+\.\S+/.test(email.value) ? "" : "Invalid email format.";
};

const validatePassword = () => {
  passwordError.value = password.value.length >= 6 ? "" : "Password must be at least 6 characters.";
};

const handleLogin = async () => {
  validateEmail();
  validatePassword();

  if (emailError.value || passwordError.value) {
    return;
  }

  loading.value = true;

  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });

    localStorage.setItem("token", response.token);
    toast.add({ severity: "success", summary: "Login Successful", detail: "Redirecting to dashboard...", life: 2000 });

    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  } catch (error) {
    toast.add({ severity: "error", summary: "Login Failed", detail: error.message, life: 3000 });
  } finally {
    loading.value = false;
  }
};

const redirectToSignup = () => {
  router.push("/auth/signup");
};

const redirectToForgotPassword = () => {
  router.push("/auth/forgot-password");
};
</script>

<style scoped>
/* PrimeVue already provides styles, but you can add custom styles if needed */
</style>
