import { Routes, Route, Navigate } from 'react-router-dom'
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
import History from '@/pages/History'
import Settings from '@/pages/Settings'
import Community from '@/pages/Community'
import CommunityPostView from '@/pages/CommunityPostView'
import PersonDetail from '@/pages/PersonDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<Home />} />
      <Route path="/filme/:slug" element={<MovieDetail />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/series/:id" element={<SeriesDetail />} />
      <Route path="/watch/:id" element={<Player />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/history" element={<History />} />
      <Route path="/profile/settings" element={<Settings />} />
      {/* Public community profiles - redirects to /profile */}
      <Route path="/profile/:userId" element={<Navigate to="/profile" replace />} />
      <Route path="/my-list" element={<MyList />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/payment/:planId" element={<Payment />} />
      <Route path="/comunidade" element={<Community />} />
      <Route path="/comunidade/:postId" element={<CommunityPostView />} />

      <Route path="/search" element={<Search />} />
      <Route path="/realizador/:slug" element={<PersonDetail />} />
      <Route path="/elenco/:slug" element={<PersonDetail />} />
      <Route path="/pessoa/:slug" element={<PersonDetail />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App