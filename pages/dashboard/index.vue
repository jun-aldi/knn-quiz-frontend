<template>
  <section>
    <!-- Main Content -->
    <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
      <!-- Top Section -->
      <section class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row">
        <div class="flex items-center justify-between gap-4">
          <a href="#" id="toggleOpenSidebar" class="lg:hidden">
            <svg class="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
            </svg>
          </a>
          <div class="text-[32px] font-semibold text-dark">Overview</div>
        </div>
      </section>

      <section class="pt-[50px]">
        <!-- Section Header -->
        <div class="mb-[30px]">
          <div class="flex items-center justify-between gap-6">
            <div>
              <div class="text-xl font-medium text-dark">Statistics</div>
              <p class="text-grey">Your Portofolio Growth</p>
            </div>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:gap-11">
          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-bold">Portofolio</p>
                <div class="text-[32px] font-bold text-brightYellow mt-[6px]">
                  {{ totalPortofolios}}
                </div>
              </div>
              <a href="employee_create.html">
                <img src="/assets/svgs/ric-plus.svg" alt="" />
              </a>
            </div>
          </div>

          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-bold">Portofolio Category</p>
                <div class="text-[32px] font-bold text-brightYellow mt-[6px]">
                  {{ totalCategories}}
                </div>
              </div>
              <a href="#">
                <img src="/assets/svgs/ric-plus.svg" alt="" />
              </a>
            </div>
          </div>

          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-bold">Portofolio Shows</p>
                <div class="text-[32px] font-bold text-brightYellow mt-[6px]">
                  {{ totalShows}}
                </div>
              </div>
              <a href="employee_create.html">
                <img src="/assets/svgs/ric-plus.svg" alt="" />
              </a>
            </div>
          </div>

          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-bold">Heroes Shows</p>
                <div class="text-[32px] font-bold text-brightYellow mt-[6px]">
                  {{ totalHeroes}}
                </div>
              </div>
              <a href="#">
                <img src="/assets/svgs/ric-plus.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
<script>
export default {
  middleware: 'auth',
  layout: 'dashboard',

  data() {
    return {
      totalCategories: 0,
      totalPortofolios: 0,
      totalHeroes: 0,
      totalShows: 0,
      totalPromotions: 0,
      totalYoutubes: 0,

      categories: 0,
      portofolios: 0,
      heroes: 0,
      shows: 0,
      promotions: 0,
      youtubes: 0,

      fetchingPhotos: false,
    }
  },
  async fetch() {
    try {
      ; (this.categories = await this.$axios.get('/category', {
        params: {
          limit: 100,
        },
      })),
        (this.portofolios = await this.$axios.get('/portofolio', {
          params: {
            limit: 100,
          },
        })),
        (this.heroes = await this.$axios.get('/hero', {
          params: {
            limit: 100,
          },
        })),
        (this.shows = await this.$axios.get('/shows', {
          params: {
            limit: 100,
          },
        })),
        (this.youtubes = await this.$axios.get('/youtube', {
          params: {
            limit: 100,
          },
        })),
        (this.promotions = await this.$axios.get('/promosi', {
          params: {
            limit: 100,
          },
        })),
        (this.totalCategories = this.categories.data.result.total)
      this.totalPortofolios = this.portofolios.data.result.total
      this.totalHeroes = this.heroes.data.result.total
      this.totalShows = this.shows.data.result.total
      this.totalYoutubes = this.youtubes.data.result.total
      this.totalPromotions = this.promotions.data.result.total
    } catch (error) {
      console.error('Error fetching photos:', error)
      window.alert("An error occurred: " + error.message);
    }
  },
}
</script>
