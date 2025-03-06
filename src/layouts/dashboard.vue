<template>
    <div>
      <div class="flex">
        <Sidebar />
        <main class="flex-1 p-6">
          <slot />
        </main>
      </div>
   
    </div>
  </template>
  
  <script setup>
  import Sidebar from "@/components/dashboard/Sidebar.vue";
    import 'primeicons/primeicons.css'
//Apply Middleware to All Dashboard Pages
  definePageMeta({ middleware: "auth" });
  </script>
  