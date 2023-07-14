<template>
  <section>
    <div class="container h-full lg:px-40 sm:px-10">
      <div style="background-color: rgb(248, 250, 255)" class="shadow-md">
        <div
          class="relative flex flex-wrap p-4 text-lg md:mt-12 blue-box"
          style="cursor: auto"
        >
          <blockquote
            class="w-full p-6 border-gray-200 xl:border-r-2 sm:w-1/2"
            style="cursor: auto"
          >
            <div class="max-w-md mx-auto overflow-hidden">
              <div class="px-6 py-4 bg-white">
                <div class="flex items-center justify-center">
                  <div class="p-3 bg-gray-300 rounded-full">
                    <img
                      class="object-cover w-24 h-24 rounded-full"
                      src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                      alt="Profile Photo"
                    />
                  </div>
                </div>
                <div class="mt-4 text-center">
                  <h3 class="text-xl font-medium text-gray-900">
                    {{ student.name }}
                  </h3>
                  <p class="text-sm text-gray-600">{{ student.nim }}</p>
                  <p class="text-sm text-gray-600">
                    {{ student.program_name }}
                  </p>
                  <div class="py-3 mt-2">
                    <div class="grid justify-center grid-cols-3 gap-2 mt-1">
                      <div
                        class="px-3 py-1 text-sm font-semibold text-pink-500 rounded-full"
                      >
                        Visualitik <br />
                        <span class="text-xl">{{ total_visual }}</span>
                      </div>
                      <div
                        class="px-3 py-1 text-sm font-semibold text-teal-500 rounded-full"
                      >
                        Kinestetik <br />
                        <span class="text-xl">{{ total_kinestetik }}</span>
                      </div>
                      <div
                        class="px-3 py-1 text-sm font-semibold text-purple-500 rounded-full"
                      >
                        Auditori
                        <br />
                        <span class="text-xl">{{ total_auditorial }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div v-for="(item, index) in arrayData" :key="index">
                      <p class="mt-4 text-sm font-bold text-yellow-500">
                        Tetangga ke-{{ getTetanggaKeValue(item) }} Target:
                        {{ getTargetValue(item) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </blockquote>
          <blockquote
            class="w-full p-6 border-gray-200 sm:w-1/2"
            style="cursor: auto"
          >
            <div class="max-w-md mx-auto overflow-hidden">
              <div class="px-6 py-4 bg-white">
                <div class="flex items-center justify-center">
                  <div class="p-3">
                    <svg
                      class="object-cover w-24 h-24 rounded-full"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      style="fill: #f25081"
                    >
                      <path
                        d="M45.928,7H18.072C11.957,7,7,11.957,7,18.072v27.856C7,52.043,11.957,57,18.072,57h27.856C52.043,57,57,52.043,57,45.928	V18.072C57,11.957,52.043,7,45.928,7z M37.67,44.644c-1.702,0-4.09-1.045-4.09-3.493c0-2.448,1.522-3.881,3.672-4.299	c0.851-0.165,1.785-0.354,2.603-0.522c0.868-0.178,1.489-0.941,1.489-1.827l0-11.266c0-0.534-0.489-0.934-1.012-0.828l-13.153,2.655	c-0.526,0.106-0.904,0.568-0.904,1.105v16.056c0,2.3-0.347,5.724-5.469,5.724c-1.697,0-4.079-1.042-4.079-3.484	s1.519-3.871,3.662-4.288c0.919-0.179,1.935-0.385,2.797-0.561c0.735-0.151,1.258-0.8,1.253-1.55l-0.134-18.631	c-0.008-1.06,0.738-1.976,1.777-2.184l15.531-3.116c0.795-0.159,1.537,0.444,1.537,1.255c0.001,5.388,0.003,22.895,0.003,23.516	C43.153,41.211,42.805,44.644,37.67,44.644z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="mt-4 text-center">
                  <h3
                    v-if="Type === 'V'"
                    class="text-xl font-medium text-gray-900"
                  >
                    Visual Persons
                  </h3>
                  <h3
                    v-else-if="Type === 'A'"
                    class="text-xl font-medium text-gray-900"
                  >
                    Auditory Persons
                  </h3>
                  <h3
                    v-else-if="Type === 'K'"
                    class="text-xl font-medium text-gray-900"
                  >
                    Kinesthetic Persons
                  </h3>
                  <VisualDesc v-if="Type === 'V'"> </VisualDesc>
                  <AuditoryDesc v-else-if="Type === 'A'"> </AuditoryDesc>
                  <KinestheticDesc v-else-if="Type === 'K'"> </KinestheticDesc>
                </div>
                <div>
                  <VisualJobs v-if="Type === 'V'"> </VisualJobs>
                  <AuditoryJobs v-else-if="Type === 'A'"> </AuditoryJobs>
                  <KinestheticJobs v-else-if="Type === 'K'"> </KinestheticJobs>
                </div>
              </div>
            </div>
          </blockquote>
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
      detailType: {},
      Visual: null,
      Kinesthetic: null,
      Auditorial: null,
      UserId: null,
      Id: null,
      Type: '',
      arrayData: [],
      total_kinestetik: 0,
      total_auditorial: 0,
      total_visual: 0,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.get('/student', {
          params: {
            user_id: this.$store.state.auth.user.id,
          },
        })
        this.detailType = response.data.result
        this.Visual = response.data.result.amount_visual
        this.Kinesthetic = response.data.result.amount_kinesthetic
        this.Auditorial = response.data.result.amount_auditorial
        this.Id = response.data.result.id
        this.UserId = response.data.result.user_id
        this.postKNN(
          this.Visual,
          this.Kinesthetic,
          this.Auditorial,
          this.Id,
          this.UserId
        )
      } catch (error) {
        console.error(error)
      }
    },
    // countVariables(item) {
    //   const targetMatch = item.match(/target: \['(.*)'\]/);
    //   const total_neigh = targetMatch ? targetMatch[1] : '';
    //   console.log(total_neigh);
    //   switch (total_neigh) {
    //     case 'V':
    //       this.total_visual++;
    //       break;
    //     case 'A':
    //       this.total_kinestetik++;
    //       break;
    //     case 'K':
    //       this.total_auditorial++;
    //       break;
    //   }
    // },
    getTetanggaKeValue(item) {
      return item.match(/Tetangga ke-(\d+)/)[1]
    },
    getTargetValue(item) {
      const targetMatch = item.match(/target: \['(.*)'\]/)
      return targetMatch ? targetMatch[1] : ''
    },
    async postKNN(Visual, Kinesthetic, Auditorial, id, user_id) {
      const data = {
        V: Visual,
        K: Kinesthetic,
        A: Auditorial,
      }

      try {
        const response = await this.$axios.post(
          'https://dioquiz.my.id/API/single',
          data
        )
        console.log(response.data)
        this.Type = response.data.Prediksi
        this.arrayData = response.data.Data
        for (const item of this.arrayData) {
          const targetValue = item.match(/target: \[\'(\w)\'\]/)[1]

          if (targetValue === 'V') {
            this.total_visual++
          } else if (targetValue === 'A') {
            this.total_auditorial++
          } else if (targetValue === 'K') {
            this.total_kinestetik++
          }
        }
      } catch (error) {
        console.error(error)
      }

      try {
        const response = await this.$axios.post(`/student/update/${id}`, {
          amount_visual: Visual,
          amount_kinesthetic: Kinesthetic,
          amount_auditorial: Auditorial,
          type: this.Type,
          user_id: user_id,
        })
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
