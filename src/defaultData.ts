import { ProfileData } from "./types";

export const defaultProfileData: ProfileData = {
  name: "Ankur Yadav",
  pronouns: "he/him",
  title: "Computer Science Student & Full-Stack Developer",
  company: "Sister Nivedita University",
  location: "Kolkata, West Bengal",
  avatarUrl: "/avatar.jpg",
  summary: "Computer Science student and Full-Stack Developer with a strong focus on React.js.",
  skills: [
    "C",
    "C++",
    "Python",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "React.js",
    "MongoDB",
    "Node.js",
    "Github",
    "Git Bash",
    "Data Structures & Algorithms",
    "Object Orientated Programming"
  ],
  socials: {
    github: "https://github.com/Ankur1079",
    linkedin: "https://linkedin.com/in/ankuryadav1079",
    twitter: "",
    email: "ankuryadav1079@gmail.com",
    phone: "+91 6394798750",
    portfolio: "https://ankur-yadav-two.vercel.app/",
    resumeUrl: "",
    customLabel: "",
    customUrl: ""
  },
  useInteractiveResume: true,
  experiences: [
    {
      id: "exp-1",
      role: "Data Annotator Intern",
      company: "RT Network Solution Pvt.Ltd",
      period: "Feb 2026 - March 2026",
      description: "• AI training / prompt evaluation\n• AI models by labeling, transcribing, evaluation text, images, and audio"
    }
  ],
  educations: [
    {
      id: "edu-1",
      degree: "B.Tech in Computer Science and Engineering (CGPA: 6.27)",
      school: "Sister Nivedita University",
      period: "2023 - 2027"
    },
    {
      id: "edu-2",
      degree: "Higher Secondary (CBSE - 64.2%)",
      school: "Shri Santoshi Maa Academy",
      period: "2022 - 2023"
    },
    {
      id: "edu-3",
      degree: "Secondary (ICSE - 79.8%)",
      school: "Budge Budge St. Paul's Day School",
      period: "2020 - 2021"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "My Portfolio",
      description: "Tech Stack: HTML | Tailwind CSS | React js | Three js\n• Front-end using React js.\n• Interactive UI with Tailwind CSS.\n• 3D Motion with Three js.",
      link: "https://ankur-yadav-two.vercel.app/"
    }
  ],
  certifications: [
    "Fullstack developer certificate (Meta)",
    "Generative AI and Prompt Engineering",
    "Postman API Certification",
    "Coding Ninja SlayGround"
  ]
};
