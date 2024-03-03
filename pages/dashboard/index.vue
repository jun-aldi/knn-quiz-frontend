<template>
  <section>
    <!-- Main Content -->
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
    <div>
      <section class="pt-[50px]">
        <!-- Section Header -->
        <div class="mb-[30px]">
          <div class="flex items-center justify-between gap-6">
            <div>
              <div class="text-4xl font-bold text-dark">Statistics</div>
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
              <NuxtLink :to="{ name: 'dashboard-portofolio' }">
                <img src="/assets/svgs/ric-plus.svg" alt="" />
              </NuxtLink>
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
              <NuxtLink :to="{ name: 'dashboard-category' }">
                <img src="/assets/svgs/ric-plus.svg" alt="" />
              </NuxtLink>
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
              <NuxtLink :to="{ name: 'dashboard-portofolio' }">
                <img src="/assets/svgs/ric-plus.svg" alt="" />
              </NuxtLink>
            </div>
          </div>

          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-bold">Highlights Shows</p>
                <div class="text-[32px] font-bold text-brightYellow mt-[6px]">
                  {{ totalHeroes}}
                </div>
              </div>
              <NuxtLink :to="{ name: 'dashboard-hero' }">
                <img src="/assets/svgs/ric-plus.svg" alt="" />
              </NuxtLink>
            </div>
          </div>
          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-bold">Youtubes Shows</p>
                <div class="text-[32px] font-bold text-brightYellow mt-[6px]">
                  {{ totalYoutubes}}
                </div>
              </div>
              <NuxtLink :to="{ name: 'dashboard-youtube' }">
                <img src="/assets/svgs/ric-plus.svg" alt="" />
              </NuxtLink>
            </div>
          </div>
          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-bold">Promotions Shows</p>
                <div class="text-[32px] font-bold text-brightYellow mt-[6px]">
                  {{ totalPromotions}}
                </div>
              </div>
              <NuxtLink :to="{ name: 'dashboard-promotion' }">
                <img src="/assets/svgs/ric-plus.svg" alt="" />
              </NuxtLink>
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
      isLoading: false,

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
    this.isLoading = true
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
    } finally{
      this.isLoading = false
    }
  },
}
</script>
