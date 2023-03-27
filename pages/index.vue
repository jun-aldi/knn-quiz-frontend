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
    <form class="w-full card">
      <div class="form-group">
        <label for="" class="text-grey">Nama Lengkap</label>
        <input type="text" class="input-field" required />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">NIM</label>
        <input type="text" class="input-field" required />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Program Studi</label>
        <input type="text" class="input-field" required />
      </div>
      <NuxtLink :to="{ name: 'questions-id' }" class="w-full btn btn-primary mt-[14px]">Next</NuxtLink>
    </form>
  </section>
</template>
<script>
export default {
  name: 'Quiz Page'
}
</script>
