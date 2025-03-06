<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <Card class="w-full max-w-lg p-6 rounded-lg shadow-lg ">
      <template #title>
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
      </template>

      <template #content>
        <form @submit.prevent="handleSignup" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-medium">Username</label>
            <InputText
              v-model="username"
              class="w-full p-2 border rounded-md"
              placeholder="Enter your username"
              @blur="validateUsername"
            />
            <Message v-if="usernameError" severity="error" class="mt-1">
              {{ usernameError }}
            </Message>
          </div>

          <div>
            <label class="block text-gray-700 font-medium">Email</label>
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
              placeholder="Create a password"
              toggleMask
              @blur="validatePassword"
            />
            <Message v-if="passwordError" severity="error" class="mt-1">
              {{ passwordError }}
            </Message>
          </div>

          <Button type="submit" class="w-full" :loading="loading" label="Sign Up" />
        </form>

        <p class="text-center text-gray-600 mt-4">
          Already have an account?
          <a class="text-blue-600 hover:underline cursor-pointer" @click="redirectToLogin">
            Log in here
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

const username = ref("");
const email = ref("");
const password = ref("");
const usernameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const loading = ref(false);

const validateUsername = () => {
  usernameError.value = username.value.length >= 3 ? "" : "Username must be at least 3 characters.";
};

const validateEmail = () => {
  emailError.value = /\S+@\S+\.\S+/.test(email.value) ? "" : "Invalid email format.";
};

const validatePassword = () => {
  passwordError.value =
    password.value.length >= 6 ? "" : "Password must be at least 6 characters.";
};

const handleSignup = async () => {
  validateUsername();
  validateEmail();
  validatePassword();

  if (usernameError.value || emailError.value || passwordError.value) {
    return;
  }

  loading.value = true;

  try {
    const response = await $fetch("/api/auth/signup", {
      method: "POST",
      body: { username: username.value, email: email.value, password: password.value },
    });

    toast.add({ severity: "success", summary: "Sign Up Successful", detail: "Redirecting to login...", life: 3000 });

    setTimeout(() => {
      router.push("/auth/login");
    }, 3000);
  } catch (error) {
    toast.add({ severity: "error", summary: "Sign Up Failed", detail: error.message, life: 3000 });
  } finally {
    loading.value = false;
  }
};

const redirectToLogin = () => {
  router.push("/auth/login");
};
</script>

<style scoped>
/* PrimeVue already provides styles, but you can add custom styles if needed */
</style>
