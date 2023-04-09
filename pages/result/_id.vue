<template>
  <section class="py-[50px] flex flex-col items-center justify-center px-4 items-center h-screen">
    <div class="max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
      <div class="px-6 py-4 bg-white">
        <div class="flex items-center justify-center">
          <img class="object-cover w-24 h-24 rounded-full" src="https://via.placeholder.com/150" alt="Profile Photo">
        </div>
        <div class="mt-4 text-center">
          <h3 class="text-xl font-medium text-gray-900">{{ student.name }}</h3>
          <p class="text-gray-600">NIM: {{ student.nim }}</p>
          <p class="text-gray-600">Program: {{ student.program_name }}</p>
          <p class="text-gray-600">Score: 90</p>
          <p class="mt-4 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet, velit eget
            porta eleifend, enim tortor eleifend libero, at tincidunt velit velit auctor enim.</p>
          <div>
            <h3 class="mb-2 text-lg font-bold">Questions:</h3>
            <ol class="pl-5">
              <p v-if="$fetchState.pending">Fetching questions...</p>
              <li class="mb-2" v-else v-for="result in results.data.result.data">Question {{ result.question_id }} : {{
                (() => {
                  switch (result.answer) {
                    case "1":
                      return "Sangat Baik";
                    case "2":
                      return "Kurang Baik";
                    case "3":
                      return "Tidak Baik";
                    default:
                      return "unknown answer";
                  }
                })()
              }}</li>
            </ol>
          </div>
          <div class="mt-6">
            <a href="#" class="font-bold text-blue-500 hover:text-blue-700">View More</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      student: {
        name: this.$store.state.auth.user.name,
        nim: this.$store.state.auth.user.nim,
        program_name: this.$store.state.auth.user.program_name,
      },
      results: {}
    }
  },
  async fetch() {
    this.results = await this.$axios.get('/answer', {
      params: {
        student_id: this.$store.state.auth.user.id,
      }
    })
  },
}
</script>
