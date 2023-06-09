import { Outlet } from 'react-router-dom'
import { HeaderUser } from '../components/HeaderUser'

export function UserLayout() {
  return (
    <div>
      <HeaderUser />
      <Outlet />
    </div>
  )
}
