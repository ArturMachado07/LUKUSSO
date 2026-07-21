import { Person } from '@/types/person'

function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** Gera iniciais para avatar placeholder */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

const peopleDatabase: Person[] = [
  {
    id: 'p-hugo-salvaterra',
    slug: 'hugo-salvaterra',
    name: 'Hugo Salvaterra',
    role: 'director',
    photo: '',
    bio: 'Realizador angolano com um olhar contemporâneo sobre a vida urbana em Luanda. O seu trabalho combina poesia visual, música e narrativas sociais, dando voz a histórias de resiliência e dignidade no quotidiano angolano.',
    birthYear: 1985,
    birthPlace: 'Luanda, Angola',
    nationality: 'Angolana',
    knownFor: ['Meu Semba'],
    awards: ['Menção Especial — Festival de Cinema Africano'],
    socials: {
      instagram: 'https://instagram.com',
    },
    agent: {
      name: 'Carla Mendes',
      agency: 'Lukusso Talent Agency',
      email: 'carla@lukusso-talent.ao',
      phone: '+244 923 000 100',
      website: 'https://lukusso.ao',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-jorge-antonio',
    slug: 'jorge-antonio',
    name: 'Jorge António',
    role: 'director',
    photo: '',
    bio: 'Cineasta de referência no cinema angolano e lusófono. Ao longo de décadas, Jorge António explorou o terror, o drama e a memória colectiva, com obras que marcaram gerações e projetaram Angola no mapa cinematográfico internacional.',
    birthYear: 1950,
    birthPlace: 'Angola',
    nationality: 'Angolana',
    knownFor: ['A Ilha dos Cães', 'O Miradouro da Lua'],
    awards: ['Prémio de Realização — Cinema Lusófono'],
    agent: {
      name: 'Ricardo Nunes',
      agency: 'África Film Management',
      email: 'ricardo@africafilm.ao',
      phone: '+244 923 000 200',
      location: 'Lisboa / Luanda',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-sergio-graciano',
    slug: 'sergio-graciano',
    name: 'Sérgio Graciano',
    role: 'director',
    photo: '',
    bio: 'Realizador conhecido por epopéias históricas e dramas de grande escala. Com "Njinga Rainha de Angola", consolidou a sua reputação ao retratar figuras icónicas da história angolana com rigor e emoção.',
    birthYear: 1975,
    birthPlace: 'Portugal',
    nationality: 'Portuguesa',
    knownFor: ['Njinga Rainha de Angola'],
    agent: {
      name: 'Ana Ribeiro',
      agency: 'Iberia Creative',
      email: 'ana@iberiacreative.com',
      phone: '+351 910 000 300',
      location: 'Lisboa, Portugal',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-maradona-dias',
    slug: 'maradona-dias-dos-santos',
    name: 'Maradona Dias dos Santos',
    role: 'director',
    photo: '',
    bio: 'Realizador angolano de cinema de ação e thriller. O seu estilo dinâmico e narrativas de ritmo acelerado trouxeram um novo fôlego ao cinema comercial angolano, com destaque para "Santana".',
    birthPlace: 'Luanda, Angola',
    nationality: 'Angolana',
    knownFor: ['Santana'],
    agent: {
      name: 'Pedro Kalemba',
      agency: 'Luanda Screen Agency',
      email: 'pedro@luandascreen.ao',
      phone: '+244 923 000 400',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-dorivaldo-fernandes',
    slug: 'dorivaldo-fernandes',
    name: 'Dorivaldo Fernandes',
    role: 'director',
    photo: '',
    bio: 'Cineasta angolano focado em thrillers e dramas familiares. Em "Plano B", explora as fronteiras entre justiça, vingança e as escolhas que definem o destino de uma família.',
    birthPlace: 'Angola',
    nationality: 'Angolana',
    knownFor: ['Plano B'],
    agent: {
      name: 'Sofia Baptista',
      agency: 'Lukusso Talent Agency',
      email: 'sofia@lukusso-talent.ao',
      phone: '+244 923 000 500',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-henrique-narciso',
    slug: 'henrique-narciso-dito',
    name: 'Henrique Narciso Dito',
    role: 'director',
    photo: '',
    bio: 'Realizador com sensibilidade para histórias de amizade e comunidade. O seu cinema celebra os laços humanos nos bairros de Luanda e a força da irmandade face às adversidades.',
    birthPlace: 'Luanda, Angola',
    nationality: 'Angolana',
    knownFor: ['Quem é o Pai do Miúdo?'],
    agent: {
      name: 'Miguel Costa',
      agency: 'Bairro Film Collective',
      email: 'miguel@bairrofilm.ao',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  // Elenco
  {
    id: 'p-euclides-teixeira',
    slug: 'euclides-teixeira',
    name: 'Euclides Teixeira',
    role: 'actor',
    photo: '',
    bio: 'Actor angolano com presença marcante no cinema e na televisão. Conhecido pela intensidade emocional e autenticidade nas interpretações de personagens do quotidiano urbano.',
    birthPlace: 'Luanda, Angola',
    nationality: 'Angolana',
    knownFor: ['Meu Semba'],
    agent: {
      name: 'Carla Mendes',
      agency: 'Lukusso Talent Agency',
      email: 'carla@lukusso-talent.ao',
      phone: '+244 923 000 100',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-willi-ribeiro',
    slug: 'willi-ribeiro',
    name: 'Willi Ribeiro',
    role: 'actor',
    photo: '',
    bio: 'Actor e performer com forte ligação à cultura urbana e à música. Em "Meu Semba", traz naturalidade e carisma a um elenco que celebra a identidade luandense.',
    birthPlace: 'Luanda, Angola',
    nationality: 'Angolana',
    knownFor: ['Meu Semba'],
    agent: {
      name: 'Carla Mendes',
      agency: 'Lukusso Talent Agency',
      email: 'carla@lukusso-talent.ao',
      phone: '+244 923 000 100',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-eliane-da-silva',
    slug: 'eliane-da-silva',
    name: 'Eliane da Silva',
    role: 'actor',
    photo: '',
    bio: 'Actriz angolana com carreira em teatro e cinema. Destaca-se pela sensibilidade e força dramática, dando vida a personagens femininas complexas e contemporâneas.',
    birthPlace: 'Luanda, Angola',
    nationality: 'Angolana',
    knownFor: ['Meu Semba'],
    agent: {
      name: 'Sofia Baptista',
      agency: 'Lukusso Talent Agency',
      email: 'sofia@lukusso-talent.ao',
      phone: '+244 923 000 500',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-clemente-chimuco',
    slug: 'clemente-chimuco',
    name: 'Clemente Chimuco',
    role: 'actor',
    photo: '',
    bio: 'Actor angolano com presença cénica forte e versatilidade. Participou em produções que exploram a realidade social e cultural de Angola.',
    birthPlace: 'Angola',
    nationality: 'Angolana',
    knownFor: ['Meu Semba'],
    agent: {
      name: 'Pedro Kalemba',
      agency: 'Luanda Screen Agency',
      email: 'pedro@luandascreen.ao',
      phone: '+244 923 000 400',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-angelo-torres',
    slug: 'angelo-torres',
    name: 'Ângelo Torres',
    role: 'actor',
    photo: '',
    bio: 'Actor de cinema e televisão com carreira consolidada no espaço lusófono. Em "A Ilha dos Cães", interpreta um papel central num thriller de atmosfera sombria e inquietante.',
    birthPlace: 'São Tomé e Príncipe',
    nationality: 'Santomense',
    knownFor: ['A Ilha dos Cães'],
    agent: {
      name: 'Ricardo Nunes',
      agency: 'África Film Management',
      email: 'ricardo@africafilm.ao',
      phone: '+244 923 000 200',
      location: 'Lisboa / Luanda',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-miguel-hurst',
    slug: 'miguel-hurst',
    name: 'Miguel Hurst',
    role: 'actor',
    photo: '',
    bio: 'Actor e realizador com percurso internacional. A sua presença em "A Ilha dos Cães" reforça o elenco de peso desta produção de terror angolano.',
    birthPlace: 'Angola',
    nationality: 'Angolana',
    knownFor: ['A Ilha dos Cães'],
    agent: {
      name: 'Ana Ribeiro',
      agency: 'Iberia Creative',
      email: 'ana@iberiacreative.com',
      location: 'Lisboa, Portugal',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-nicolau-breyner',
    slug: 'nicolau-breyner',
    name: 'Nicolau Breyner',
    role: 'actor',
    photo: '',
    bio: 'Ícone do cinema e televisão portuguesa, com uma carreira lendária. A sua participação em "A Ilha dos Cães" é um marco de prestígio para a produção angolana.',
    birthYear: 1940,
    birthPlace: 'Serpa, Portugal',
    nationality: 'Portuguesa',
    knownFor: ['A Ilha dos Cães'],
    awards: ['Prémio Carreira — Cinema Português'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-joao-cabral',
    slug: 'joao-cabral',
    name: 'João Cabral',
    role: 'actor',
    photo: '',
    bio: 'Actor com participação em dramas angolanos clássicos. Em "O Miradouro da Lua", integra um elenco que celebra o amor e a tradição nas paisagens de Angola.',
    birthPlace: 'Angola',
    nationality: 'Angolana',
    knownFor: ['O Miradouro da Lua'],
    agent: {
      name: 'Miguel Costa',
      agency: 'Bairro Film Collective',
      email: 'miguel@bairrofilm.ao',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-aline-solange',
    slug: 'aline-solange',
    name: 'Aline Solange',
    role: 'actor',
    photo: '',
    bio: 'Actriz com presença delicada e expressiva no cinema angolano. Destaca-se em papéis que exploram a identidade cultural e as relações humanas.',
    birthPlace: 'Angola',
    nationality: 'Angolana',
    knownFor: ['O Miradouro da Lua'],
    agent: {
      name: 'Sofia Baptista',
      agency: 'Lukusso Talent Agency',
      email: 'sofia@lukusso-talent.ao',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-paulo-xisto',
    slug: 'paulo-xisto',
    name: 'Paulo Xisto',
    role: 'actor',
    photo: '',
    bio: 'Actor angolano com carreira em cinema e teatro. Contribui com autenticidade e presença cénica em produções que retratam a Angola contemporânea e histórica.',
    birthPlace: 'Angola',
    nationality: 'Angolana',
    knownFor: ['O Miradouro da Lua'],
    agent: {
      name: 'Pedro Kalemba',
      agency: 'Luanda Screen Agency',
      email: 'pedro@luandascreen.ao',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-lesliana-pereira',
    slug: 'lesliana-pereira',
    name: 'Lesliana Pereira',
    role: 'actor',
    photo: '',
    bio: 'Actriz e apresentadora angolana de renome internacional. O seu papel como Njinga em "Njinga Rainha de Angola" tornou-se icónico, celebrando a força e a liderança feminina na história de Angola.',
    birthYear: 1987,
    birthPlace: 'Luanda, Angola',
    nationality: 'Angolana',
    knownFor: ['Njinga Rainha de Angola'],
    awards: ['Melhor Actriz — Festival de Cinema Africano'],
    socials: {
      instagram: 'https://instagram.com',
    },
    agent: {
      name: 'Ana Ribeiro',
      agency: 'Iberia Creative',
      email: 'ana@iberiacreative.com',
      phone: '+351 910 000 300',
      location: 'Lisboa / Luanda',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-ana-santos',
    slug: 'ana-santos',
    name: 'Ana Santos',
    role: 'actor',
    photo: '',
    bio: 'Actriz com participação em produções históricas e dramas. Em "Njinga Rainha de Angola", integra o elenco de uma das obras mais ambiciosas do cinema angolano.',
    birthPlace: 'Angola',
    nationality: 'Angolana',
    knownFor: ['Njinga Rainha de Angola'],
    agent: {
      name: 'Carla Mendes',
      agency: 'Lukusso Talent Agency',
      email: 'carla@lukusso-talent.ao',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-erica-chissapa',
    slug: 'erica-chissapa',
    name: 'Erica Chissapa',
    role: 'actor',
    photo: '',
    bio: 'Actriz angolana com carreira em televisão e cinema. Conhecida pela versatilidade e carisma, participa em produções que celebram a cultura e a história de Angola.',
    birthPlace: 'Luanda, Angola',
    nationality: 'Angolana',
    knownFor: ['Njinga Rainha de Angola'],
    agent: {
      name: 'Sofia Baptista',
      agency: 'Lukusso Talent Agency',
      email: 'sofia@lukusso-talent.ao',
      phone: '+244 923 000 500',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-diana-de-carvalho',
    slug: 'diana-de-carvalho',
    name: 'Diana de Carvalho',
    role: 'actor',
    photo: '',
    bio: 'Actriz com forte presença em thrillers e dramas contemporâneos. Em "Plano B", interpreta um papel central numa história de tensão, ambição e escolhas fatais.',
    birthPlace: 'Angola',
    nationality: 'Angolana',
    knownFor: ['Plano B'],
    agent: {
      name: 'Carla Mendes',
      agency: 'Lukusso Talent Agency',
      email: 'carla@lukusso-talent.ao',
      phone: '+244 923 000 100',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-aureliano-quaresma',
    slug: 'aureliano-quaresma',
    name: 'Aureliano Quaresma',
    role: 'actor',
    photo: '',
    bio: 'Actor angolano com carreira em cinema de ação e drama. Destaca-se pela intensidade e credibilidade em papéis de conflito e tensão narrativa.',
    birthPlace: 'Angola',
    nationality: 'Angolana',
    knownFor: ['Plano B'],
    agent: {
      name: 'Pedro Kalemba',
      agency: 'Luanda Screen Agency',
      email: 'pedro@luandascreen.ao',
      phone: '+244 923 000 400',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-hamilton-macosso',
    slug: 'hamilton-macosso',
    name: 'Hamilton Macosso',
    role: 'actor',
    photo: '',
    bio: 'Actor com presença marcante em produções angolanas recentes. Em "Plano B", contribui para o elenco de um thriller tenso e imprevisível.',
    birthPlace: 'Angola',
    nationality: 'Angolana',
    knownFor: ['Plano B'],
    agent: {
      name: 'Miguel Costa',
      agency: 'Bairro Film Collective',
      email: 'miguel@bairrofilm.ao',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p-gusmao-soeiro',
    slug: 'gusmao-soeiro',
    name: 'Gusmão Soeiro',
    role: 'actor',
    photo: '',
    bio: 'Actor angolano com percurso em cinema e televisão. Integra o elenco de "Plano B" com uma interpretação sólida e carismática.',
    birthPlace: 'Angola',
    nationality: 'Angolana',
    knownFor: ['Plano B'],
    agent: {
      name: 'Sofia Baptista',
      agency: 'Lukusso Talent Agency',
      email: 'sofia@lukusso-talent.ao',
      location: 'Luanda, Angola',
    },
    createdAt: new Date().toISOString(),
  },
]

/** Perfis genéricos para nomes sem ficha dedicada */
function createFallbackPerson(name: string, preferredRole: 'director' | 'actor' = 'actor'): Person {
  const isGenericDirector = /realizador/i.test(name)
  const isGenericActor = /actor|atriz/i.test(name)
  const role: Person['role'] = isGenericDirector
    ? 'director'
    : preferredRole === 'director'
      ? 'director'
      : 'actor'

  const bio =
    role === 'director'
      ? `${name} é um realizador ligado ao cinema angolano e lusófono. A sua obra contribui para a diversidade de vozes e narrativas no panorama audiovisual de Angola.`
      : `${name} é um talento do cinema angolano. Com presença em produções nacionais, contribui para a riqueza do elenco e para a autenticidade das histórias contadas no ecrã.`

  return {
    id: `p-${slugify(name)}`,
    slug: slugify(name),
    name,
    role: isGenericActor ? 'actor' : role,
    photo: '',
    bio,
    nationality: 'Angolana',
    birthPlace: 'Angola',
    knownFor: [],
    agent: isGenericDirector || isGenericActor
      ? undefined
      : {
          name: 'Equipa Lukusso Talent',
          agency: 'Lukusso Talent Agency',
          email: 'talent@lukusso.ao',
          phone: '+244 900 000 000',
          location: 'Luanda, Angola',
        },
    createdAt: new Date().toISOString(),
  }
}

export function getPersonBySlug(slug: string): Person | null {
  const normalized = slugify(slug)
  const found = peopleDatabase.find((p) => p.slug === normalized)
  if (found) return found
  return null
}

export function getPersonByName(name: string, preferredRole: 'director' | 'actor' = 'actor'): Person {
  const normalized = name.trim().toLowerCase()
  const found = peopleDatabase.find((p) => p.name.toLowerCase() === normalized)
  if (found) return found

  // Match by slug in case the URL used a slugified name
  const bySlug = peopleDatabase.find((p) => p.slug === slugify(name))
  if (bySlug) return bySlug

  return createFallbackPerson(name, preferredRole)
}

export function getPersonPath(name: string, role: 'director' | 'actor' = 'actor'): string {
  const person = getPersonByName(name, role)
  // Usa a rota correta baseada no role
  const basePath = person.role === 'director' ? '/realizador' : '/elenco'
  return `${basePath}/${person.slug}`
}

export function getPersonPathByRole(name: string, role: 'director' | 'actor'): string {
  const person = getPersonByName(name, role)
  const basePath = role === 'director' ? '/realizador' : '/elenco'
  return `${basePath}/${person.slug}`
}

export function getAllPeople(): Person[] {
  return [...peopleDatabase]
}

export { slugify }
