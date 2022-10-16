import Home from '@/pages'
import { mockCourses } from '@/mocks/courses'

export default {
  title: 'Pages/Home',
  component: Home,
}

export const HomePage = (): JSX.Element => <Home courses={mockCourses.data} />
