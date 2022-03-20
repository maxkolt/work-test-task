<template>
  <div class="axios-container page-container">
    <div class="page-title">Список пользователей</div>
    <div class="user-info-container">
      <el-card class="box-card">
        <div class="card-header">
          <el-button class="button" type="text" @click="loadUsersServer">
            Загрузить
          </el-button>
        </div>
      </el-card>
    </div>
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" v-if="usersLoadingStarted">
        <el-skeleton style="width: 240px" :loading="usersLoadingStarted" animated>
          <template #template>
            <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
            <div style="padding: 14px">
              <el-skeleton-item variant="h3" style="width: 50%" />
              <div class="skeleton-custom">
                <el-skeleton-item variant="text" style="margin-right: 16px" />
                <el-skeleton-item variant="text" style="width: 30%" />
              </div>
            </div>
          </template>
        </el-skeleton>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="8"
        v-else
        v-for="user in users"
        :key="user"
      >
        <el-card class="card" shadow="hoover">
          <img :src="user.avatar" class="image" :data="user.id" @click.prevent="showUserDetails" alt="img"/>
          <div>
            <div class="bottom">
              <div class="email">{{ user.email }}</div>
            </div>
          </div>
        </el-card>

      </el-col>
    </el-row>
    <el-dialog
      class="dialog"
      v-model="dialogVisible"
      title="Полная информаци о пользователе"
      width="60%"
      center
    >
      <el-card class="card card-dialog" shadow="never" v-if="selectedUser">
        <div v-if="!dialogEditable">
          <el-row :gutter="20">
            <el-col :span="6">
              <img v-if="!dialogEditable" :src="selectedUser.avatar" class="image" alt="img"/>
            </el-col>
            <el-col :span="18">
              <h2>{{ selectedUser.first_name }} {{ selectedUser.last_name }}</h2>
              <div class="email">#{{ selectedUser.id }}: {{ selectedUser.email }}</div>
            </el-col>
          </el-row>
        </div>
        <div v-else>
          <el-row :gutter="20">
            <el-col :span="12" class="dialog-field">
              <el-input v-model="selectedUser.first_name" placeholder="Имя" />
            </el-col>
            <el-col :span="12" class="dialog-field">
              <el-input v-model="selectedUser.last_name" placeholder="Фамилия" />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="dialog-field">
              <el-input v-model="selectedUser.email" placeholder="Email" />
            </el-col>
          </el-row>
        </div>
      </el-card>
      <template #footer>
        <div class="dialog-footer" v-if="!dialogEditable">
          <el-button @click="dialogVisible = false">Закрыть</el-button>
          <el-button type="primary" @click="startEditCurrentUser">
            Редактировать
          </el-button>
          <el-button type="danger" @click="removeUser"> Удалить </el-button>
        </div>
        <div class="dialog-footer" v-if="dialogEditable">
          <el-button @click="cancelEditing">Отменить</el-button>
          <el-button type="primary" @click="saveUser"> Сохранить </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import axios from '../utils/axios'

declare interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar?: string
}

export default defineComponent({
  name: 'Axios',
  setup() {
    const data = reactive({
      usersLoadingStarted: false,
      dialogVisible: false,
      dialogEditable: false,
      users: [] as Array<User>,
      selectedUser: {
        id: -1,
        email: '',
        first_name: '',
        last_name: '',
        avatar: ''
      } as User
    })
    const loadUsersServer = () => {
      data.usersLoadingStarted = true
      axios
        .get('https://reqres.in/api/users?page=2')
        .then((response) => {
          console.log(JSON.stringify(response.data.data))
          data.users = response.data.data
          localStorage.setItem('users', JSON.stringify(data.users))
          data.usersLoadingStarted = false
        })
        .catch((error) => {
          console.error(error)
        })
    }
    const loadUserDataById = (id: string) => {
      const usersLS = localStorage.getItem('users')
      if (usersLS) {
        const users: Array<User> = JSON.parse(usersLS) as Array<User>
        return users.find((i) => i.id.toString() === id.toString())
      }
      return null
    }
    const loadUserData = (event: Event) => {
      if (event && event.target) {
        const id = (event.target as HTMLInputElement).getAttribute('data')
        console.log(`User Id for details: ${id}`)
        return loadUserDataById(id as string)
      }
      return null
    }

    const showUserDetails = (event: Event) => {
      data.selectedUser = loadUserData(event)
      data.dialogVisible = true
    }

    const startEditCurrentUser = () => {
      data.dialogEditable = true
    }
    const saveUser = () => {
      const usersLS = localStorage.getItem('users')
      if (usersLS) {
        const users: Array<User> = JSON.parse(usersLS) as Array<User>
        const objIndex = users.findIndex(
          (obj) => obj.id.toString() === data.selectedUser.id.toString()
        )
        console.log('Перед обновлением: ', users[objIndex])
        users[objIndex].first_name = data.selectedUser.first_name
        users[objIndex].last_name = data.selectedUser.last_name
        users[objIndex].email = data.selectedUser.email
        localStorage.setItem('users', JSON.stringify(users))
        console.log('После обновления: ', users[objIndex])
        data.users = users
        ElNotification({
          title: 'Ура!',
          message: 'Данные сохранены',
          type: 'success'
        })
      }
      data.dialogEditable = false
    }

    const cancelEditing = () => {
      data.selectedUser = loadUserDataById(data.selectedUser.id)
      data.dialogEditable = false
    }

    const removeUser = () => {
      const usersLS = localStorage.getItem('users')
      if (usersLS) {
        const users: Array<User> = JSON.parse(usersLS) as Array<User>
        const objIndex = users.findIndex(
          (obj) => obj.id.toString() === data.selectedUser.id.toString()
        )
        console.log('ID пользователя для удаления: ', data.selectedUser.id.toString())
        if (objIndex > -1) {
          users.splice(objIndex, 1)
        }
        localStorage.setItem('users', JSON.stringify(users))
        data.users = users
        console.log('Пользователи после удаления: ', users)
        ElNotification({
          title: 'Ура!',
          message: `Пользователь #${data.selectedUser.id} - ${data.selectedUser.first_name} ${data.selectedUser.last_name}  был удален`,
          type: 'success'
        })
      }
      data.dialogVisible = false
    }

    return {
      removeUser,
      loadUsersServer,
      showUserDetails,
      loadUserData,
      startEditCurrentUser,
      cancelEditing,
      saveUser,
      ...toRefs(data)
    }
  },
  mounted() {
    const usersLS = localStorage.getItem('users')
    if (usersLS) {
      const users: Array<User> = JSON.parse(usersLS) as Array<User>
      this.users = users
    }
  }
})
</script>

<style lang="stylus" scoped>

.axios-container {

  .user-info-container, .button {
    display flex
    justify-content center
    width 100%
    font-size 20px

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .box-card {
      width: 180px;
      margin-bottom 1rem
    }
  }
}


.card {
  margin: 1rem
  height 150px;

  &-dialog {
    border: none !important;
  }

  .image {
    width: 70px;
    height 70px;
    border-radius 50%;
    object-fit: cover;
    cursor: pointer;
  }
}

.skeleton-custom {
  display: flex;
  align-items: center;
  justify-items: space-between;
  margin-top: 16px;
  height: 16px;
}

.dialog-field {
  margin-bottom: 10px;
}
</style>
