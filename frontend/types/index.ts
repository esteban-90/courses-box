import type { SerializedError } from '@reduxjs/toolkit'

type WithAtLeast<T, K extends keyof T> = Required<Pick<T, K>> & Partial<Omit<T, K>>

export type LoginData = {
  /** User's username or email */
  identifier: string
  /** User's password */
  password: string
}

export type RegisterData = {
  /** User's email */
  email: string
  /** User's username */
  username: string
  /** Password confirmation */
  passwordConfirmation?: string
} & Pick<LoginData, 'password'>

export type User = Pick<RegisterData, 'email' | 'username'> & {
  id: number
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
}

export type UserPayload = {
  /** JWT token */
  jwt: string
  /** User data */
  user: User
}

type RequestState = 'pending' | 'fulfilled' | 'rejected'

export type UserState = Pick<UserPayload, 'jwt'> & {
  /** User's email and username */
  user: WithAtLeast<User, 'email' | 'username'>
  /** Request state */
  requestState?: RequestState
  /** Error payload from Strapi backend */
  error?: ErrorPayload
}

type AppError = WithAtLeast<SerializedError, 'message' | 'name'> & {
  status: number
  details: any
}

type Meta = {
  pagination?: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

type WithDataErrorAndMeta<D> = { data: D; error: AppError; meta: Meta }
type WithData<D> = Pick<WithDataErrorAndMeta<D>, 'data'>
type WithDataAndError<D> = Omit<WithDataErrorAndMeta<D>, 'meta'>
type WithDataAndMeta<D> = Omit<WithDataErrorAndMeta<D>, 'error'>
type WithIDAndAttributes<A = Record<string, unknown>> = { id: number; attributes: A }

export type ErrorPayload = WithDataAndError<null>

type Image = {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  url: string
}

export type Course = WithIDAndAttributes<{
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  link: string
  title: string
  subtitle: string
  cover: WithData<
    WithIDAndAttributes<
      Image & {
        alternativeText: string
        caption: string
        formats: {
          thumbnail: Image & { path: any }
          small: Image & { path: any }
          medium: Image & { path: any }
          large: Image & { path: any }
        }
        previewUrl: any
        provider: string
        provider_metadata: any
        createdAt: string
        updatedAt: string
      }
    >
  >
}>

export type CoursePayload = WithDataAndMeta<Course>
export type CoursesPayload = WithDataAndMeta<Course[]>
