"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"

// Define available languages
export type Language = "uz" | "ru" | "en"

// Define translations interface
interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

// Define language context interface
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language, isProfileSection?: boolean) => void
  t: (key: string, params?: Record<string, string | number>) => string
  translations: Translations
  isProfileSection?: boolean
}

// Translations for all languages
const defaultTranslations: Translations = {
  uz: {
    // Navigation va umumiy elementlar
    learnEnglishForIT: "IT sohasida ingliz tilini o'rganing",
    academyDescription:
      "IT English Academy - bu IT sohasida ishlash uchun kerak bo'ladigan ingliz tilini o'rgatuvchi zamonaviy ta'lim markazi.",
    viewCourses: "Kurslarni ko'rish",
    contactUs: "Biz bilan bog'lanish",
    academyImageAlt: "IT English Academy",
    ourAdvantages: "Bizning afzalliklarimiz",
    whyChooseUs: "Nima uchun bizni tanlashingiz kerak?",
    home: "Bosh sahifa",
    courses: "Kurslar",
    about: "Biz haqimizda",
    contact: "Bog'lanish",
    jobs: "Ish o'rinlari",
    login: "Kirish",
    profile: "Profil",
    logout: "Chiqish",
    my_courses: "Mening kurslarim",
    cart: "Savatcha",
    search: "Qidirish",
    notifications: "Bildirishnomalar",
    mark_all_as_read: "Barchasini o'qilgan deb belgilash",
    no_notifications: "Bildirishnomalar yo'q",
    language: "Til",
    theme: "Mavzu",
    light: "Yorug'",
    dark: "Qorong'i",
    system: "Tizim",
    register: "Ro'yxatdan o'tish",

    // Profile page specific translations
    welcome_back: "Xush kelibsiz",
    welcome_message: "Xush kelibsiz, {name}",
    profile_completion: "Profil to'ldirilishi",
    student: "Talaba",
    english_b2: "Ingliz tili B2",
    it_beginner: "IT boshlang'ich",
    edit_profile: "Profilni tahrirlash",
    quick_links: "Tezkor havolalar",
    overview: "Umumiy ma'lumot",
    progress: "Natijalar",
    achievements: "Yutuqlar",
    active_courses: "Faol kurslar",
    next_lesson: "Keyingi dars",
    join_now: "Hozir qo'shilish",
    recent_activity: "So'nggi faoliyat",
    completed_lesson: "Tugatilgan dars",
    days_ago: "kun oldin",
    view_all_activity: "Barcha faoliyatni ko'rish",
    learning_progress: "O'rganish jarayoni",
    progress_description: "Barcha kurslardagi natijalaringizni kuzating",
    your_achievements: "Sizning yutuqlaringiz",
    achievements_description: "Siz erishgan yutuqlar",
    first_course: "Birinchi kurs",
    completed_first_course: "Birinchi kursni tugatdingiz",
    coding_streak: "Kod yozish seriyasi",
    seven_day_streak: "7 kunlik o'rganish seriyasini saqlab qoldingiz",
    quiz_master: "Test ustasi",
    perfect_score: "Testda mukammal natija ko'rsatdingiz",
    fast_learner: "Tez o'rganuvchi",
    completed_course_quickly: "Kursni rekord vaqtda tugatdingiz",
    enterYourInformation: "Ma'lumotlaringizni kiriting",

    // Mening kurslarim sahifasi uchun
    manage_your_courses: "Kurslaringizni boshqaring va o'rganishni davom ettiring",
    active_courses: "Faol kurslar",
    completed_courses: "Tugatilgan kurslar",
    no_active_courses: "Sizda hozircha faol kurslar yo'q",
    no_completed_courses: "Sizda hozircha tugatilgan kurslar yo'q",
    browse_courses: "Kurslarni ko'rish",
    course_description: "IT sohasida ingliz tilini o'rganing",
    course_details: "Kurs haqida",
    continue_learning: "O'rganishni davom ettirish",
    completion_date: "Tugatilgan sana",
    instructor: "O'qituvchi",
    certificate_available: "Sertifikat mavjud",
    view_certificate: "Sertifikatni ko'rish",

    // Asosiy sahifa uchun
    itEnglish: "IT ingliz tili",
    itEnglishDescription: "IT sohasida ishlash uchun kerak bo'ladigan maxsus ingliz tili kurslari",
    modernTeaching: "Zamonaviy o'qitish",
    modernTeachingDescription: "Zamonaviy o'qitish metodlari va texnologiyalar bilan darslar",
    experiencedTeachers: "Tajribali o'qituvchilar",
    experiencedTeachersDescription: "IT sohasida tajribaga ega bo'lgan malakali o'qituvchilar",
    practicalExercises: "Amaliy mashg'ulotlar",
    practicalExercisesDescription: "Nazariy bilimlarni amalda qo'llash uchun mashg'ulotlar",
    smallGroups: "Kichik guruhlar",
    smallGroupsDescription: "Har bir o'quvchiga individual yondashish uchun kichik guruhlar",
    guaranteedResult: "Kafolatlangan natija",
    guaranteedResultDescription: "Kursni tugatgandan so'ng kafolatlangan natija va sertifikat",
    popularCourses: "Ommabop kurslar",
    explorePopularCourses: "Bizning eng ommabop kurslarimiz bilan tanishing",
    englishBasics: "Ingliz tili asoslari",
    englishBasicsDescription: "Ingliz tilini noldan o'rganish uchun mo'ljallangan kurs",
    webDevelopment: "Web dasturlash",
    webDevelopmentDescription: "Web dasturlash asoslari va zamonaviy texnologiyalar",
    price1: "1,200,000 so'm",
    price2: "1,500,000 so'm",
    price3: "2,000,000 so'm",
    details: "Batafsil",
    viewAllCourses: "Barcha kurslarni ko'rish",
    registerNow: "Hoziroq ro'yxatdan o'ting",
    registerNowDescription:
      "IT sohasida ingliz tilini o'rganish uchun bizning kurslarimizga yoziling va karyerangizni yangi bosqichga olib chiqing",
    pages: "Sahifalar",
    address: "Toshkent sh., Yunusobod tumani, 4-mavze",
    phone: "+998 90 123 45 67",
    email: "info@itenglish.uz",
    socialMedia: "Ijtimoiy tarmoqlar",
    allRightsReserved: "Barcha huquqlar himoyalangan.",

    // Admin panel uchun
    dashboard: "Boshqaruv paneli",
    analytics: "Tahlillar",
    users: "Foydalanuvchilar",
    teachers: "O'qituvchilar",
    orders: "Buyurtmalar",
    reports: "Hisobotlar",
    settings: "Sozlamalar",
    addTeacher: "O'qituvchi qo'shish",
    editTeacher: "O'qituvchini tahrirlash",
    deleteTeacher: "O'qituvchini o'chirish",
    confirmDelete: "O'chirishni tasdiqlaysizmi?",
    teacherDeleted: "O'qituvchi o'chirildi",
    fullName: "To'liq ism",
    email: "Elektron pochta",
    phone: "Telefon raqami",
    position: "Lavozim",
    specialty: "Mutaxassislik",
    experience: "Tajriba",
    status: "Holat",
    active: "Faol",
    inactive: "Nofaol",
    save: "Saqlash",
    cancel: "Bekor qilish",
    viewSite: "Saytni ko'rish",

    // Kurslar uchun
    courseManagement: "Kurslarni boshqarish",
    addCourse: "Kurs qo'shish",
    editCourse: "Kursni tahrirlash",
    deleteCourse: "Kursni o'chirish",
    confirmDeleteCourse: "Kursni o'chirishni tasdiqlaysizmi?",
    courseDeleted: "Kurs o'chirildi",
    courseTitle: "Kurs nomi",
    courseDescription: "Kurs tavsifi",
    coursePrice: "Kurs narxi",
    courseLevel: "Kurs darajasi",
    courseDuration: "Kurs davomiyligi",
    lessons: "Darslar",
    allLevels: "Barcha darajalar",
    beginner: "Boshlang'ich",
    intermediate: "O'rta",
    advanced: "Yuqori",
    allDurations: "Barcha davomiyliklar",
    shortDuration: "Qisqa (4 haftagacha)",
    mediumDuration: "O'rta (4-8 hafta)",
    longDuration: "Uzoq (8 haftadan ortiq)",

    // Login va ro'yxatdan o'tish
    loginSuccess: "Muvaffaqiyatli kirildi",
    adminPanelOpening: "Admin panel ochilmoqda...",
    loginSuccessful: "Siz muvaffaqiyatli kiritdingiz",
    usernameAndPasswordRequired: "Foydalanuvchi nomi va parol talab qilinadi",
    usernameOrPasswordIncorrect: "Foydalanuvchi nomi yoki parol noto'g'ri",
    loginError: "Kirishda xatolik yuz berdi. Qaytadan urinib ko'ring.",
    enterYourCredentials: "Hisob ma'lumotlaringizni kiriting",
    username: "Foydalanuvchi nomi",
    usernamePlaceholder: "foydalanuvchi_nomi",
    password: "Parol",
    forgotPassword: "Parolni unutdingizmi?",
    loggingIn: "Kirish...",
    noAccount: "Hisobingiz yo'qmi?",
    firstName: "Ism",
    lastName: "Familiya",
    firstNamePlaceholder: "Ism kiriting",
    lastNamePlaceholder: "Familiya kiriting",
    emailPlaceholder: "email@misol.com",
    phonePlaceholder: "+998 XX XXX XX XX",
    confirmPassword: "Parolni tasdiqlash",
    registering: "Ro'yxatdan o'tish...",
    alreadyHaveAccount: "Hisobingiz bormi?",

    // Xabarlar
    error: "Xatolik",
    success: "Muvaffaqiyat",
    fillAllFields: "Barcha maydonlarni to'ldiring",
    passwordsDoNotMatch: "Parollar mos kelmaydi",
    registrationSuccessful: "Ro'yxatdan o'tish muvaffaqiyatli amalga oshirildi",
    registrationError: "Ro'yxatdan o'tishda xatolik yuz berdi. Qaytadan urinib ko'ring.",

    // Yangi qo'shilgan tarjimalar
    loading: "Yuklanmoqda...",
    searchCourses: "Kurslarni qidirish...",
    filter: "Filtrlash",
    back: "Orqaga",
    price: "Narx",
    itEnglishCourses: "IT ingliz tili kurslari",
    specializedEnglishCourses: "IT sohasida ishlash uchun maxsus ingliz tili kurslari",
    availableCourses: "Mavjud kurslar",
    noCoursesFound: "Kurslar topilmadi",
    viewCourse: "Kursni ko'rish",
    currency: "so'm",
    students: "O'quvchilar",

    // Home page uchun qo'shimcha tarjimalar
    heroTitle: "IT sohasida ingliz tilini o'rganing",
    heroSubtitle: "Zamonaviy IT sohasida muvaffaqiyatga erishish uchun maxsus ingliz tili kurslari",
    startFreeTrial: "Bepul sinov darsini oling",
    exploreCourses: "Kurslarni ko'rish",
    popularCoursesSubtitle: "Eng ko'p talab qilinadigan kurslarimiz",
    whyChooseUsSubtitle: "Bizni tanlashingiz uchun sabablar",
    testimonials: "Mijozlar fikrlari",
    testimonialsSubtitle: "O'quvchilarimiz biz haqimizda nima deyishadi",
    readyToStart: "Boshlashga tayyormisiz?",
    readyToStartSubtitle: "Bugun ro'yxatdan o'ting va IT ingliz tilini o'rganishni boshlang",
  },
  ru: {
    // Навигация и общие элементы
    learnEnglishForIT: "Изучайте английский для IT",
    academyDescription:
      "IT English Academy - это современный образовательный центр, обучающий английскому языку, необходимому для работы в IT сфере.",
    viewCourses: "Просмотр курсов",
    contactUs: "Связаться с нами",
    academyImageAlt: "IT English Academy",
    ourAdvantages: "Наши преимущества",
    whyChooseUs: "Почему стоит выбрать нас?",
    home: "Главная",
    courses: "Курсы",
    about: "О нас",
    contact: "Контакты",
    jobs: "Вакансии",
    login: "Вход",
    profile: "Профиль",
    logout: "Выход",
    my_courses: "Мои курсы",
    cart: "Корзина",
    search: "Поиск",
    notifications: "Уведомления",
    mark_all_as_read: "Отметить все как прочитанные",
    no_notifications: "Нет уведомлений",
    language: "Язык",
    theme: "Тема",
    light: "Светлая",
    dark: "Темная",
    system: "Системная",
    register: "Регистрация",
    enterYourInformation: "Введите ваши данные",
    viewSite: "Просмотр сайта",
    orders: "Заказы",

    // Profile page specific translations
    welcome_back: "Добро пожаловать",
    welcome_message: "Добро пожаловать, {name}",
    profile_completion: "Заполнение профиля",
    student: "Студент",
    english_b2: "Английский B2",
    it_beginner: "IT начинающий",
    edit_profile: "Редактировать профиль",
    quick_links: "Быстрые ссылки",
    overview: "Обзор",
    progress: "Прогресс",
    achievements: "Достижения",
    active_courses: "Активные курсы",
    next_lesson: "Следующий урок",
    join_now: "Присоединиться сейчас",
    recent_activity: "Недавняя активность",
    completed_lesson: "Завершенный урок",
    days_ago: "дней назад",
    view_all_activity: "Просмотреть всю активность",
    learning_progress: "Прогресс обучения",
    progress_description: "Отслеживайте свой прогресс по всем курсам",
    your_achievements: "Ваши достижения",
    achievements_description: "Достижения, которые вы заработали",
    first_course: "Первый курс",
    completed_first_course: "Завершили свой первый курс",
    coding_streak: "Серия кодирования",
    seven_day_streak: "Поддерживали 7-дневную серию обучения",
    quiz_master: "Мастер тестов",
    perfect_score: "Получили идеальный результат в тесте",
    fast_learner: "Быстрый ученик",
    completed_course_quickly: "Завершили курс в рекордно короткие сроки",

    // Home page дополнительные переводы
    heroTitle: "Изучайте английский для IT",
    heroSubtitle: "Специализированные курсы английского языка для успеха в современной IT-индустрии",
    startFreeTrial: "Получить бесплатный пробный урок",
    exploreCourses: "Изучить курсы",
    popularCoursesSubtitle: "Наши самые востребованные курсы",
    whyChooseUsSubtitle: "Причины выбрать нас",
    testimonials: "Отзывы клиентов",
    testimonialsSubtitle: "Что говорят о нас наши студенты",
    readyToStart: "Готовы начать?",
    readyToStartSubtitle: "Зарегистрируйтесь сегодня и начните изучать английский для IT",
    students: "Студенты",
  },
  en: {
    // Navigation and general elements
    learnEnglishForIT: "Learn English for IT",
    academyDescription:
      "IT English Academy is a modern educational center teaching English language needed for working in the IT field.",
    viewCourses: "View Courses",
    contactUs: "Contact Us",
    academyImageAlt: "IT English Academy",
    ourAdvantages: "Our Advantages",
    whyChooseUs: "Why Choose Us?",
    home: "Home",
    courses: "Courses",
    about: "About",
    contact: "Contact",
    jobs: "Jobs",
    login: "Login",
    profile: "Profile",
    logout: "Logout",
    my_courses: "My Courses",
    cart: "Cart",
    search: "Search",
    notifications: "Notifications",
    mark_all_as_read: "Mark all as read",
    no_notifications: "No notifications",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    register: "Register",
    enterYourInformation: "Enter your information",
    viewSite: "View Site",
    orders: "Orders",

    // Profile page specific translations
    welcome_back: "Welcome Back",
    welcome_message: "Welcome back, {name}",
    profile_completion: "Profile Completion",
    student: "Student",
    english_b2: "English B2",
    it_beginner: "IT Beginner",
    edit_profile: "Edit Profile",
    quick_links: "Quick Links",
    overview: "Overview",
    progress: "Progress",
    achievements: "Achievements",
    active_courses: "Active Courses",
    next_lesson: "Next Lesson",
    join_now: "Join Now",
    recent_activity: "Recent Activity",
    completed_lesson: "Completed Lesson",
    days_ago: "days ago",
    view_all_activity: "View All Activity",
    learning_progress: "Learning Progress",
    progress_description: "Track your progress across all courses",
    your_achievements: "Your Achievements",
    achievements_description: "Achievements you've earned so far",
    first_course: "First Course",
    completed_first_course: "Completed your first course",
    coding_streak: "Coding Streak",
    seven_day_streak: "Maintained a 7-day learning streak",
    quiz_master: "Quiz Master",
    perfect_score: "Achieved a perfect score on a quiz",
    fast_learner: "Fast Learner",
    completed_course_quickly: "Completed a course in record time",

    // Home page additional translations
    heroTitle: "Learn English for IT",
    heroSubtitle: "Specialized English language courses for success in the modern IT industry",
    startFreeTrial: "Get Free Trial Lesson",
    exploreCourses: "Explore Courses",
    popularCoursesSubtitle: "Our most in-demand courses",
    whyChooseUsSubtitle: "Reasons to choose us",
    testimonials: "Testimonials",
    testimonialsSubtitle: "What our students say about us",
    readyToStart: "Ready to Start?",
    readyToStartSubtitle: "Register today and start learning IT English",
    students: "Students",
  },
}

// Create language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Language provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [language, setLanguageState] = useState<Language>("uz")
  const [translations, setTranslations] = useState<Translations>(defaultTranslations)
  const [mounted, setMounted] = useState(false)

  // Check if current path is in admin section
  const isAdminSection = pathname ? pathname.startsWith("/admin") : false

  // Initialize language from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      setMounted(true)

      // Get language from localStorage based on section
      let selectedLang: Language = "uz"

      if (isAdminSection) {
        const adminLang = localStorage.getItem("admin-language") as Language
        if (adminLang && ["uz", "ru", "en"].includes(adminLang)) {
          selectedLang = adminLang
        }
      } else {
        const userLang = localStorage.getItem("user-language") as Language
        if (userLang && ["uz", "ru", "en"].includes(userLang)) {
          selectedLang = userLang
        }
      }

      // Set the language state
      setLanguageState(selectedLang)
    } catch (error) {
      console.error("Error initializing language:", error)
      // Default to Uzbek if there's an error
      setLanguageState("uz")
    }
  }, [isAdminSection, pathname])

  // Set language and save to localStorage
  const setLanguage = useCallback(
    (newLanguage: Language) => {
      try {
        // Set language in state
        setLanguageState(newLanguage)

        // Save to localStorage based on section
        if (isAdminSection) {
          localStorage.setItem("admin-language", newLanguage)
        } else {
          localStorage.setItem("user-language", newLanguage)
        }
      } catch (error) {
        console.error("Error setting language:", error)
      }
    },
    [isAdminSection],
  )

  // Translation function with parameter support
  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      if (!mounted) return key

      try {
        // Get translation
        let translation = translations[language]?.[key]

        if (!translation) {
          // Try fallback languages
          translation = translations["uz"]?.[key] || translations["en"]?.[key] || translations["ru"]?.[key] || key
        }

        // Replace parameters if provided
        if (params && translation) {
          Object.entries(params).forEach(([paramKey, paramValue]) => {
            translation = translation.replace(`{${paramKey}}`, String(paramValue))
          })
        }

        return translation
      } catch (error) {
        console.error(`Error translating key "${key}":`, error)
        return key
      }
    },
    [language, translations, mounted],
  )

  // Set global language variable for non-React components
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      try {
        window.__GLOBAL_LANGUAGE = {
          current: language,
          t: (key: string, params?: Record<string, string | number>) => {
            try {
              let translation = translations[language]?.[key] || key

              // Replace parameters if provided
              if (params && translation) {
                Object.entries(params).forEach(([paramKey, paramValue]) => {
                  translation = translation.replace(`{${paramKey}}`, String(paramValue))
                })
              }

              return translation
            } catch (error) {
              console.error(`Error in global translation for key "${key}":`, error)
              return key
            }
          },
          isAdminSection: isAdminSection,
        }
      } catch (error) {
        console.error("Error setting global language:", error)
      }
    }
  }, [language, translations, mounted, isAdminSection])

  // Context value
  const value = {
    language,
    setLanguage,
    t,
    translations,
    isAdminSection,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// Custom hook to use language context
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  const pathname = usePathname()

  // Check if current path is in admin section
  const isAdminSection = pathname ? pathname.startsWith("/admin") : false

  if (context === undefined) {
    // If context is undefined, try to use global language
    if (typeof window !== "undefined" && window.__GLOBAL_LANGUAGE) {
      try {
        return {
          language: window.__GLOBAL_LANGUAGE.current as Language,
          setLanguage: (lang: Language) => {
            try {
              // Set language
              window.__GLOBAL_LANGUAGE.current = lang

              // Save to localStorage based on section
              if (isAdminSection) {
                localStorage.setItem("admin-language", lang)
              } else {
                localStorage.setItem("user-language", lang)
              }
            } catch (error) {
              console.error("Error in global setLanguage:", error)
            }
          },
          t: (key: string, params?: Record<string, string | number>) => {
            try {
              if (window.__GLOBAL_LANGUAGE.t && typeof window.__GLOBAL_LANGUAGE.t === "function") {
                return window.__GLOBAL_LANGUAGE.t(key, params) || key
              }
              return key
            } catch (error) {
              console.error(`Error in global t function for key "${key}":`, error)
              return key
            }
          },
          translations: defaultTranslations,
          isAdminSection: window.__GLOBAL_LANGUAGE.isAdminSection,
        }
      } catch (error) {
        console.error("Error creating fallback language context:", error)
        throw new Error("useLanguage must be used within a LanguageProvider")
      }
    }
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Declare global window interface
declare global {
  interface Window {
    __GLOBAL_LANGUAGE: {
      current: string
      t: (key: string, params?: Record<string, string | number>) => string
      isAdminSection?: boolean
    }
  }
}

