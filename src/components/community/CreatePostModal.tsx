import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Image, Video, Send, FileText, Globe, ChevronDown } from 'lucide-react'
import { CommunityPost } from '@/types/community'
import { communityService } from '@/services/community'
import { useAuthStore } from '@/store'
import toast from 'react-hot-toast'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onPostCreated: (post: CommunityPost) => void
}

const CATEGORY_OPTIONS = [
  { value: 'comunidade', label: 'Comunidade' },
  { value: 'cinema_angolano', label: 'Cinema Angolano' },
  { value: 'series', label: 'Séries' },
  { value: 'filmes', label: 'Filmes' },
  { value: 'bastidores', label: 'Bastidores' },
  { value: 'eventos', label: 'Eventos' },
  { value: 'noticias', label: 'Notícias' },
]

const TYPE_OPTIONS = [
  { value: 'post', label: 'Publicação' },
  { value: 'review', label: 'Crítica' },
  { value: 'news', label: 'Notícia' },
  { value: 'event', label: 'Evento' },
]

export default function CreatePostModal({ isOpen, onClose, onPostCreated }: CreatePostModalProps) {
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('comunidade')
  const [postType, setPostType] = useState('post')
  const [images, setImages] = useState<string[]>([])
  const [video, setVideo] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showCategoryMenu, setShowCategoryMenu] = useState(false)
  const [showTypeMenu, setShowTypeMenu] = useState(false)
  const [tagsInput, setTagsInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { user, isAuthenticated } = useAuthStore()

  const resetForm = () => {
    setContent('')
    setCategory('comunidade')
    setPostType('post')
    setImages([])
    setVideo(null)
    setTags([])
    setTagsInput('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const remaining = 5 - images.length
    const filesToProcess = Array.from(files).slice(0, remaining)

    filesToProcess.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`"${file.name}" é muito grande. Máximo 5MB por imagem.`)
        return
      }

      if (!file.type.startsWith('image/')) {
        toast.error(`"${file.name}" não é uma imagem válida.`)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        setImages(prev => [...prev, dataUrl])
      }
      reader.readAsDataURL(file)
    })

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 50 * 1024 * 1024) {
      toast.error('O vídeo é muito grande. Máximo 50MB.')
      return
    }

    if (!file.type.startsWith('video/')) {
      toast.error('Formato de vídeo inválido.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setVideo(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Reset input
    if (videoInputRef.current) videoInputRef.current.value = ''
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const removeVideo = () => {
    setVideo(null)
  }

  const addTag = () => {
    const trimmed = tagsInput.trim().toLowerCase().replace(/\s+/g, '-')
    if (!trimmed) return
    if (tags.includes(trimmed)) {
      toast.error('Tag já adicionada')
      return
    }
    if (tags.length >= 5) {
      toast.error('Máximo de 5 tags')
      return
    }
    setTags(prev => [...prev, trimmed])
    setTagsInput('')
  }

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const handleSubmit = async () => {
    if (!isAuthenticated || !user) {
      toast.error('Precisas de fazer login para publicar')
      return
    }

    if (!content.trim()) {
      toast.error('Escreve algo para publicar')
      return
    }

    if (content.trim().length < 10) {
      toast.error('A publicação deve ter pelo menos 10 caracteres')
      return
    }

    setIsUploading(true)

    try {
      const newPost = await communityService.createPost({
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        content: content.trim(),
        category: category as CommunityPost['category'],
        type: postType as CommunityPost['type'],
        images: images.length > 0 ? images : undefined,
        video: video || undefined,
        tags,
      })

      onPostCreated(newPost)
      toast.success('Publicação criada com sucesso! 🎉')
      resetForm()
      onClose()
    } catch (err) {
      toast.error('Erro ao criar publicação. Tenta novamente.')
    } finally {
      setIsUploading(false)
    }
  }

  // Count characters
  const charCount = content.length
  const maxChars = 2000
  const isNearLimit = charCount > maxChars * 0.9

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-[5%] md:left-1/2 md:-translate-x-1/2 md:max-w-2xl w-full md:w-[90vw] z-50 overflow-hidden"
          >
            <div className="bg-lukusso-gray border border-gray-700 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                <h2
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Criar Publicação
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-lukusso-gold/20 flex items-center justify-center ring-2 ring-gray-700">
                      <span className="text-lukusso-gold font-bold text-sm">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  <div>
                    <p
                      className="text-white font-semibold text-sm"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {user?.name || 'Utilizador'}
                    </p>
                    <p
                      className="text-gray-500 text-xs"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      Publicando na comunidade
                    </p>
                  </div>
                </div>

                {/* Category & Type Selector */}
                <div className="flex gap-3">
                  {/* Category */}
                  <div className="relative flex-1">
                    <button
                      onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                      className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-lukusso-gray-light rounded-xl border border-gray-700 text-gray-300 text-sm hover:border-gray-600 transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span className="flex items-center gap-2">
                        <Globe size={16} className="text-lukusso-gold" />
                        {CATEGORY_OPTIONS.find(c => c.value === category)?.label}
                      </span>
                      <ChevronDown size={14} />
                    </button>

                    <AnimatePresence>
                      {showCategoryMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-lukusso-gray border border-gray-700 rounded-xl shadow-2xl p-2 z-50"
                        >
                          {CATEGORY_OPTIONS.map((cat) => (
                            <button
                              key={cat.value}
                              onClick={() => {
                                setCategory(cat.value)
                                setShowCategoryMenu(false)
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                category === cat.value
                                  ? 'bg-lukusso-gold/10 text-lukusso-gold font-semibold'
                                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                              }`}
                              style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Type */}
                  <div className="relative flex-1">
                    <button
                      onClick={() => setShowTypeMenu(!showTypeMenu)}
                      className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-lukusso-gray-light rounded-xl border border-gray-700 text-gray-300 text-sm hover:border-gray-600 transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span className="flex items-center gap-2">
                        <FileText size={16} className="text-lukusso-gold" />
                        {TYPE_OPTIONS.find(t => t.value === postType)?.label}
                      </span>
                      <ChevronDown size={14} />
                    </button>

                    <AnimatePresence>
                      {showTypeMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-lukusso-gray border border-gray-700 rounded-xl shadow-2xl p-2 z-50"
                        >
                          {TYPE_OPTIONS.map((type) => (
                            <button
                              key={type.value}
                              onClick={() => {
                                setPostType(type.value)
                                setShowTypeMenu(false)
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                postType === type.value
                                  ? 'bg-lukusso-gold/10 text-lukusso-gold font-semibold'
                                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                              }`}
                              style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                              {type.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Content Textarea */}
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => {
                      if (e.target.value.length <= maxChars) {
                        setContent(e.target.value)
                      }
                    }}
                    placeholder="O que tens a partilhar com a comunidade? 🎬"
                    className="w-full bg-lukusso-gray-light text-white px-5 py-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lukusso-gold/50 text-sm min-h-[160px] leading-relaxed placeholder:text-gray-500"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                    rows={6}
                  />
                  <div className="absolute bottom-3 right-3">
                    <span
                      className={`text-xs ${
                        isNearLimit ? 'text-lukusso-red' : 'text-gray-500'
                      }`}
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {charCount}/{maxChars}
                    </span>
                  </div>
                </div>

                {/* Image Preview Grid */}
                {images.length > 0 && (
                  <div className="space-y-2">
                    <p
                      className="text-gray-400 text-xs font-semibold flex items-center gap-1"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <Image size={14} />
                      Imagens ({images.length}/5)
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {images.map((img, index) => (
                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-lukusso-black">
                          <img
                            src={img}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-lukusso-red/80"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      {images.length < 5 && (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="aspect-square rounded-lg border-2 border-dashed border-gray-600 hover:border-lukusso-gold/50 flex items-center justify-center text-gray-500 hover:text-lukusso-gold transition-colors"
                        >
                          <Image size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Video Preview */}
                {video && (
                  <div className="relative rounded-xl overflow-hidden bg-lukusso-black aspect-video group">
                    <video
                      src={video}
                      className="w-full h-full object-contain"
                      controls
                    />
                    <button
                      onClick={removeVideo}
                      className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-lukusso-red/80"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* Tags */}
                <div className="space-y-2">
                  <p
                    className="text-gray-400 text-xs font-semibold"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Tags (opcional, máx. 5)
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 bg-lukusso-gold/10 text-lukusso-gold text-xs px-2.5 py-1 rounded-full"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-white transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {tags.length < 5 && (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={tagsInput}
                          onChange={(e) => setTagsInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          onBlur={addTag}
                          placeholder={tags.length === 0 ? "Adicionar tag..." : ""}
                          className="bg-transparent text-white text-xs px-2 py-1 outline-none w-24 placeholder:text-gray-600"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer - Media & Submit */}
              <div className="border-t border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  {/* Media Buttons */}
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={images.length >= 5}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-lukusso-gold hover:bg-gray-700/50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                      title="Adicionar imagens"
                    >
                      <Image size={18} />
                      <span className="hidden sm:inline">Foto</span>
                    </button>

                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => videoInputRef.current?.click()}
                      disabled={!!video}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-lukusso-gold hover:bg-gray-700/50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                      title="Adicionar vídeo"
                    >
                      <Video size={18} />
                      <span className="hidden sm:inline">Vídeo</span>
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={!content.trim() || isUploading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-lukusso-gold text-lukusso-black font-semibold rounded-xl hover:bg-lukusso-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {isUploading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        A Publicar...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Publicar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}