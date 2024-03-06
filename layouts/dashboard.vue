<template>
  <div>
    <!-- Sidebar -->
    <div :class="{ hidden: isSidebarHidden }"
      class="sidebar lg:block fixed lg:max-w-[295px] w-full overflow-y-auto h-full bg-white z-[10]">
      <div class="px-6 py-[50px] gap-y-[50px] flex flex-col">
        <div class="flex items-center justify-between">
          <button class="flex items-center mb-6 text-xl font-semibold text-gray-900">
            <img class="w-8 h-8 mr-2" src="/assets/images/logo.png" alt="logo" />
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
          <!-- Your NuxtLinks ... -->
          <NuxtLink :to="{ name: 'dashboard' }" class="rounded-2xl nav-link sidebar-item" exact-active-class="active">
            <img class="" src="/assets/svgs/ic-dollar.svg" alt="" />
            Overview
          </NuxtLink>
          <div class="text-sm text-grey sidebar-tittle">Content Controll</div>
          <NuxtLink :to="{ name: 'dashboard-category' }" class="nav-link sidebar-item" exact-active-class="active">
            <img src="/assets/svgs/ic-box.svg" alt="" />
            Portofolio Category
          </NuxtLink>
          <NuxtLink :to="{ name: 'dashboard-portofolio' }"
            class="nav-link sidebar-item " exact-active-class="active">
            <img src="/assets/svgs/ic-home.svg" alt="" />
            Portofolio
          </NuxtLink>
          <NuxtLink :to="{ name: 'dashboard-hero' }" class="nav-link sidebar-item" exact-active-class="active">
            <img src="/assets/svgs/ic-grid.svg" alt="" />
            Highlight Section
          </NuxtLink>
          <NuxtLink :to="{ name: 'dashboard-portosection' }" class="nav-link sidebar-item" exact-active-class="active">
            <img src="/assets/svgs/ic-box.svg" alt="" />
            Portofolio Section
          </NuxtLink>
          <NuxtLink :to="{ name: 'dashboard-youtube' }" class="nav-link sidebar-item" exact-active-class="active">
            <img src="/assets/svgs/ic-users.svg" alt="" />
            Youtube Section
          </NuxtLink>
          <NuxtLink :to="{ name: 'dashboard-promotion' }" class="nav-link sidebar-item" exact-active-class="active">
            <img src="/assets/svgs/ic-gift.svg" alt="" />
            Promotion Section
          </NuxtLink>
          <NuxtLink :to="{ name: 'dashboard-about' }" class="nav-link sidebar-item" exact-active-class="active">
            <img src="/assets/svgs/ic-briefcase.svg" alt="" />
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
    <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
          <!-- Top Section -->
    <section class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row">
      <div class="flex items-center justify-between gap-4">
        <button @click="toggleNavbar"   class="lg:hidden">
          <svg class="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
          </svg>
        </button>
      </div>
    </section>
    <Nuxt/>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      isSidebarHidden: true,
    };
  },
  methods: {
    toggleNavbar() {
      console.log("oke")
      this.isSidebarHidden = !this.isSidebarHidden;
    },
  },
};
</script>
