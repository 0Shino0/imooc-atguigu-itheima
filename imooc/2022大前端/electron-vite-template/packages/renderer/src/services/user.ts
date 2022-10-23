import { updateUsername } from '@/api/user'
import type { HttpResponse } from '@/common/interface'
import { useRouter } from 'vue-router'

export const UserService = () => {
  const router = useRouter()

  const updateUser = async (username: string) => {
    const res = await updateUsername({
      username
    })
    const { code } = res as HttpResponse
    if (code === 200) {
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }
  }
  return {
    updateUser
  }
}
