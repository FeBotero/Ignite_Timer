import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { History } from './pages/History'
import { DefaultLayout } from './layouts/DefaultLayout'
import { UserLayout } from './layouts/UserLayout'
import { HomeUser } from './pages/HomeUser'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
      {/* Assim podemos utilizar layouts diferente para usuarios e admnistradores */}
      <Route path="/admin/*" element={<UserLayout />}>
        <Route path="product" element={<HomeUser />} />
      </Route>
    </Routes>
  )
}
