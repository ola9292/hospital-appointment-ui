import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useAuthStore = defineStore('authStore',  {
        state:() => {
            return{
                user: null,
                errors: {},
                errorMessage: null
            }
        },
        actions:{
           async register(formData){
                try {
                    const response = await axios.post(
                    "/api/register", formData
                    );
                    console.log(response.data);
                    this.router.push({name: 'login'});
                } catch (error) {
                    // console.error(error);
                    // console.log(error.response.data)
                     this.errorMessage = error.response.data.message
                     if( error.response.data.errors){
                        error.response.data.errors.forEach(err => {
                            this.errors[err.field] = err.message;
                        });
                    }
                } finally {
                    console.log("Request completed");
                }
            },
           async login(formData){
                try {
                    const response = await axios.post(
                    "/api/login", formData
                    );
                    console.log(response.data);
                    const token = response.data.token
                    localStorage.setItem('token', token)
                    await this.getUser()
                    this.router.push({name: 'home'});
                } catch (error) {
                    // console.error(error);
                    console.log(error.response.data.message)
                    this.errorMessage = error.response.data.message
                    if( error.response.data.errors){
                        error.response.data.errors.forEach(err => {
                            this.errors[err.field] = err.message;
                        });
                    }
                    
                } finally {
                    console.log("Request completed");
                }
            },
            async getUser(){
                if(localStorage.getItem('token')){
                   try {
                        const response = await axios.get(
                        "/api/me",{
                            headers:{
                                authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                        console.log(response.data);
                        this.user = response.data.user

                    } catch (error) {
                        // console.error(error);
                        // console.log(error.response.data)
                        error.response.data.errors.forEach(err => {
                            this.errors[err.field] = err.message;
                        });
                    } finally {
                        console.log("Request completed");
                    }
                }
            },
            async logout(){
                if(localStorage.getItem('token')){
                   try {
                        const response = await axios.post(
                        "/api/logout",{
                            headers:{
                                authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                        console.log(response.data);
                        this.user = null,
                        this.errors = {}
                        localStorage.removeItem('token')
                        this.router.push({name: 'home'});
                    } catch (error) {
                       if( error.response.data.errors){
                            error.response.data.errors.forEach(err => {
                                this.errors[err.field] = err.message;
                            });
                        }
                        
                    } finally {
                        console.log("Request completed");
                    }
                }
            }
        }
})