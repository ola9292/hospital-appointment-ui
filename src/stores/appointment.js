import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useAppointmentStore = defineStore('appointmentStore',  {
        state:() => {
            return{
                user: null,
                errors: {},
                errorMessage: null,
                slots: null,
                slotLoading: false,
                doctors: [],
                success: null
            }
        },
        actions:{
           async fetchAvailableSlots(formData){
            if(localStorage.getItem('token')){
                try {
                    this.slotLoading = true
                    const response = await axios.get(
                    "/api/appointments",{
                        params: {
                                doctorId: formData.doctorId, 
                                date: formData.date
                            },
                            headers:{
                                authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        }
                    );
                    console.log(response.data);
                    this.slotLoading = false
                    this.slots = response.data.slots
                    // this.router.push({name: 'home'});
                } catch (error) {
                    // console.error(error);
                    console.log(error.response.data)
                     this.errorMessage = error.response.data.message
                      this.slotLoading = false
                     if( error.response.data.errors){
                        error.response.data.errors.forEach(err => {
                            this.errors[err.field] = err.message;
                        });
                    }
                } finally {
                    console.log("Request completed");
                }
            }
            },
            async getDoctors() {
                if(localStorage.getItem('token')){
                     try {
                    const response = await axios.get(
                    "api/doctors",
                    {
                       headers:{
                            authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                    );
                    console.log(response.data.data);
                    this.doctors = response.data.data
                } catch (error) {
                    console.error(error);
                    this.errorMessage = error.response.data.message
                } finally {
                    console.log("Request completed");
                }
                }
            },
            async bookAppointment(formData){
                 if(localStorage.getItem('token')){
                    this.slotLoading = true
                     try {
                        const response = await axios.post(
                        "api/appointments",formData,
                        {
                        headers:{
                                authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        }
                        );
                        console.log(response.data);
                        this.success = response.data.message
                        this.slots = null
                         this.slotLoading = false
                    } catch (error) {
                        console.error(error);
                        this.errorMessage = error.response.data.message
                    } finally {
                        console.log("Request completed");
                    }
                 }
            }
        }
})