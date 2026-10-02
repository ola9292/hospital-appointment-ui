<script setup>
import { useAuthStore } from '@/stores/auth';
import { useAppointmentStore } from '@/stores/appointment';
import { ref, onMounted } from 'vue';

const appointmentStore = useAppointmentStore()
onMounted(() => {
    appointmentStore.myAppointments()
})
const cancelAppointment = (id) => {
    appointmentStore.cancelAppointment(id)
}
</script>

<template>
    <main class="w-[92%] max-w-7xl mx-auto border border-gray-100 rounded-lg shadow-sm p-4 sm:p-8 my-8">
        <h1>My Appointments</h1>
         <div v-if="appointmentStore.errorMessage" role="alert" class="alert alert-warning my-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{{ appointmentStore.errorMessage }}</span>
        </div>
        <div v-if="appointmentStore.showLoading">
            <p>Loading...</p>
        </div>
        <div v-else class="overflow-x-auto h-96 w-1/2">
            <div v-if="appointmentStore.appointments.length > 0">
                    <table class="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                    <tr>
                        <th></th>
                        <td>Doctor</td>
                        <td>Patient</td>
                        <td>Patient Email</td>
                        <td>Time</td>
                        <td>Date</td>
                        <td>Action</td>
                    </tr>
                    </thead>
                    <tbody>
                <tr v-for="(appointment, index) in appointmentStore.appointments" :key="appointment.is">
                    <th>{{ index + 1 }}</th>
                    <td>{{ appointment.doctor.name }}</td>
                    <td>{{ appointment.patient.name }}</td>
                    <td>{{ appointment.patient.email }}</td>
                    <td>{{ appointment.time }}</td>
                    <td>{{ appointment.date }}</td>
                    <td><button @click="cancelAppointment(appointment._id)" class="btn btn-xs btn-error">Cancel</button></td>
                </tr>
                </tbody>
                    </table>
            </div>
            <div v-else role="alert" class="alert alert-info my-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>No appointments available</span>
            </div>
            
        </div>
    </main>
    
</template>