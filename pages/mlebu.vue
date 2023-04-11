<template>
  <section class="py-[50px] flex flex-col items-center justify-center px-4">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
      <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
      Dio Quiz
    </a>
    <center class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Siap menghitung gaya belajar <br />
      berdasarkan pola anda
    </center>
    <form class="w-full card" @submit.prevent="userLogin">
      <div class="form-group">
        <label for="" class="text-grey">Email Address</label>
        <input type="email" class="input-field" v-model="login.email" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Password</label>
        <input type="password" class="input-field" v-model="login.password" />
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Sign In
      </button>
    </form>
  </section>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
      this.$router.push({
        name: 'dashboard',
      })
    }
  }
}
</script>
