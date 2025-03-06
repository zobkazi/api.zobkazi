<template>
    <div class="container">
      <Toast />
      <h2 class="title">Update User Profile</h2>
  
      <!-- Step Indicator -->
      <div class="progress">
        <div class="step" v-for="(step, index) in steps" :key="index" :class="{ active: currentStep === index }">
          {{ step }}
        </div>
      </div>
  
      <form @submit.prevent="nextStep">
        <!-- Step 1: Basic Info -->
        <div v-if="currentStep === 0">
          <label>Name:</label>
          <InputText v-model="user.name" :class="{ 'p-invalid': errors.name }" />
          <small v-if="errors.name" class="error">{{ errors.name }}</small>
  
          <label>Username:</label>
          <InputText v-model="user.username" :class="{ 'p-invalid': errors.username }" />
          <small v-if="errors.username" class="error">{{ errors.username }}</small>
  
          <label>Email:</label>
          <InputText v-model="user.email" type="email" :class="{ 'p-invalid': errors.email }" />
          <small v-if="errors.email" class="error">{{ errors.email }}</small>
  
          <label>Role:</label>
          <InputText v-model="user.role" :class="{ 'p-invalid': errors.role }" />
          <small v-if="errors.role" class="error">{{ errors.role }}</small>
  
          <label>Login:</label>
          <InputText v-model="user.login" :class="{ 'p-invalid': errors.login }" />
          <small v-if="errors.login" class="error">{{ errors.login }}</small>
  
          <label>Node ID:</label>
          <InputText v-model="user.nodeId" :class="{ 'p-invalid': errors.nodeId }" />
          <small v-if="errors.nodeId" class="error">{{ errors.nodeId }}</small>
        </div>
  
        <!-- Step 2: Social Links -->
        <div v-if="currentStep === 1">
          <label>LinkedIn URL:</label>
          <InputText v-model="user.linkedinUrl" :class="{ 'p-invalid': errors.linkedinUrl }" />
          <small v-if="errors.linkedinUrl" class="error">{{ errors.linkedinUrl }}</small>
  
          <label>Twitter Username:</label>
          <InputText v-model="user.twitterUsername" :class="{ 'p-invalid': errors.twitterUsername }" />
          <small v-if="errors.twitterUsername" class="error">{{ errors.twitterUsername }}</small>
  
          <label>Blog URL:</label>
          <InputText v-model="user.blog" :class="{ 'p-invalid': errors.blog }" />
          <small v-if="errors.blog" class="error">{{ errors.blog }}</small>
  
          <label>Location:</label>
          <InputText v-model="user.location" :class="{ 'p-invalid': errors.location }" />
          <small v-if="errors.location" class="error">{{ errors.location }}</small>
  
          <div class="checkbox-field">
            <label>Hireable:</label>
            <Checkbox v-model="user.hireable" binary />
          </div>
        </div>
  
        <!-- Step 3: Profile -->
        <div v-if="currentStep === 2">
          <label>Avatar URL:</label>
          <InputText v-model="user.avatarUrl" :class="{ 'p-invalid': errors.avatarUrl }" />
          <small v-if="errors.avatarUrl" class="error">{{ errors.avatarUrl }}</small>
  
          <label>Bio:</label>
          <Textarea v-model="user.bio" :class="{ 'p-invalid': errors.bio }" rows="4" />
          <small v-if="errors.bio" class="error">{{ errors.bio }}</small>
  
          <label>Company:</label>
          <InputText v-model="user.company" :class="{ 'p-invalid': errors.company }" />
          <small v-if="errors.company" class="error">{{ errors.company }}</small>
  
          <div class="checkbox-field">
            <label>Site Admin:</label>
            <Checkbox v-model="user.siteAdmin" binary />
          </div>
  
          <label>Type:</label>
          <Dropdown v-model="user.type" :options="userTypes" optionLabel="name" optionValue="value" placeholder="Select Type" />
        </div>
  
        <!-- Navigation Buttons -->
        <div class="button-group">
          <Button v-if="currentStep > 0" label="Back" @click="prevStep" :disabled="isSubmitting" />
          <Button v-if="currentStep < steps.length - 1" label="Next" type="submit" :disabled="isSubmitting" />
          <Button 
            v-if="currentStep === steps.length - 1" 
            label="Update Profile" 
            @click="submitForm" 
            :loading="isSubmitting"
            :disabled="isSubmitting" 
          />
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useToast } from "primevue/usetoast";
  import { z } from "zod";
  import Toast from "primevue/toast";
  import InputText from "primevue/inputtext";
  import Textarea from "primevue/textarea";
  import Button from "primevue/button";
  import Checkbox from "primevue/checkbox";
  import Dropdown from "primevue/dropdown";
  
  // Router and Toast
  const router = useRouter();
  const toast = useToast();
  
  // Steps
  const steps = ["Basic Info", "Social Links", "Profile"];
  const currentStep = ref(0);
  const isSubmitting = ref(false);
  
  // Available user types
  const userTypes = [
    { name: "User", value: "User" },
    { name: "Organization", value: "Organization" },
    { name: "Admin", value: "Admin" }
  ];
  
  // User Data - initialize with default values
  const user = reactive({
    name: "",
    username: "",
    email: "",
    role: "",
    login: "",
    nodeId: "",
    avatarUrl: "",
    gravatarId: "",
    url: "",
    htmlUrl: "",
    linkedinUrl: "",
    followersUrl: "",
    followingUrl: "",
    gistsUrl: "",
    starredUrl: "",
    subscriptionsUrl: "",
    organizationsUrl: "",
    reposUrl: "",
    eventsUrl: "",
    receivedEventsUrl: "",
    type: "User",
    siteAdmin: false,
    company: "",
    blog: "",
    location: "",
    hireable: false,
    bio: "",
    twitterUsername: "",
    publicRepos: 0,
    publicGists: 0,
    followers: 0,
    following: 0
  });
  
  // Validation Schema using Zod
  const userSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    username: z.string().min(3, "User Name must be at least 3 characters."),
    email: z.string().email("Invalid email format."),
    role: z.string().min(3, "Role must be at least 3 characters."),
    login: z.string().min(3, "Login must be at least 3 characters."),
    nodeId: z.string().min(3, "nodeId must be at least 3 characters."),
    avatarUrl: z.string().url("Invalid URL").or(z.string().length(0)),
    gravatarId: z.string().optional().default(""),
    url: z.string().optional().default(""),
    htmlUrl: z.string().optional().default(""),
    linkedinUrl: z.string().url("Invalid LinkedIn URL").or(z.string().length(0)),
    followersUrl: z.string().optional().default(""),
    followingUrl: z.string().optional().default(""),
    gistsUrl: z.string().optional().default(""),
    starredUrl: z.string().optional().default(""),
    subscriptionsUrl: z.string().optional().default(""),
    organizationsUrl: z.string().optional().default(""),
    reposUrl: z.string().optional().default(""),
    eventsUrl: z.string().optional().default(""),
    receivedEventsUrl: z.string().optional().default(""),
    type: z.string().default("User"),
    siteAdmin: z.boolean().default(false),
    company: z.string().optional().default(""),
    blog: z.string().url("Invalid blog URL").or(z.string().length(0)),
    location: z.string().optional().default(""),
    hireable: z.boolean().default(false),
    bio: z.string().max(200, "Bio should be under 200 characters.").optional().default(""),
    twitterUsername: z.string().optional().default(""),
    publicRepos: z.number().int().default(0),
    publicGists: z.number().int().default(0),
    followers: z.number().int().default(0),
    following: z.number().int().default(0)
  });
  
  // Errors
  const errors = reactive({});
  
  // Fetch user data on mount
  onMounted(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.add({ severity: "warning", summary: "Authentication Required", detail: "Please log in to update your profile.", life: 3000 });
        router.push("/auth/login");
        return;
      }
  
      const response = await fetch(`/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          toast.add({ severity: "error", summary: "Session Expired", detail: "Please log in again.", life: 3000 });
          localStorage.removeItem("token");
          router.push("/auth/login");
        } else {
          toast.add({ severity: "error", summary: "Error", detail: "Failed to load user data.", life: 3000 });
        }
        return;
      }
  
      const data = await response.json();
      
      // Update user object with fetched data
      Object.keys(data.user).forEach(key => {
        if (key in user) {
          user[key] = data.user[key];
        }
      });
      
    } catch (error) {
      console.error("Error loading user data:", error);
      toast.add({ severity: "error", summary: "Error", detail: "Failed to load user data. Please try again.", life: 3000 });
    }
  });


// Fetch user data by ID
const fetchUser = async () => {
  const userId = router.currentRoute.value.params.id;
  if (!userId) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No user ID found', life: 3000 });
    return;
  }

  try {
    const response = await fetch(`/api/user/${userId}`);
    const data = await response.json();

    if (data.success) {
      user.value = data.post;
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch User: ' + data.error, life: 3000 });
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error fetching user: ' + error, life: 3000 });
  }
};
  
  // Validate current step
  const validateStep = () => {
    // Reset errors for current step fields
    let stepFields = [];
    if (currentStep.value === 0) {
      stepFields = ["name", "username", "email", "role", "login", "nodeId"];
    } else if (currentStep.value === 1) {
      stepFields = ["linkedinUrl", "twitterUsername", "blog", "location", "hireable"];
    } else if (currentStep.value === 2) {
      stepFields = ["avatarUrl", "bio", "company", "siteAdmin", "type"];
    }
    
    stepFields.forEach(field => {
      errors[field] = "";
    });
  
    try {
      userSchema.pick(stepFields.reduce((obj, key) => ({ ...obj, [key]: true }), {})).parse(user);
      return true;
    } catch (e) {
      e.errors.forEach((err) => (errors[err.path[0]] = err.message));
      return false;
    }
  };
  
  // Next Step
  const nextStep = () => {
    if (validateStep()) currentStep.value++;
  };
  
  // Previous Step
  const prevStep = () => {
    currentStep.value--;
  };
  
  // Validate all form fields
  const validateAllFields = () => {
    // Reset all errors
    Object.keys(errors).forEach(key => {
      errors[key] = "";
    });
  
    try {
      userSchema.parse(user);
      return true;
    } catch (e) {
      e.errors.forEach((err) => (errors[err.path[0]] = err.message));
      
      // Focus on the first step with errors
      if (["name", "username", "email", "role", "login", "nodeId"].some(field => errors[field])) {
        currentStep.value = 0;
      } else if (["linkedinUrl", "twitterUsername", "blog", "location", "hireable"].some(field => errors[field])) {
        currentStep.value = 1;
      } else {
        currentStep.value = 2;
      }
      
      return false;
    }
  };
  
  // Submit Form
  const submitForm = async () => {
    if (!validateStep()) return;
    
    // Validate all fields before submission
    if (!validateAllFields()) {
      toast.add({ 
        severity: "error", 
        summary: "Validation Error", 
        detail: "Please check all form fields before submitting.", 
        life: 3000 
      });
      return;
    }
  
    isSubmitting.value = true;
    let retryCount = 0;
    const maxRetries = 2;
  
    const attemptSubmit = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.add({ severity: "error", summary: "Unauthorized", detail: "Please log in to update your profile.", life: 3000 });
          router.push("/auth/login");
          return;
        }
  
        // Convert string numbers to actual numbers
        const formData = { ...user };
        formData.publicRepos = Number(formData.publicRepos);
        formData.publicGists = Number(formData.publicGists);
        formData.followers = Number(formData.followers);
        formData.following = Number(formData.following);
  
        const response = await fetch(`/api/auth/update/${userid}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
  
        // Handle different HTTP status codes
        if (response.status === 401 || response.status === 403) {
          toast.add({ severity: "error", summary: "Authentication Error", detail: "Your session has expired. Please log in again.", life: 3000 });
          localStorage.removeItem("token");
          router.push("/auth/login");
          return;
        }
  
        if (response.status === 429) {
          toast.add({ severity: "warning", summary: "Rate Limited", detail: "Too many requests. Please try again later.", life: 3000 });
          return;
        }
  
        const data = await response.json();
  
        if (response.ok && data.success) {
          toast.add({ severity: "success", summary: "Success", detail: "Profile updated successfully!", life: 3000 });
          
          // Redirect after a short delay so user can see success message
          setTimeout(() => {
            router.push("/dashboard");
          }, 1500);
        } else {
          // Handle specific error types from backend
          const errorMessage = data.error || "Failed to update profile.";
          if (data.validationErrors) {
            // Handle field-specific validation errors from backend
            Object.entries(data.validationErrors).forEach(([field, message]) => {
              errors[field] = message;
            });
            
            // Set the step to the first one with errors
            if (["name", "username", "email", "role", "login", "nodeId"].some(field => data.validationErrors[field])) {
              currentStep.value = 0;
            } else if (["linkedinUrl", "twitterUsername", "blog", "location", "hireable"].some(field => data.validationErrors[field])) {
              currentStep.value = 1;
            } else {
              currentStep.value = 2;
            }
            
            toast.add({ severity: "error", summary: "Validation Error", detail: "Please correct the highlighted fields.", life: 3000 });
          } else {
            toast.add({ severity: "error", summary: "Error", detail: errorMessage, life: 3000 });
          }
        }
      } catch (error) {
        // Network errors or other exceptions
        console.error("Profile update error:", error);
        
        // Retry on network failures
        if (retryCount < maxRetries && (error instanceof TypeError || error.name === 'NetworkError')) {
          retryCount++;
          toast.add({ severity: "warning", summary: "Connection Issue", detail: `Retrying... (${retryCount}/${maxRetries})`, life: 2000 });
          setTimeout(attemptSubmit, 2000); // Retry after 2 seconds
        } else {
          toast.add({ 
            severity: "error", 
            summary: "Update Failed", 
            detail: "Could not connect to server. Please check your internet connection and try again.", 
            life: 5000 
          });
        }
      } finally {
        if (retryCount === 0 || retryCount >= maxRetries) {
          isSubmitting.value = false;
        }
      }
    };
  
    await attemptSubmit();
  };

  // Fetch blog data when the component is mounted
onMounted(fetchUser);
  </script>
  
  <style scoped>
  .container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
  }
  .title {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .progress {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .step {
    flex: 1;
    text-align: center;
    padding: 5px;
    border-bottom: 2px solid #aaa;
    transition: all 0.3s ease;
  }
  .active {
    border-bottom: 2px solid #2196F3;
    font-weight: bold;
    color: #2196F3;
  }
  label {
    display: block;
    margin: 0.75rem 0 0.25rem 0;
    font-weight: 500;
  }
  .p-inputtext, .p-textarea {
    width: 100%;
    margin-bottom: 0.25rem;
  }
  .error {
    color: #f44336;
    font-size: 0.75rem;
    display: block;
    margin-bottom: 0.75rem;
  }
  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
  }
  .button-group .p-button {
    min-width: 100px;
  }
  .checkbox-field {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }
  .checkbox-field label {
    margin: 0 1rem 0 0;
  }
  </style>