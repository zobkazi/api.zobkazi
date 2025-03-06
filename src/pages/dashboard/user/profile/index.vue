<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

// PrimeVue Toast for Notifications
const toast = useToast();

// Current Step Tracker
const step = ref(0);

// User Data
const user = ref({
  name: '',
  username: '',
  email: '',
  bio: '',
  location: '',
  twitterUsername: '',
  linkedinUrl: '',
  githubUsername: '',
  stackoverflowUrl: '',
});

// Steps Definition
const steps = ref([
  { label: 'Basic Info' },
  { label: 'Social Links' },
  { label: 'Profile Completion' },
  {label: 'Finalize Profile'},
]);

// Next Step
const nextStep = () => {
  if (step.value < steps.value.length - 1) step.value++;
};

// Previous Step
const prevStep = () => {
  if (step.value > 0) step.value--;
};

// Submit Form
const submitForm = () => {
  console.log('Updated User Data:', user.value);
  toast.add({ severity: 'success', summary: 'Success', detail: 'Profile Updated', life: 3000 });
};
</script>

<template>
  <div class="max-w-lg mx-auto p-6  rounded-lg shadow-md">
    <Toast />
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Update Profile</h2>
    
    <!-- Step Indicator -->
    <Steps v-model:activeStep="step" :model="steps" class="mb-4" />
    
    <!-- Step 1: Basic Info -->
    <div v-if="step === 0">
      <label class="block text-sm font-medium">Name</label>
      <InputText v-model="user.name" class="w-full p-2 border mb-3" />
      
      <label class="block text-sm font-medium">Username</label>
      <InputText v-model="user.username" class="w-full p-2 border mb-3" />
      
      <label class="block text-sm font-medium">Email</label>
      <InputText v-model="user.email" class="w-full p-2 border mb-3" />
      
      <button @click="nextStep" class="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
    </div>
    
    <!-- Step 2: Social Links -->
    <div v-if="step === 1">
      <label class="block text-sm font-medium">Bio</label>
      <Textarea v-model="user.bio" class="w-full p-2 border mb-3" />
      
      <label class="block text-sm font-medium">Location</label>
      <InputText v-model="user.location" class="w-full p-2 border mb-3" />
      
      <label class="block text-sm font-medium">Twitter</label>
      <InputText v-model="user.twitterUsername" class="w-full p-2 border mb-3" />
      
      <label class="block text-sm font-medium">LinkedIn</label>
      <InputText v-model="user.linkedinUrl" class="w-full p-2 border mb-3" />
      
      <div class="flex justify-between">
        <button @click="prevStep" class="bg-gray-400 text-white px-4 py-2 rounded">Back</button>
        <button @click="submitForm" class="bg-green-500 text-white px-4 py-2 rounded">Update</button>
      </div>
    </div>
  </div>
</template>

<style>
/* Add custom styling here if needed */
</style>
