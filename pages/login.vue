<template>
  <section class="bg-gray-50 ">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
      >
        <img class="w-8 h-8 mr-2" src="/assets/images/logo.png" alt="logo" />
        AKAKONTRAKTOR DASHBOARD
      </a>
      <div
        class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 "
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl "
          >
            Login Akun
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="userLogin">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 "
                >Email Address</label
              >
              <input
                v-model="login.email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 "
                >Password</label
              >
              <input
                v-model="login.password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                required=""
              />
            </div>

            <button
              type="submit"
              class="w-full bg-yellow-300 text-black bg-primary-600 font-semibold hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Login',
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'decription', content: 'My page description' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },

  // Login logic
  auth: 'guest',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        // Save token to localStorage

        console.log(response)


      } catch (err) {
        console.log(err)
      }
      this.$router.push({
        name: 'dashboard',
      })
    },
  },

}
</script>
