<template>
  <div >
    <!-- Top Section -->


    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row">
          <div>
            <div class="text-4xl font-medium text-dark">Portofolio</div>
            <p class="text-grey">Your promotions</p>
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
        <p v-if="$fetchState.pending">Fetching portofolios...</p>
        <!-- Card -->
        <div class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0" v-else
          v-for="portofolio in portofolios.data.result.data">
          <NuxtLink :to="{ name: 'dashboard-portofolio-id', params: { id: portofolio.id } }"
            class="absolute inset-0 focus:ring-2 ring-primary rounded-[26px]"></NuxtLink>

          <img v-if="portofolio.photo.length > 0" :src="'https://akaapi.cloud/' + portofolio.photo[0].src" alt=""
            class="max-h-36" />
          <div class="mt-6 mb-1 font-semibold text-center text-dark">
            {{ portofolio.title }}
          </div>
          <p class="text-center text-grey">
            {{ portofolio.portofolio_category.name }}
          </p>
        </div>
        <div class="card md:min-h-[100px]">
          <div class="m-auto text-center">
            <button @click="loadMore" v-if="currentPage < lastPage" type="button" class="btn btn-primary">
              Load More
            </button>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
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
    },
  },

}
</script>
