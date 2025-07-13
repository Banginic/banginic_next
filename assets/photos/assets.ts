

import { home, contact_us, about_us, jobs, open_source, tutorial, services_photo, projects_photo } from './photos'


export const metaData = {
  name:'Banginic',
  githup_url: 'https://github.com/BinaryDigitz',
 description: 'Banginic is a creative company that focuses on creating beautiful and functional websites and applications.',
}

export const skillsLinks = [
    { name: "All",path: "all" },
    { name: "Website",path: "/works/websites" },
    { name: "UX/UI",path: "/works/ux_ui" },
    { name: "Branding",path: "/works/branding" },
    { name: "Apps",path: "/works/apps" },
    { name: "AI",path: "/works/ai" },
    { name: "SEO",path: "/works/SEO" },
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

export   const partners = [
  {name: 'canva', img: './assets/partners/canva.png'},
  {name: 'discord', img: './assets/partners/discord.png'},
  {name: 'microsoft', img: './assets/partners/microsoft.png'},
  {name: 'orange', img: './assets/partners/orange.png'},
  {name: 'google', img: './assets/partners/google.png'},
  {name: 'stripe_pay', img: './assets/partners/stripe_pay.png'},
]
export  const footLinks = [
  {name:"Home", pathname: "/"},
  {name:"Services", pathname: "/services"},
  {name:"News", pathname: "/news"},
  {name:"Careers", pathname: "/Careers"},
  {name:"Privacy Policy", pathname: "/privacyPolicy"},
  {name:"Terms and Conditions", pathname: "/termsAndCon"}
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
  {name:"Home", pathname: "/", icon:home},
  {name:"Services", pathname: "/services", icon:services_photo},
  {name:"Projects", pathname: "/works/all", icon:projects_photo},
  {name:"About", pathname: "/about-us", icon:about_us},
  {name:"Contact", pathname: "/contact-us", icon:contact_us},
  {name:"Classes", pathname: "/learning", icon:tutorial},
  {name:"Assets", pathname: "/assets", icon:open_source},
  {name:"Careers", pathname: "/careers", icon:jobs}
]
export  const servicesDetails = [
    {icon: "./assets/icons/branding.png", title: "Branding ", details: "We work with businesses to develop a unique identity that resonates with your audience, sets you apart from competitors, and drives lasting success. From strategy to design, we help shape every aspect of your brand to ensure it tells a compelling, cohesive story."},
    {icon: "./assets/icons/uiux design.png", title: "UI/UX Design", details: ` Our design process focuses on understanding your audience’s needs, solving real problems, and delivering intuitive interfaces that are both visually appealing and easy to navigate.`},
    {icon: "./assets/icons/earth_internet.png", title: "Web Development", details: "We develop dynamic, user-friendly websites that help businesses succeed online. Whether you need a sleek corporate site, an engaging e-commerce platform, or a custom web solution, we craft digital experiences that leave a lasting impression."},
    {icon: "./assets/icons/app_dev.png", title: "Mobile App Development", details: "We build feature-rich, secure, and scalable mobile apps designed to meet your unique business needs. From enterprise solutions to customer-facing apps, we deliver the perfect blend of performance and functionality."},
    {icon: "./assets/icons/ai.png", title: "AI Intergration", details: `At ${metaData.name} we transform businesses with cutting-edge AI solutions that drive innovation, efficiency, and growth. Whether you're looking to enhance operations, improve customer experiences, or make smarter decisions, our AI-driven technologies deliver the insights and automation your business needs to thrive in the digital age.`}
  ]
 