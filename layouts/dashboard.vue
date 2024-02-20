<template>
  <div>
    <!-- Sidebar -->
    <div
      :class="{ hidden: isSidebarHidden }"
      class="sidebar lg:block fixed lg:max-w-[295px] w-full overflow-y-auto h-full bg-white z-[1]"
      id="sidebarHRIS"
    >
      <div class="px-6 py-[50px] gap-y-[50px] flex flex-col">
        <div class="flex items-center justify-between">
          <button
            class="flex items-center mb-6 text-xl font-semibold text-gray-900"
          >
            <img
              class="w-8 h-8 mr-2"
              src="/assets/images/logo.png"
              alt="logo"
            />
            AKAKONTRAKTOR
          </button>
          <button @click="toggleNavbar" class="lg:hidden">
            <svg
              class="w-6 h-6 text-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div class="flex flex-col gap-4">
          <NuxtLink
            :to="{ name: 'dashboard' }"
            class="rounded-2xl nav-link sidebar-item"
            exact-active-class="active"
          >
            <img class="" src="/assets/svgs/ic-box.svg" alt="" />
            Overview
          </NuxtLink>
          <div class="text-sm text-grey sidebar-tittle">Content Controll</div>
          <NuxtLink
            :to="{ name: 'dashboard-category' }"
            class="nav-link sidebar-item"
            exact-active-class="active"
          >
            <img src="/assets/svgs/ic-box.svg" alt="" />
            Portofolio Category
          </NuxtLink>
          <NuxtLink
            :to="{ name: 'dashboard-portofolio' }"
            class="nav-link sidebar-item hover:bg-brightYellow hover:rounded-3xl"
            exact-active-class="active"
          >
            <img src="/assets/svgs/ic-grid.svg" alt="" />
            Portofolio
          </NuxtLink>
          <NuxtLink
            :to="{ name: 'dashboard-hero' }"
            class="nav-link sidebar-item"
            exact-active-class="active"
          >
            <img src="/assets/svgs/ic-grid.svg" alt="" />
            Hero Section
          </NuxtLink>
          <NuxtLink
            :to="{ name: 'dashboard-portosection' }"
            class="nav-link sidebar-item"
            exact-active-class="active"
          >
            <img src="/assets/svgs/ic-grid.svg" alt="" />
            Portofolio Section
          </NuxtLink>
          <NuxtLink
            :to="{ name: 'dashboard-youtube' }"
            class="nav-link sidebar-item"
            exact-active-class="active"
          >
            <img src="/assets/svgs/ic-grid.svg" alt="" />
            Youtube Section
          </NuxtLink>
          <NuxtLink
            :to="{ name: 'dashboard-promotion' }"
            class="nav-link sidebar-item"
            exact-active-class="active"
          >
            <img src="/assets/svgs/ic-grid.svg" alt="" />
            Promotion Section
          </NuxtLink>
          <NuxtLink
            :to="{ name: 'dashboard-about' }"
            class="nav-link sidebar-item"
            exact-active-class="active"
          >
            <img src="/assets/svgs/ic-grid.svg" alt="" />
            About Section
          </NuxtLink>
        </div>
        <div class="flex flex-col gap-4">
          <div class="text-sm text-grey">Others</div>
          <button @click="$auth.logout()" class="nav-link sidebar-item">
            <img src="/assets/svgs/ic-signout.svg" alt="" />
            Logout
          </button>
        </div>
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarHidden: true,
    }
  },
  methods: {
    toggleNavbar() {
      this.isSidebarHidden = !this.isSidebarHidden
    },
  },
}
</script>
