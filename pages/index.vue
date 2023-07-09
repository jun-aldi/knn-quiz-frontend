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
    <p class="align-content: center; text-red-50 m-2">{{ error_message }}</p>
    <form class="w-full card" @submit.prevent="takeQuiz">
      <div class="form-group">
        <label for="" class="text-grey">Nama Lengkap</label>
        <input type="text" class="input-field" required v-model="student.name" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Email</label>
        <input type="text" class="input-field" required v-model="student.email" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">NIM</label>
        <input type="text" class="input-field" required v-model="student.nim" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Program Studi</label>
        <input type="text" class="input-field" required v-model="student.program_name" />
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">Take Quiz</button>
    </form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      student: {
        name: '',
        nim: '',
        email: '',
        program_name: '',
        roles: 'student',
        password: '12345678',
        error_message: "",
        error: false,
      },
    }
  },
  methods: {
    async takeQuiz() {
      this.error = false;
      try {
        let response = await this.$axios.post('/register', this.student)

        // Authenticate the user with registration credentials
        await this.$auth.loginWith('local', {
          data: {
            email: this.student.email,
            password: this.student.password
          }
        })

        this.$router.push({
          name: 'questions-id',
          params: {
            id: 1, // use the studentId instead of hardcoding 1
          },
        })

      } catch (error) {
        this.error_message = error;
        this.error = true;
        console.log(error)
      }
    },
  }
}
</script >

