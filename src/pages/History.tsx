import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, History as HistoryIcon, Clock, Calendar, Trash2, Search, X } from 'lucide-react'
import Header from '@/components/Header'
import { useContentStore, useAuthStore } from '@/store'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function History() {
  const { user, isAuthenticated } = useAuthStore()
  const { movies, watchHistory, removeFromWatchHistory, clearWatchHistory } = useContentStore()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'unfinished' | 'finished'>('all')
  const navigate = useNavigate()

  const items = useMemo(() => watchHistory
    .map(item => ({ item, movie: movies.find(movie => movie.id === item.movieId) }))
    .filter(({ movie, item }) => movie && movie.title.toLowerCase().includes(query.toLowerCase()) &&
      (filter === 'all' || (filter === 'finished' ? item.progress >= 95 : item.progress < 95))),
  [watchHistory, movies, query, filter])

  if (!isAuthenticated || !user) return <div className="min-h-screen bg-lukusso-black flex items-center justify-center"><div className="text-center"><h2 className="text-2xl font-bold text-white mb-4">Acesso Negado</h2><Link to="/login" className="btn-primary">Entrar</Link></div></div>

  const removeItem = (id: string) => {
    removeFromWatchHistory(id)
    toast.success('Item removido do histórico')
  }

  return (
    <div className="min-h-screen bg-lukusso-black pt-20">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
            <div className="flex items-center gap-3"><HistoryIcon className="text-lukusso-gold" size={32} /><div><h1 className="text-4xl font-bold text-white">Histórico</h1><p className="text-gray-400 mt-1">{watchHistory.length} títulos assistidos</p></div></div>
            {watchHistory.length > 0 && <button onClick={() => { if (confirm('Limpar todo o histórico?')) { clearWatchHistory(); toast.success('Histórico limpo') } }} className="flex items-center gap-2 text-red-400 hover:text-red-300"><Trash2 size={18} /> Limpar histórico</button>}
          </div>

          <div className="bg-lukusso-gray rounded-xl p-4 mb-7 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={19} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Pesquisar no histórico" className="w-full bg-lukusso-gray-light text-white rounded-lg py-3 pl-10 pr-10 outline-none focus:ring-2 focus:ring-lukusso-gold" />{query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X size={18} /></button>}</div>
            <div className="flex gap-2">{([['all','Todos'], ['unfinished','Por terminar'], ['finished','Concluídos']] as const).map(([value,label]) => <button key={value} onClick={() => setFilter(value)} className={`px-4 py-2 rounded-lg text-sm ${filter === value ? 'bg-lukusso-gold text-black font-semibold' : 'bg-lukusso-gray-light text-gray-300'}`}>{label}</button>)}</div>
          </div>

          {items.length === 0 ? <div className="text-center py-20 bg-lukusso-gray rounded-xl"><HistoryIcon size={52} className="text-gray-600 mx-auto mb-4"/><p className="text-gray-300 text-lg">{watchHistory.length ? 'Nenhum resultado encontrado' : 'Ainda não assististe nenhum filme'}</p><Link to="/home" className="btn-primary inline-flex mt-5">Explorar catálogo</Link></div> :
            <div className="space-y-4">{items.map(({ item, movie }) => movie && <motion.article layout key={item.id} className="bg-lukusso-gray rounded-xl p-4 flex flex-col sm:flex-row items-center gap-5 hover:bg-lukusso-gray-light transition-colors">
              <button onClick={() => navigate(`/watch/${movie.id}`)} className="relative w-full sm:w-40 h-24 rounded-lg overflow-hidden flex-shrink-0 group"><img src={movie.banner || movie.poster} alt={movie.title} className="w-full h-full object-cover"/><span className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="w-11 h-11 rounded-full bg-lukusso-gold flex items-center justify-center group-hover:scale-110 transition-transform"><Play size={21} className="text-black ml-0.5" fill="currentColor" /></span></span></button>
              <div className="flex-1 w-full"><div className="flex justify-between gap-3"><Link to={`/movie/${movie.id}`} className="text-lg font-semibold text-white hover:text-lukusso-gold">{movie.title}</Link><button onClick={() => removeItem(item.id)} title="Remover" className="p-2 text-gray-400 hover:text-red-400"><Trash2 size={18}/></button></div><div className="flex gap-4 text-sm text-gray-400 mb-3"><span className="flex items-center gap-1"><Calendar size={14}/>{movie.year}</span><span className="flex items-center gap-1"><Clock size={14}/>{movie.duration} min</span></div><div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-lukusso-gold h-2 rounded-full" style={{ width: `${Math.min(item.progress, 100)}%` }}/></div><div className="flex justify-between text-xs text-gray-400 mt-2"><span>{item.progress >= 95 ? 'Concluído' : `${Math.round(item.progress)}% assistido`}</span><span>{new Date(item.watchedAt).toLocaleString('pt-AO', { dateStyle: 'medium', timeStyle: 'short' })}</span></div></div>
            </motion.article>)}</div>}
        </motion.div>
      </main>
    </div>
  )
}