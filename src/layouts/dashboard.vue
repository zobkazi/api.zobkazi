<template>
    <div>
      <div class="flex">
        <main class="flex-1 p-6">
          <slot />
        </main>
      </div>
   
    </div>
  </template>
  
  <script setup>
    import 'primeicons/primeicons.css'
//Apply Middleware to All Dashboard Pages
  definePageMeta({ middleware: "auth" });
  </script>
  