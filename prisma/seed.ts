import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo company
  const company = await prisma.company.upsert({
    where: { id: 'company-techcorp' },
    update: {},
    create: {
      id: 'company-techcorp',
      name: 'TechCorp',
      plan: 'professional',
    },
  })
  console.log('✅ Company created:', company.name)

  // Create HR admin
  const hrAdmin = await prisma.user.upsert({
    where: { email: 'hr@techcorp.com' },
    update: {},
    create: {
      clerkId: 'clerk_hr_admin_001',
      email: 'hr@techcorp.com',
      name: 'Rachel Moore',
      role: 'HR_ADMIN',
      department: 'HR',
      jobTitle: 'Head of People & Culture',
      location: 'New York, NY',
      hobbies: ['Yoga', 'Reading', 'Cooking'],
      interests: ['Workshops', 'Team dinners'],
      embedding: [],
      coins: 500,
      level: 'GOLD',
      companyId: company.id,
      lastActive: new Date(),
    },
  })
  console.log('✅ HR Admin created:', hrAdmin.name)

  // 14 Employees with varied hobbies, levels, and lastActive dates
  const employees = [
    {
      clerkId: 'clerk_emp_001',
      email: 'sarah.chen@techcorp.com',
      name: 'Sarah Chen',
      department: 'Design',
      jobTitle: 'Senior Product Designer',
      location: 'New York, NY',
      hobbies: ['Art', 'Photography', 'Yoga', 'Travel'],
      interests: ['Workshops', 'Coffee chats'],
      coins: 1240,
      level: 'GOLD' as const,
      lastActive: new Date(Date.now() - 2 * 3600000),
    },
    {
      clerkId: 'clerk_emp_002',
      email: 'james.wilson@techcorp.com',
      name: 'James Wilson',
      department: 'Engineering',
      jobTitle: 'Backend Engineer',
      location: 'San Francisco, CA',
      hobbies: ['Gaming', 'Hiking', 'Board Games', 'Running'],
      interests: ['Sports tournaments', 'After-work drinks'],
      coins: 980,
      level: 'GOLD' as const,
      lastActive: new Date(Date.now() - 86400000),
    },
    {
      clerkId: 'clerk_emp_003',
      email: 'mia.patel@techcorp.com',
      name: 'Mia Patel',
      department: 'Marketing',
      jobTitle: 'Marketing Lead',
      location: 'London, UK',
      hobbies: ['Cooking', 'Wine', 'Travel', 'Music'],
      interests: ['Team dinners', 'Coffee chats', 'After-work drinks'],
      coins: 620,
      level: 'BEGINNER' as const,
      lastActive: new Date(Date.now() - 3 * 86400000),
    },
    {
      clerkId: 'clerk_emp_004',
      email: 'tom.baker@techcorp.com',
      name: 'Tom Baker',
      department: 'R&D',
      jobTitle: 'Data Scientist',
      location: 'Berlin, DE',
      hobbies: ['Tennis', 'Cycling', 'Reading', 'Writing'],
      interests: ['Sports tournaments', 'Workshops'],
      coins: 450,
      level: 'BEGINNER' as const,
      lastActive: new Date(Date.now() - 10 * 86400000),
    },
    {
      clerkId: 'clerk_emp_005',
      email: 'ana.lima@techcorp.com',
      name: 'Ana Lima',
      department: 'Sales',
      jobTitle: 'Sales Manager',
      location: 'São Paulo, BR',
      hobbies: ['Football', 'Running', 'Music', 'Photography'],
      interests: ['Sports tournaments', 'After-work drinks'],
      coins: 120,
      level: 'NEWBIE' as const,
      lastActive: new Date(Date.now() - 25 * 86400000),
    },
    {
      clerkId: 'clerk_emp_006',
      email: 'chris.park@techcorp.com',
      name: 'Chris Park',
      department: 'Engineering',
      jobTitle: 'Tech Lead',
      location: 'Seoul, KR',
      hobbies: ['Basketball', 'Gaming', 'Cooking', 'Climbing'],
      interests: ['Sports tournaments', 'Workshops', 'Team dinners'],
      coins: 2100,
      level: 'DIAMOND' as const,
      lastActive: new Date(Date.now() - 3600000),
    },
    {
      clerkId: 'clerk_emp_007',
      email: 'lisa.johnson@techcorp.com',
      name: 'Lisa Johnson',
      department: 'Product',
      jobTitle: 'Product Manager',
      location: 'New York, NY',
      hobbies: ['Yoga', 'Reading', 'Travel', 'Art'],
      interests: ['Workshops', 'Coffee chats', 'Team dinners'],
      coins: 890,
      level: 'GOLD' as const,
      lastActive: new Date(Date.now() - 4 * 86400000),
    },
    {
      clerkId: 'clerk_emp_008',
      email: 'david.kim@techcorp.com',
      name: 'David Kim',
      department: 'Operations',
      jobTitle: 'Operations Analyst',
      location: 'Chicago, IL',
      hobbies: ['Swimming', 'Board Games', 'Photography'],
      interests: ['Coffee chats'],
      coins: 50,
      level: 'NEWBIE' as const,
      lastActive: new Date(Date.now() - 35 * 86400000),
    },
    {
      clerkId: 'clerk_emp_009',
      email: 'yael.cohen@techcorp.com',
      name: 'Yael Cohen',
      department: 'Product',
      jobTitle: 'UX Researcher',
      location: 'Tel Aviv, IL',
      hobbies: ['Tennis', 'Yoga', 'Hiking', 'Photography'],
      interests: ['Coffee chats', 'Sports tournaments', 'Workshops'],
      coins: 760,
      level: 'GOLD' as const,
      lastActive: new Date(Date.now() - 1 * 86400000),
    },
    {
      clerkId: 'clerk_emp_010',
      email: 'marco.rossi@techcorp.com',
      name: 'Marco Rossi',
      department: 'Sales',
      jobTitle: 'Account Executive',
      location: 'Milan, IT',
      hobbies: ['Football', 'Cooking', 'Wine', 'Travel'],
      interests: ['Team dinners', 'After-work drinks', 'Sports tournaments'],
      coins: 430,
      level: 'BEGINNER' as const,
      lastActive: new Date(Date.now() - 2 * 86400000),
    },
    {
      clerkId: 'clerk_emp_011',
      email: 'priya.sharma@techcorp.com',
      name: 'Priya Sharma',
      department: 'Engineering',
      jobTitle: 'Frontend Engineer',
      location: 'Bangalore, IN',
      hobbies: ['Yoga', 'Music', 'Reading', 'Running'],
      interests: ['Workshops', 'Coffee chats'],
      coins: 310,
      level: 'BEGINNER' as const,
      lastActive: new Date(Date.now() - 5 * 86400000),
    },
    {
      clerkId: 'clerk_emp_012',
      email: 'jake.murphy@techcorp.com',
      name: 'Jake Murphy',
      department: 'Marketing',
      jobTitle: 'Growth Marketer',
      location: 'Dublin, IE',
      hobbies: ['Football', 'Board Games', 'Hiking', 'Gaming'],
      interests: ['After-work drinks', 'Sports tournaments'],
      coins: 580,
      level: 'BEGINNER' as const,
      lastActive: new Date(Date.now() - 3 * 86400000),
    },
    {
      clerkId: 'clerk_emp_013',
      email: 'nina.brandt@techcorp.com',
      name: 'Nina Brandt',
      department: 'Design',
      jobTitle: 'Brand Designer',
      location: 'Amsterdam, NL',
      hobbies: ['Cycling', 'Art', 'Photography', 'Music'],
      interests: ['Workshops', 'Coffee chats', 'Team dinners'],
      coins: 1050,
      level: 'GOLD' as const,
      lastActive: new Date(Date.now() - 6 * 3600000),
    },
    {
      clerkId: 'clerk_emp_014',
      email: 'omar.hassan@techcorp.com',
      name: 'Omar Hassan',
      department: 'R&D',
      jobTitle: 'ML Engineer',
      location: 'Dubai, AE',
      hobbies: ['Tennis', 'Swimming', 'Chess', 'Running'],
      interests: ['Sports tournaments', 'Workshops'],
      coins: 1380,
      level: 'DIAMOND' as const,
      lastActive: new Date(Date.now() - 12 * 3600000),
    },
  ]

  const createdUsers: Awaited<ReturnType<typeof prisma.user.upsert>>[] = []
  for (const emp of employees) {
    const user = await prisma.user.upsert({
      where: { email: emp.email },
      update: { lastActive: emp.lastActive },
      create: {
        ...emp,
        embedding: [],
        companyId: company.id,
      },
    })
    createdUsers.push(user)
    console.log(`✅ Employee created: ${user.name}`)
  }

  // Activities — soccer, tennis, yoga, hangout + more
  const now = new Date()
  const activities = [
    {
      id: 'activity-soccer',
      title: '5-a-Side Soccer Match',
      type: 'SPORT' as const,
      description: 'Friendly 5-a-side soccer game in the park. All skill levels welcome — just bring your energy!',
      date: new Date(now.getTime() + 3 * 86400000),
      location: 'Riverside Park, Field 3',
      maxSlots: 10,
      coinsReward: 120,
      companyId: company.id,
      creatorId: createdUsers[4].id, // Ana
    },
    {
      id: 'activity-tennis',
      title: 'Tennis Tournament Friday',
      type: 'SPORT' as const,
      description: 'Doubles tennis tournament. Mixed levels, fun atmosphere, prizes for winners!',
      date: new Date(now.getTime() + 5 * 86400000),
      location: 'Central Park Tennis Courts',
      maxSlots: 16,
      coinsReward: 150,
      companyId: company.id,
      creatorId: createdUsers[3].id, // Tom
    },
    {
      id: 'activity-yoga',
      title: 'Morning Yoga & Mindfulness',
      type: 'SOCIAL' as const,
      description: 'Start your Thursday with a relaxing yoga session led by a certified instructor. All levels welcome.',
      date: new Date(now.getTime() + 8 * 86400000),
      location: 'Rooftop Garden, Office Building',
      maxSlots: 15,
      coinsReward: 75,
      companyId: company.id,
      creatorId: createdUsers[0].id, // Sarah
    },
    {
      id: 'activity-afterwork',
      title: 'After-Work Drinks & Hangout',
      type: 'SOCIAL' as const,
      description: "End the week right — join us for drinks, snacks and good vibes at our favorite spot. No agenda, just fun.",
      date: new Date(now.getTime() + 4 * 86400000),
      location: 'The Rooftop Bar, Downtown',
      maxSlots: 30,
      coinsReward: 50,
      companyId: company.id,
      creatorId: createdUsers[9].id, // Marco
    },
    {
      id: 'activity-boardgames',
      title: 'Board Games Night',
      type: 'SOCIAL' as const,
      description: 'Monthly board game night. Bring your competitive spirit — Catan, Codenames, and more!',
      date: new Date(now.getTime() + 11 * 86400000),
      location: 'The Game Lounge, Brooklyn',
      maxSlots: 12,
      coinsReward: 60,
      companyId: company.id,
      creatorId: createdUsers[1].id, // James
    },
    {
      id: 'activity-cooking',
      title: 'Team Cooking Class',
      type: 'SOCIAL' as const,
      description: 'Learn to make authentic Italian pasta from a professional chef. Dinner included!',
      date: new Date(now.getTime() + 14 * 86400000),
      location: "Williams Kitchen Studio, 5th Ave",
      maxSlots: 12,
      coinsReward: 80,
      companyId: company.id,
      creatorId: createdUsers[2].id, // Mia
    },
    {
      id: 'activity-workshop',
      title: 'Design Thinking Workshop',
      type: 'WORKSHOP' as const,
      description: 'Cross-functional workshop to solve real company challenges using design thinking methodology.',
      date: new Date(now.getTime() + 18 * 86400000),
      location: 'Conference Room A',
      maxSlots: 20,
      coinsReward: 50,
      companyId: company.id,
      creatorId: createdUsers[5].id, // Chris
    },
    {
      id: 'activity-cycling',
      title: 'Weekend Cycling Ride',
      type: 'SPORT' as const,
      description: '25km scenic cycling route along the river. Bikes can be rented nearby. Brunch after!',
      date: new Date(now.getTime() + 9 * 86400000),
      location: 'Hudson River Greenway, Start Point A',
      maxSlots: 20,
      coinsReward: 100,
      companyId: company.id,
      creatorId: createdUsers[12].id, // Nina
    },
  ]

  for (const activity of activities) {
    await prisma.activity.upsert({
      where: { id: activity.id },
      update: {},
      create: activity,
    })
    console.log(`✅ Activity created: ${activity.title}`)
  }

  // RSVPs — spread across activities to make them look lively
  const activityRecords = await prisma.activity.findMany({ where: { companyId: company.id } })
  const findActivity = (id: string) => activityRecords.find(a => a.id === id)!

  const rsvpData = [
    // Soccer
    { userId: createdUsers[4].id,  activityId: findActivity('activity-soccer').id },
    { userId: createdUsers[9].id,  activityId: findActivity('activity-soccer').id },
    { userId: createdUsers[11].id, activityId: findActivity('activity-soccer').id },
    { userId: createdUsers[1].id,  activityId: findActivity('activity-soccer').id },
    { userId: createdUsers[5].id,  activityId: findActivity('activity-soccer').id },
    // Tennis
    { userId: createdUsers[3].id,  activityId: findActivity('activity-tennis').id },
    { userId: createdUsers[8].id,  activityId: findActivity('activity-tennis').id },
    { userId: createdUsers[13].id, activityId: findActivity('activity-tennis').id },
    { userId: createdUsers[0].id,  activityId: findActivity('activity-tennis').id },
    // Yoga
    { userId: createdUsers[0].id,  activityId: findActivity('activity-yoga').id },
    { userId: createdUsers[6].id,  activityId: findActivity('activity-yoga').id },
    { userId: createdUsers[8].id,  activityId: findActivity('activity-yoga').id },
    { userId: createdUsers[10].id, activityId: findActivity('activity-yoga').id },
    // After-work hangout
    { userId: createdUsers[9].id,  activityId: findActivity('activity-afterwork').id },
    { userId: createdUsers[2].id,  activityId: findActivity('activity-afterwork').id },
    { userId: createdUsers[11].id, activityId: findActivity('activity-afterwork').id },
    { userId: createdUsers[7].id,  activityId: findActivity('activity-afterwork').id },
    { userId: createdUsers[12].id, activityId: findActivity('activity-afterwork').id },
    // Board games
    { userId: createdUsers[1].id,  activityId: findActivity('activity-boardgames').id },
    { userId: createdUsers[7].id,  activityId: findActivity('activity-boardgames').id },
    { userId: createdUsers[11].id, activityId: findActivity('activity-boardgames').id },
    // Cooking
    { userId: createdUsers[2].id,  activityId: findActivity('activity-cooking').id },
    { userId: createdUsers[6].id,  activityId: findActivity('activity-cooking').id },
    { userId: createdUsers[9].id,  activityId: findActivity('activity-cooking').id },
    // Cycling
    { userId: createdUsers[12].id, activityId: findActivity('activity-cycling').id },
    { userId: createdUsers[3].id,  activityId: findActivity('activity-cycling').id },
    { userId: createdUsers[10].id, activityId: findActivity('activity-cycling').id },
  ]

  for (const rsvp of rsvpData) {
    await prisma.rsvp.upsert({
      where: { userId_activityId: { userId: rsvp.userId, activityId: rsvp.activityId } },
      update: {},
      create: { ...rsvp, status: 'GOING' },
    })
  }
  console.log('✅ RSVPs created')

  // Pre-computed match scores
  const matchPairs = [
    { a: 0,  b: 6,  score: 0.87 }, // Sarah ↔ Lisa       — Yoga + Travel + Art
    { a: 0,  b: 8,  score: 0.81 }, // Sarah ↔ Yael       — Yoga + Photography + Hiking
    { a: 1,  b: 5,  score: 0.78 }, // James ↔ Chris      — Gaming + Running
    { a: 1,  b: 11, score: 0.72 }, // James ↔ Jake       — Football + Board Games + Hiking
    { a: 2,  b: 9,  score: 0.76 }, // Mia ↔ Marco        — Cooking + Wine + Travel
    { a: 3,  b: 8,  score: 0.74 }, // Tom ↔ Yael         — Tennis + Hiking
    { a: 3,  b: 13, score: 0.70 }, // Tom ↔ Omar         — Tennis + Running
    { a: 4,  b: 9,  score: 0.68 }, // Ana ↔ Marco        — Football + Music
    { a: 4,  b: 11, score: 0.65 }, // Ana ↔ Jake         — Football + Running
    { a: 6,  b: 10, score: 0.80 }, // Lisa ↔ Priya       — Yoga + Reading + Music
    { a: 8,  b: 13, score: 0.75 }, // Yael ↔ Omar        — Tennis + Running
    { a: 12, b: 0,  score: 0.69 }, // Nina ↔ Sarah       — Art + Photography
    { a: 12, b: 10, score: 0.66 }, // Nina ↔ Priya       — Music + Cycling
    { a: 5,  b: 13, score: 0.62 }, // Chris ↔ Omar       — Swimming + Climbing
  ]

  for (const m of matchPairs) {
    const userAId = createdUsers[m.a].id
    const userBId = createdUsers[m.b].id
    const matchId = `match-${userAId}-${userBId}`
    await prisma.match.upsert({
      where: { id: matchId },
      update: {},
      create: { id: matchId, userAId, userBId, score: m.score, status: 'CONNECTED' },
    })
  }
  console.log('✅ Matches created')

  // HR Report for this month
  await prisma.hrReport.upsert({
    where: { id: 'report-april-2026' },
    update: {},
    create: {
      id: 'report-april-2026',
      companyId: company.id,
      period: 'April 2026',
      activeUsers: 11,
      eventsCreated: 8,
      matchesMade: 14,
      engagementPct: 78.5,
    },
  })
  console.log('✅ HR Report created')

  console.log('\n🎉 Seed complete!')
  console.log(`   Company : TechCorp`)
  console.log(`   Users   : ${createdUsers.length} employees + 1 HR admin`)
  console.log(`   Activities : ${activities.length}`)
  console.log(`   Matches : ${matchPairs.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
