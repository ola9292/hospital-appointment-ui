<script setup>
import { ref } from 'vue'

// Sample reactive data for services
const services = ref([
  { id: 1, name: 'General Consultation', duration: '30 mins', icon: '🩺' },
  { id: 2, name: 'Cardiology Checkup', duration: '45 mins', icon: '❤️' },
  { id: 3, name: 'Pediatrics', duration: '30 mins', icon: '👶' },
  { id: 4, name: 'Dental Care', duration: '60 mins', icon: '🦷' },
])

const selectedService = ref('')
const selectedDate = ref('')
</script>

<template>
  <main class="min-h-screen bg-base-200/50">
    <!-- Navigation Bar -->
    <!-- <header class="navbar bg-base-100 shadow-sm px-4 lg:px-12">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl font-bold text-primary gap-2">
          <span>🏥</span> CarePoint Health
        </a>
      </div>
      <div class="flex-none gap-2">
        <a href="#booking-section" class="btn btn-primary btn-sm md:btn-md">Book Now</a>
      </div>
    </header> -->

    <!-- Hero Section -->
    <section class="hero min-h-[70vh] bg-base-100">
      <div class="hero-content flex-col lg:flex-row-reverse gap-8 lg:gap-16 max-w-6xl">
        <div class="flex-1 text-center lg:text-left">
          <div class="badge badge-primary badge-outline mb-4">Fast & Secure Booking</div>
          <h1 class="text-4xl md:text-6xl font-extrabold text-base-content leading-tight">
            Healthcare when you need it most.
          </h1>
          <p class="py-6 text-base-content/70 text-lg">
            Skip the waiting room. Schedule appointments with top specialists in under two minutes with guaranteed real-time availability.
          </p>
          <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a href="/book" class="btn btn-primary btn-lg">Book an Appointment</a>
            <!-- <a href="#services-section" class="btn btn-outline btn-lg">Our Services</a> -->
          </div>
        </div>

        <!-- Quick Stats Card -->
        <div class="card bg-base-200 w-full max-w-sm shrink-0 shadow-xl border border-base-300">
          <div class="card-body">
            <h2 class="card-title text-base-content">Why Choose Us?</h2>
            <div class="space-y-4 my-2">
              <div class="flex items-center gap-4">
                <div class="badge badge-success badge-lg p-3">✓</div>
                <div>
                  <p class="font-bold text-sm">Verified Doctors</p>
                  <p class="text-xs text-base-content/60">Certified specialists</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="badge badge-info badge-lg p-3">⚡</div>
                <div>
                  <p class="font-bold text-sm">Instant Confirmation</p>
                  <p class="text-xs text-base-content/60">Real-time time slot updates</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="badge badge-warning badge-lg p-3">🔔</div>
                <div>
                  <p class="font-bold text-sm">Automated Reminders</p>
                  <p class="text-xs text-base-content/60">Email & SMS notifications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services-section" class="max-w-6xl mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-base-content">Available Specialties</h2>
        <p class="text-base-content/60 mt-2">Select a service to get started</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="service in services" 
          :key="service.id" 
          class="card bg-base-100 shadow-md hover:shadow-xl transition-all cursor-pointer border border-base-200"
        >
          <div class="card-body items-center text-center">
            <span class="text-4xl mb-2">{{ service.icon }}</span>
            <h3 class="card-title text-base text-base-content">{{ service.name }}</h3>
            <span class="badge badge-ghost badge-sm mt-1">{{ service.duration }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Booking Form CTA -->
    <section id="booking-section" class="max-w-4xl mx-auto px-4 py-12 mb-16">
      <div class="card bg-primary text-primary-content shadow-2xl">
        <div class="card-body p-8 md:p-12">
          <h2 class="card-title text-2xl md:text-3xl font-bold mb-2">Ready to Schedule Your Visit?</h2>
          <p class="opacity-90 mb-6">Choose your preferred date and department to view real-time available time slots.</p>

          <!-- <form @submit.prevent class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="form-control w-full">
              <label class="label text-primary-content font-semibold">Specialty</label>
              <select v-model="selectedService" class="select select-bordered text-base-content w-full">
                <option disabled value="">Select Department</option>
                <option v-for="s in services" :key="s.id" :value="s.id">{{ s.name }}</option>
              </select>
            </div>

            <div class="form-control w-full">
              <label class="label text-primary-content font-semibold">Date</label>
              <input v-model="selectedDate" type="date" class="input input-bordered text-base-content w-full" />
            </div>

            <div class="form-control w-full md:mt-8">
              <button class="btn btn-secondary w-full">
                Find Slots
              </button>
            </div>
          </form> -->
           <a href="/book" class="btn btn-secondary w-full">
                Find Slots
              </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer footer-center p-8 bg-base-100 text-base-content/60 border-t border-base-200">
      <aside>
        <p class="font-semibold text-base-content">CarePoint Hospital Appointment System</p>
        <p>Copyright © 2026 - All rights reserved</p>
      </aside>
    </footer>
  </main>
</template>