<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <Card class="w-full max-w-lg p-6 rounded-lg shadow-lg">
      <template #title>
        <h2 class="text-3xl font-bold text-center mb-6">Forgot Password</h2>
      </template>

      <template #content>
        <p class=" text-center mb-4">
          Enter your email, and we'll send you a link to reset your password.
        </p>

        <form @submit.prevent="handleForgotPassword" class="space-y-4">
          <div>
            <label class="block font-medium">Email</label>
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

          <Button type="submit" class="w-full" :loading="loading" label="Send Reset Link" />
        </form>

        <div class="text-center mt-4">
          <a class="text-blue-600 hover:underline cursor-pointer" @click="redirectToLogin">
            Back to Login
          </a>
        </div>
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
import Button from "primevue/button";
import Message from "primevue/message";
import Toast from "primevue/toast";

const router = useRouter();
const toast = useToast();

const email = ref("");
const emailError = ref("");
const loading = ref(false);

const validateEmail = () => {
  emailError.value = /\S+@\S+\.\S+/.test(email.value) ? "" : "Invalid email format.";
};

const handleForgotPassword = async () => {
  validateEmail();
  if (emailError.value) return;

  loading.value = true;

  try {
    await $fetch("/api/auth/forgot-password", {
      method: "POST",
      body: { email: email.value },
    });

    toast.add({
      severity: "success",
      summary: "Reset Link Sent",
      detail: "Check your email for the password reset link.",
      life: 3000,
    });

    setTimeout(() => {
      router.push("/auth/login");
    }, 3000);
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.message,
      life: 3000,
    });
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
