<script setup>
import { useAuthStore } from '@/stores/auth';
import { useAppointmentStore } from '@/stores/appointment';
import { ref, onMounted } from 'vue';

const autStore = useAuthStore()
const appointmentStore = useAppointmentStore()

const formData = ref({
    doctorId:'',
    date:''
})
const time = ref(null)

const setTime = (value) => {
  time.value = value
  console.log(time.value)
}

const fetchSlots = () => {
    //alert(formData.value.date)
    // authStore.login(formData.value)
    appointmentStore.fetchAvailableSlots(formData.value)
}

const bookAppointment = () => {
  const bookData = {
    doctorId : formData.value.doctorId,
    date : formData.value.date,
    time : time.value
  }
  appointmentStore.bookAppointment(bookData)
  time.value = null
  console.log(bookData)
}

onMounted(() => { 
  appointmentStore.getDoctors()
})
</script>

<template>
  <h1>Book</h1>
  <main class="w-[92%] max-w-7xl mx-auto border border-gray-100 rounded-lg shadow-sm p-4 sm:p-8 my-8">
    <div class="border rounded-lg w-full max-w-sm mx-auto p-4 sm:p-6">
         <h1 class="text-3xl">Book Appointment</h1>
          <div v-if="appointmentStore.errorMessage" role="alert" class="alert alert-warning my-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{{ appointmentStore.errorMessage }}</span>
        </div>
         <form @submit.prevent="fetchSlots">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Doctors</legend>
                <select class="select" v-model="formData.doctorId">
                    <option disabled selected>Select Doctor</option>
                    <option v-for="doctor in appointmentStore.doctors" :key="doctor._id" :value="doctor._id">{{ doctor.name }}</option>
                </select>
            </fieldset>
             <fieldset class="fieldset">
                <legend class="fieldset-legend">Date</legend>
                <input type="date" class="input w-full" placeholder="Type here" v-model="formData.date"/>
            </fieldset>
            <div class="mt-4">
               <input type="submit" value="Fetch Slots" class="btn">
            </div>
         </form>
         <div>
          <p v-if="appointmentStore.slotLoading">Loading...</p>
          <ul class="my-4">
            <li 
              v-for="slot in appointmentStore.slots" 
              :key="slot" 
              class="badge badge-secondary badge-sm mr-2"
              @click="setTime(slot)">
              {{ slot }}
              </li>
          </ul>
          <div v-if="time" class="mt-4">
              <button @click="bookAppointment" class="btn">{{ appointmentStore.showLoading ? "Loading..." : "Book Appointment" }}</button>
          </div>
          <div v-if="appointmentStore.success" role="alert" class="alert alert-success my-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ appointmentStore.success }}</span>
          </div>
         </div>
    </div>
  </main>
</template>