<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore()

onMounted(() => {
  authStore.getUser()

})
</script>

<template>
  <header>
    <div class="navbar bg-base-100 shadow-sm">
      <div class="flex-1">
        <a href="/" class="btn btn-ghost text-xl">HMI</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li v-if="!authStore.user"><a><RouterLink :to="{name: 'register'}">Register</RouterLink></a></li>
          <li v-if="!authStore.user"><a><RouterLink :to="{name: 'login'}">Login</RouterLink></a></li>
          <li v-if="authStore.user"> <span>{{ authStore.user.name }}</span></li>
          <li v-if="authStore.user">
             <form @submit.prevent="authStore.logout">
                <input type="submit" value="Logout">
            </form>
          </li>
          <!-- <li>
            <details>
              <summary>Parent</summary>
              <ul class="bg-base-100 rounded-t-none p-2">
                <li><a>Link 1</a></li>
                <li><a>Link 2</a></li>
              </ul>
            </details>
          </li> -->
        </ul>
      </div>
    </div>
  </header>
  <div>
    <h1>HelloWorld</h1>
  </div>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
