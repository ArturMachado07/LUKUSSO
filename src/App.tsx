import { Routes, Route } from 'react-router-dom'
import SplashScreen from '@/components/SplashScreen'
import Home from '@/pages/Home'
import MovieDetail from '@/pages/MovieDetail'
import SeriesDetail from '@/pages/SeriesDetail'
import Player from '@/pages/Player'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Profile from '@/pages/Profile'
import MyList from '@/pages/MyList'
import Admin from '@/pages/Admin'
import Subscription from '@/pages/Subscription'
import Payment from '@/pages/Payment'
import Search from '@/pages/Search'
import NotFound from '@/pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/series/:id" element={<SeriesDetail />} />
      <Route path="/watch/:id" element={<Player />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-list" element={<MyList />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/payment/:planId" element={<Payment />} />
      <Route path="/search" element={<Search />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App