<template>
  <div>
    <!-- Sidebar -->
    <div class="sidebar hidden lg:block fixed lg:max-w-[295px] w-full overflow-y-auto h-full bg-white z-[999]"
      id="sidebarHRIS">
      <div class="px-6 py-[50px] gap-y-[50px] flex flex-col">
        <div class="flex items-center justify-between">
          <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
            Dio Quiz
          </a>
          <a href="#" id="toggle-navbar" class="lg:hidden" onclick="toggleNavbar()">
            <svg class="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
              </path>
            </svg>
          </a>
        </div>
        <div class="flex flex-col gap-4">
          <div class="text-sm text-grey sidebar-tittle">Quiz Controll</div>
          <NuxtLink :to="{ name: 'dashboard-student' }" class="nav-link sidebar-item" exact-active-class="active">
            <img src="/assets/svgs/ic-users.svg" alt="">
            Student
          </NuxtLink>
          <NuxtLink :to="{ name: 'dashboard-question' }" class="nav-link sidebar-item" exact-active-class="active">
            <img src="/assets/svgs/ic-grid.svg" alt="">
            Question
          </NuxtLink>
        </div>
        <div class="flex flex-col gap-4">
          <div class="text-sm text-grey">Others</div>
          <button @click="$auth.logout()" class="nav-link sidebar-item">
            <img src="/assets/svgs/ic-signout.svg" alt="">
            Logout
          </button>
        </div>
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<script>
const sidebar_items = document.querySelectorAll('.sidebar-item')

function toggleNavbar() {
  navbar.classList.toggle('d-none')
  cover.classList.toggle('d-none')
}
</script>
