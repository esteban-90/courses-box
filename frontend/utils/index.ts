import qs from 'qs'
import { apiUrl } from '@/config'
import type { CoursePayload, CoursesPayload, ErrorPayload, Course as CourseType } from '@/types'

const getData = async (param: string) => {
  const response = await fetch(`${apiUrl}/courses${param}`, { method: 'GET' })
  const result = await response.json()
  const { status } = response
  const error = status >= 400 ? (result as ErrorPayload) : undefined
  const success = status >= 200 && status < 400 ? (result as CoursesPayload | CoursePayload) : undefined

  return { data: success?.data, error: error?.error?.message ?? '' }
}

type Data<D> = Promise<{ data: D; error: string }>

export const getCourses = () => getData('?populate=*') as Data<CourseType[]>
export const getCourseById = (id: string) => getData(`/${id}?populate=*`) as Data<CourseType>

export const getCoursesByQuery = (q: string) => {
  const query = qs.stringify(
    {
      populate: '*',
      filters: {
        $or: [{ title: { $containsi: q } }, { subtitle: { $containsi: q } }, { description: { $containsi: q } }],
      },
    },
    { encodeValuesOnly: true }
  )

  return getData(`?${query}`) as Data<CourseType[]>
}
