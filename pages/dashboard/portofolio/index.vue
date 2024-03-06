<template>
  <section>
        <!-- Loading -->
        <div v-if="isLoading" class="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
      <div class="flex flex-col items-center px-5 py-2 bg-white border rounded-lg">
        <div class="relative block w-20 h-5 mt-2 loader-dots">
          <div class="absolute top-0 w-3 h-3 mt-1 rounded-full bg-brightYellow"></div>
          <div class="absolute top-0 w-3 h-3 mt-1 rounded-full bg-brightYellow"></div>
          <div class="absolute top-0 w-3 h-3 mt-1 rounded-full bg-brightYellow"></div>
          <div class="absolute top-0 w-3 h-3 mt-1 rounded-full bg-brightYellow"></div>
        </div>
        <div class="mt-2 text-xs font-medium text-center text-gray-500">
          Loading...
        </div>
      </div>
    </div>

    <div >
    <!-- Top Section -->
    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row">
          <div>
            <div class="text-4xl font-medium text-dark">Portofolio</div>
            <p class="text-grey">Your portofolios</p>
          </div>
          <NuxtLink :to="{ name: 'dashboard-portofolio-create' }" class="btn btn-primary">Add Portofolio</NuxtLink>
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:gap-11">
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">In Total</p>
              <div v-if="portofolios" class="text-[32px] font-bold text-brightYellow mt-[6px]">{{ totalPortofolios }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">Portofolios</div>
            <p class="text-grey">The Design</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3">
        <p v-if="$fetchState.pending">Loading ...</p>
        <!-- Card -->
        <div class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0" v-else
          v-for="portofolio in portofolios.data.result.data">
          <NuxtLink :to="{ name: 'dashboard-portofolio-id', params: { id: portofolio.id } }"
            class="absolute inset-0 focus:ring-2 ring-primary rounded-[26px]"></NuxtLink>

          <img v-if="portofolio.photo.length > 0" :src="'https://akaapi.cloud/' + portofolio.photo[0].src" alt=""
            class="max-h-36" />
          <div class="mt-4 font-bold text-center text-dark">
            {{ portofolio.title }}
          </div>
          <p class="text-center text-grey">
            {{ portofolio.portofolio_category.name }}
          </p>
          <p class="font-semibold text-center text-brightYellow">
            {{ portofolio.year }}
          </p>
        </div>
        <div class="card md:min-h-[100px]" v-if="currentPage < lastPage">
          <div class="m-auto text-center">
            <button @click="loadMore"  type="button" class="btn btn-primary">
              Load More
            </button>
          </div>
        </div>
      </div>

    </section>
  </div>
  </section>

</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      isLoading: false,
      portofolios: [],
      porto: [],
      totalPortofolios: 0,
      currentPage: 1,
      lastPage: 1,
    }
  },
  methods: {

  },

  async fetch() {
    try {
      const response = await this.$axios.get('/portofolio', {
        params: {
          limit: 10,
        },
      });

      this.portofolios = response;
      this.porto = response.data.result;
      this.totalPortofolios = response.data.result.total;
      this.lastPage = response.data.result.last_page;
    } catch (error) {
      window.alert("An error occurred: " + error.message);
    }
  },
  methods: {
    async loadMore() {
      try {
        this.isLoading = true
        if (this.porto.next_page_url) {
          const response = await this.$axios.get(this.porto.next_page_url);

          this.porto.data.push(...response.data.result.data);
          this.totalporto = response.data.result.total;
          this.currentPage++;
          this.lastPage = response.data.result.last_page;
        }
      } catch (error) {
        window.alert("An error occurred: " + error.message);
      }
      finally{
        this.isLoading = false
      }
    },
  },

}
</script>
<style>
.loader-dots div {
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.loader-dots div:nth-child(1) {
  left: 8px;
  animation: loader-dots1 0.6s infinite;
}

.loader-dots div:nth-child(2) {
  left: 8px;
  animation: loader-dots2 0.6s infinite;
}

.loader-dots div:nth-child(3) {
  left: 32px;
  animation: loader-dots2 0.6s infinite;
}

.loader-dots div:nth-child(4) {
  left: 56px;
  animation: loader-dots3 0.6s infinite;
}

@keyframes loader-dots1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes loader-dots3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes loader-dots2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>
