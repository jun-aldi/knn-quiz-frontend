<template>
  <section>
    <div
      class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0"
    >
      <!-- Top Section -->
      <section
        class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
      >
        <div class="flex items-center justify-between gap-4">
          <a href="#" id="toggleOpenSidebar" class="lg:hidden">
            <svg
              class="w-6 h-6 text-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              ></path>
            </svg>
          </a>
          <div class="text-[32px] font-semibold text-dark">Students</div>
        </div>
        <div class="flex items-center gap-4">
          <form class="shrink md:w-[516px] w-full">
            <input
              type="text"
              name=""
              id=""
              class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full"
              placeholder="Search people, team, project"
            />
          </form>
          <a
            href="#"
            class="flex-none w-[46px] h-[46px] bg-white rounded-full p-[11px] relative notification-dot"
          >
            <img src="/assets/svgs/ic-bell.svg" alt="" />
          </a>
        </div>
      </section>

      <section class="pt-[50px]">
        <!-- Section Header -->
        <div class="mb-[30px]">
          <div
            class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row"
          >
            <div>
              <div class="text-xl font-medium text-dark">Statistics</div>
              <p class="text-grey">Your students statistics</p>
            </div>
            <!-- <NuxtLink :to="{ name: 'companies-id-employees-create' }" class="btn btn-primary">Add Employee</NuxtLink> -->
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">In Total</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  425,000
                </div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Active</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  205,399
                </div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Inactive</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  142,593
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-purple-600">Visual</p>
                <div class="text-[32px] font-bold text-purple-600 mt-[6px]">
                  42
                </div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-pink-600">Auditori</p>
                <div class="text-[32px] font-bold text-pink-600 mt-[6px]">
                  20
                </div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-teal-600">Kinestetik</p>
                <div class="text-[32px] font-bold text-teal-600 mt-[6px]">
                  14
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
              <div class="text-xl font-medium text-dark">Student</div>
            </div>
          </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <button @click="searchTable()"></button>
          <vue-good-table
            :columns="options.columns"
            :rows="rows"
            :search-options="{ enabled: true, placeholder: 'Search table...' }"
            :line-numbers="true"
            :pagination-options="{
              enabled: true,
              mode: 'records',
              perPage: 20,
              perPageDropdown: [3, 7, 9],
              dropdownAllowAll: false,
              setCurrentPage: 2,
              prevLabel: 'prev',
              rowsPerPageLabel: 'Rows per page',
              ofLabel: 'of',
              pageLabel: 'page', // for 'pages' mode
              allLabel: 'All',
              infoFn: (params) => `my own page ${params.firstRecordOnPage}`,
            }"
            styleClass="vgt-table bordered"
            class="table"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'actions'">
                <button
                  class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="viewDetail(props.row.id)"
                >
                  View More
                </button>
              </span>
              <span v-if="props.column.field === 'created_at'">{{
                formatDate(props.row.created_at)
              }}</span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </div>
      </section>
    </div>

    <!-- Modal backdrop -->
    <div
      class="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-if="isModalVisible"
    >
      <!-- Modal content container -->
      <div class="w-full max-w-5xl mx-auto overflow-hidden bg-white rounded-lg">
        <!-- Modal header -->
        <div class="px-6 py-4 bg-gray-100">
          <h2 class="text-lg font-semibold text-gray-800">Student Detail</h2>
        </div>
        <!-- modal body -->
        <!-- modal body -->
        <div class="container w-full h-full px-2">
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
                        {{ detailStudent.name }}
                      </h3>
                      <p class="text-sm text-gray-600">
                        {{ detailStudent.nim }}
                      </p>
                      <p class="text-sm text-gray-600">
                        {{ detailStudent.program_name }}
                      </p>
                      <VisualDesc v-if="detailType.type === 'V'"> </VisualDesc>
                  <AuditoryDesc v-else-if="detailType.type === 'A'"> </AuditoryDesc>
                  <KinestheticDesc v-else-if="detailType.type === 'K'"> </KinestheticDesc>
                      <div class="py-3 mt-2">
                        <div class="grid justify-center grid-cols-3 gap-2 mt-1">
                          <div
                            class="px-3 py-1 text-sm font-semibold text-pink-500 rounded-full"
                          >
                            Auditori <br />
                            <span class="text-xl">{{ detailType.amount_auditorial }}</span>
                          </div>
                          <div
                            class="px-3 py-1 text-sm font-semibold text-teal-500 rounded-full"
                          >
                            Kinestetik <br />
                            <span class="text-xl">{{ detailType.amount_kinesthetic }}</span>
                          </div>
                          <div
                            class="px-3 py-1 text-sm font-semibold text-purple-500 rounded-full"
                          >
                            Visualitik
                            <br />
                            <span class="text-xl">{{ detailType.amount_visual }}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                  <VisualJobs v-if="detailType.type === 'V'"> </VisualJobs>
                  <AuditoryJobs v-else-if="detailType.type=== 'A'"> </AuditoryJobs>
                  <KinestheticJobs v-else-if="detailType.type === 'K'"> </KinestheticJobs>
                </div>
                    </div>
                  </div>
                </div>
              </blockquote>
              <blockquote
                class="w-full p-6 border-gray-200 xl:border-r-2 sm:w-1/2"
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
                      <h3 v-if="detailType.type === 'A'" class="text-xl font-medium text-gray-900">
                        Auditori Persons
                      </h3>
                      <h3 v-if="detailType.type === 'V'" class="text-xl font-medium text-gray-900">
                        Viusal Persons
                      </h3>
                      <h3 v-if="detailType.type === 'K'" class="text-xl font-medium text-gray-900">
                        Kinesthetic Persons
                      </h3>
                      <p class="text-xs text-gray-600 p-t-2">Answers</p>
                      <table
                        class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                      >
                        <thead
                          class="text-xs text-gray-700 uppercase bg-gray-50"
                        >
                          <tr>
                            <th scope="col" class="px-6 py-3">No</th>
                            <th scope="col" class="px-6 py-3">Answer</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="bg-white border-b"
                            v-for="detailResult in detailResults"
                          >
                            <td class="px-4 py-2 border">
                              {{ detailResult.question_id }}
                            </td>
                            <td class="px-4 py-2 border">
                              {{ detailResult.choice.name }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="isModalVisible = false"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Modal
    <div class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true"
      v-if="isModalVisible">
      <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        Background overlay
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>

        Modal panel
        <div
          class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            Modal header
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                  Profile Details
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    <span class="font-bold">Name:</span> {{ detailStudent.name }}
                  </p>
                  <p class="text-sm text-gray-500">
                    <span class="font-bold">NIM:</span> {{ detailStudent.nim }}
                  </p>
                  <p class="text-sm text-gray-500">
                    <span class="font-bold">Program Name:</span> {{ detailStudent.program_name }}
                  </p>
                  <p class="text-sm text-gray-500">
                    <span class="font-bold">Question:</span>
                  </p>
                  <div>
                    <ol class="pl-5">
                      <li class="text-sm text-gray-500" v-for="detailResult in detailResults">Question {{
                        detailResult.question_id }}
                        : {{
                          (() => {
                            switch (detailResult.answer) {
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
                  Add more profile details here
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button"
              class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="isModalVisible = false">
              Close
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </section>
</template>
<script>
import moment from 'moment'

export default {
  middleware: 'admin',
  layout: 'dashboard',
  data() {
    return {
      detailType: [],
      options: {
        columns: [
          {
            label: 'Name',
            field: 'name',
            sortable: true,
          },
          {
            label: 'Program Name',
            field: 'program_name',
            sortable: true,
          },
          {
            label: 'NIM',
            field: 'nim',
            sortable: true,
          },
          {
            label: 'Join Date',
            field: 'created_at',
            // type: 'date',
            sortable: true,
          },

          {
            label: 'Actions',
            field: 'actions',
            html: true,
            sortable: false,
          },
        ],
      },
      rows: [],
      detailStudent: [],
      detailResults: [],
      isModalVisible: false,
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    //fetch data from datatable
    fetchData() {
      this.$axios
        .get('/getuser')
        .then((response) => {
          this.rows = response.data.result
        })
        .catch((error) => {
          console.error(error)
        })
    },

    //search data from datatabel
    searchTable() {
      this.$refs.myTable.search(this.searchText)
    },

    //format date
    formatDate(date) {
      return moment.utc(date).format('DD-MM-YYYY')
    },
    //fetch data for detail studnt data
    async viewDetail(id) {
      //get student detail
      try {
        const response = await this.$axios.get(`/getuser?id=${id}`)
        this.detailStudent = response.data.result
        this.isModalVisible = true
      } catch (error) {
        console.error(error)
      }

      try {
        // this.detailResults = await this.$axios.get(`/answer?student_id=${id}`)
        const response = await this.$axios.get(`/answer?student_id=${id}`)
        this.detailResults = response.data.result.data
      } catch (error) {
        console.error(error)
      }

      try {
        // this.detailResults = await this.$axios.get(`/answer?student_id=${id}`)
        const response = await this.$axios.get(`/student?user_id=${id}`)
        this.detailType = response.data.result
      } catch (error) {
        console.error(error)
      }


    },
  },
}
</script>
