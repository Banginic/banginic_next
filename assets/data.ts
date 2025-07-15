
import uiux_design from './photos/uiux design.png'
import ai_logo from './photos/ai.png'
import earth_internet from './photos/earth_internet.png'
import branding_logo from './photos/branding.png'
import app_dev_logo from './photos/app_dev.png'
import orange_logo from './photos/orange.png'
import canva_logo from './photos/canva.png'
import stripe_logo from './photos/stripe_pay.png'
import microsoft_logo from './photos/microsoft.png'
import google_logo from './photos/google.png'
import discord from './photos/discord.png'

import { home, contact_us, about_us, jobs, open_source, tutorial, services_photo, projects_photo } from './photos'


export const metaData = {
  title:'Banginic',
  githup_url: 'https://github.com/BinaryDigitz',
 description: 'Banginic is a creative company that focuses on creating beautiful and functional websites and applications.',
}

export const skillsLinks = [
    { label: "All",path: "all" },
    { label: "Website",path: "/works/websites" },
    { label: "UX/UI",path: "/works/ux_ui" },
    { label: "Branding",path: "/works/branding" },
    { label: "Apps",path: "/works/apps" },
    { label: "AI",path: "/works/ai" },
    { label: "SEO",path: "/works/SEO" },
  ]
export const contactCard = {
  email:{
    emailSubject:'Inquiry about your services.',
    emailBody:'Hello! I would like to know more about your services'
  },
  whatsApp:{
    whatsAppBody:'Hello, Please can you tell me more about your services?'
  }
}

export const partners = [
  {label: 'canva', img: canva_logo},
  {label: 'discord', img: discord},
  {label: 'microsoft', img: microsoft_logo},
  {label: 'orange', img: orange_logo},
  {label: 'google', img: google_logo},
  {label: 'stripe_pay', img: stripe_logo},
]
export  const footLinks = [
  {label:"Home", href: "/"},
  {label:"Services", href: "/services"},
  {label:"News", href: "/news"},
  {label:"Careers", href: "/career"},
  {label:"Privacy Policy", href: "/privacy-policy"},
  {label:"Terms and Conditions", href: "/terms-and-condition"}
]
export const services = [
  {
    icon: "draw",
    title: "Branding Design",
    desription:"We are a team of passionate developers, designers, and tech strategists who thrive on solving complex problems. Whether you're a startup with a bold vision or an established company seeking digital transformation, we deliver solutions that align with your goals and drive measurable results.",
    arrow: "arrow_right_alt"
},
  {
    icon: "code",
    title: "Web Development",
    desription:"Your website is more than just an online presence, it’s a critical tool for engagement, conversion, and growth. At Banginic, we design and build powerful, responsive web applications tailored to your business needs and goals.",
    arrow: "arrow_right_alt"
},
  {
    icon: "developer_mode",
    title: "App Development",
    desription:"In a mobile-first world, having a high-quality app is essential to connect with users, streamline operations, and stay competitive. We specialize in developing custom mobile applications that are fast, secure, and built to scale.",
    arrow: "arrow_right_alt"
},
  {
    icon: "vertical_split",
    title: "UI/UX Design",
    desription:"Great design is more than aesthetics, it’s about creating intuitive, engaging experiences that delight users and drive results. At Banginic, we specialize in UI/UX design that puts your users first and transforms how they interact with your product.",
    arrow: "arrow_right_alt"
},
]
export const socialMediaLinks = {
  githup:'https/github/binaryDigits',
  facebook:'https/github/binaryDigits',
  linkedin:'https/github/binaryDigits',
  instagram:'https/github/binaryDigits',
  whatsApp:'https/github/binaryDigits',
  twitter:'https/github/binaryDigits',
}
export const sidebarLinks = [
  {label:"Home", href: "/", icon:home},
  {label:"Services", href: "/services", icon:services_photo},
  {label:"Projects", href: "/works/all", icon:projects_photo},
  {label:"About", href: "/about-us", icon:about_us},
  {label:"Contact", href: "/contact-us", icon:contact_us},
  {label:"Classes", href: "/learning", icon:tutorial},
  {label:"Assets", href: "/learning-assets", icon:open_source},
  {label:"Careers", href: "/careers", icon:jobs}
]
export const mainNavlinks = [
  {label:"Services", href: "/services", icon:services_photo},
  {label:"Projects", href: "/projects", icon:projects_photo},
  {label:"About", href: "/about-us", icon:about_us},
  {label:"Contact", href: "/contact-us", icon:contact_us},

]
export const mainSidelinks = [
  {label:"Services", href: "/services", icon:services_photo},
  {label:"Projects", href: "/projects", icon:projects_photo},
  {label:"About", href: "/about-us", icon:about_us},
  {label:"Contact", href: "/contact-us", icon:contact_us},
  {label:"Classes", href: "/learning", icon:tutorial},
  {label:"Assets", href: "/learning-assets", icon:open_source},
]
export  const servicesDetails = [
    {icon: branding_logo, title: "Branding ", details: "We work with businesses to develop a unique identity that resonates with your audience, sets you apart from competitors, and drives lasting success. From strategy to design, we help shape every aspect of your brand to ensure it tells a compelling, cohesive story."},
    {icon: uiux_design, title: "UI/UX Design", details: ` Our design process focuses on understanding your audience’s needs, solving real problems, and delivering intuitive interfaces that are both visually appealing and easy to navigate.`},
    {icon: earth_internet, title: "Web Development", details: "We develop dynamic, user-friendly websites that help businesses succeed online. Whether you need a sleek corporate site, an engaging e-commerce platform, or a custom web solution, we craft digital experiences that leave a lasting impression."},
    {icon: app_dev_logo, title: "Mobile App Development", details: "We build feature-rich, secure, and scalable mobile apps designed to meet your unique business needs. From enterprise solutions to customer-facing apps, we deliver the perfect blend of performance and functionality."},
    {icon: ai_logo, title: "AI Intergration", details: `At ${metaData.title} we transform businesses with cutting-edge AI solutions that drive innovation, efficiency, and growth. Whether you're looking to enhance operations, improve customer experiences, or make smarter decisions, our AI-driven technologies deliver the insights and automation your business needs to thrive in the digital age.`}
  ]
 
  
export const courses = [
    {
      id: 1,
      title: "HTML & CSS Fundamentals",
      description: "Master the building blocks of web development with HTML5 and CSS3",
      price: 299,
      duration: "4 weeks",
      startDate: "July 15, 2025",
      level: "Beginner",
      students: 156,
      rating: 4.8,
      features: ["Responsive Design", "Flexbox & Grid", "CSS Animations", "Project Portfolio"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "JavaScript Complete Course",
      description: "From basics to advanced concepts including ES6+, async programming, and DOM manipulation",
      price: 499,
      duration: "8 weeks",
      startDate: "July 22, 2025",
      level: "Intermediate",
      students: 243,
      rating: 4.9,
      features: ["ES6+ Features", "Async/Await", "DOM Manipulation", "API Integration"],
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "React Development Bootcamp",
      description: "Build modern web applications with React, hooks, and state management",
      price: 699,
      duration: "10 weeks",
      startDate: "August 5, 2025",
      level: "Advanced",
      students: 189,
      rating: 4.9,
      features: ["React Hooks", "Context API", "Redux", "Real Projects"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Full Stack Web Development",
      description: "Complete web development with frontend and backend technologies",
      price: 999,
      duration: "16 weeks",
      startDate: "August 12, 2025",
      level: "Professional",
      students: 98,
      rating: 5.0,
      features: ["MERN Stack", "Database Design", "API Development", "Deployment"],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop"
    }
  ];