<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Add Your Portofolio</div>
    <form class="w-full card" @submit.prevent="createPortofolio">
      <div class="form-group">
        <label for="" class="text-grey">Name</label>
        <input type="text" class="input-field" v-model="portofolio.title" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Title</label>
        <input type="text" class="input-field" v-model="portofolio.subtitle" />
      </div>

      <div class="form-group">
        <label for="" class="text-grey">Category</label>
        <p v-if="$fetchState.pending">Fetching roles...</p>
        <select
          v-else
          name="roles"
          v-model="portofolio.portofolio_category_id"
          class="appearance-none input-field form-icon-chevron_down"
        >
          <option
            :value="category.id"
            v-for="category in categories.data.result.data"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Location</label>
        <input type="text" class="input-field" v-model="portofolio.location" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Description</label>
        <textarea type="text" class="input-field" v-model="portofolio.desc" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Year</label>
        <input type="number" class="input-field" v-model="portofolio.year" />
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Create
      </button>
    </form>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      categories: [],
      portofolio: {
        title: '',
        subtitle: '',
        portofolio_category_id: '',
        location: '',
        desc: '',
        year: '',
      },
    }
  },

  async fetch() {
    this.categories = await this.$axios.get('/category', {
      params: {
        limit: 100,
      },
    })
  },
  methods: {
    async createPortofolio() {
      try {
        // Send Registration Data to Server
        let response = await this.$axios.post('/portofolio', this.portofolio)

        // Redirect to My Teams Page
        this.$router.push({ name: 'dashboard-portofolio' })

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
