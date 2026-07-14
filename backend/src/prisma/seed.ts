import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 A semear base de dados LUKUSSO...')

  // Planos
  const plans = [
    {
      name: 'LUKUSSO START',
      price: 1500,
      currency: 'AOA',
      features: ['Qualidade HD', '1 dispositivo', 'Catálogo básico'],
      maxDevices: 1,
      maxQuality: '720p',
      popular: false,
    },
    {
      name: 'LUKUSSO PREMIUM',
      price: 3500,
      currency: 'AOA',
      features: ['Full HD', '3 dispositivos', 'Conteúdos exclusivos'],
      maxDevices: 3,
      maxQuality: '1080p',
      popular: true,
    },
    {
      name: 'LUKUSSO FAMILY',
      price: 5500,
      currency: 'AOA',
      features: ['4K Ultra HD', '4 dispositivos', 'Perfis familiares'],
      maxDevices: 4,
      maxQuality: '4K',
      popular: false,
    },
  ]

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { name: plan.name },
      update: plan,
      create: plan,
    })
  }

  // Admin
  const adminPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@lukusso.ao' },
    update: {},
    create: {
      name: 'Administrador LUKUSSO',
      email: 'admin@lukusso.ao',
      password: adminPassword,
      role: 'admin',
    },
  })

  // Categorias
  const categories = [
    { name: 'Cinema Nacional', slug: 'cinema-nacional', description: 'Filmes produzidos em Angola' },
    { name: 'Histórias de Angola', slug: 'historias-angola', description: 'Dramas e histórias angolanas' },
    { name: 'Música Angolana', slug: 'musica-angolana', description: 'Documentários musicais' },
    { name: 'Documentários', slug: 'documentarios', description: 'Documentários africanos' },
    { name: 'Biografias', slug: 'biografias', description: 'Vidas de angolanos famosos' },
    { name: 'Talentos Emergentes', slug: 'talentos-emergentes', description: 'Novos realizadores' },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    })
  }

  console.log('✅ Seed concluído!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })