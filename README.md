# 🤖 AI Resume Builder - React Frontend
A sleek and intelligent resume builder with **AI-powered** content generation. Built with **React** + **Vite**, **TailwindCSS**, and **Clerk Authentication**.
<br/>

A comprehensive resume builder application that allows users to **create, edit, and manage** professional resumes with ease. Users can **register/login** via Clerk authentication, build resumes with personal details, job summary, experience, education, and skills sections. The app features **multiple themes**, **PDF download/sharing** capabilities, and complete **CRUD operations** for resume management. Built with **React Router** for seamless navigation, authentication flow management, and proper 404 handling.
<br/>

## 🌟 Features
- 🤖 **AI-Powered** content generation and suggestions
- 📝 **Interactive Resume Builder** with real-time preview
- 🔐 **Secure Authentication** with Clerk
- 🎨 **Professional Templates** - ATS-friendly designs
- 📱 **Fully Responsive** design
- 📄 **PDF Export** functionality
- ⚡ **Lightning Fast** performance with Vite

## 🔗 Connected Strapi Backend Repo
👉 [Strapi Backend Repository](https://github.com/fldvlpr/react-ai-builder-strapi-admin)
<br/>

## 🚀 Live Demo
Check out the live application:
👉 [Visit AI Resume Builder Here](https://tg-react-ai-resume-builder.netlify.app/) 
<br/>

## 📱 Web Preview
[https://github.com/user-attachments/assets/59365e9e-fa2f-417e-a3aa-30152bad2af8
<br/>](https://github.com/user-attachments/assets/9bff0916-4bbe-48c6-ae7e-c1bb9eb07c35)

## 📦 Tech Stack
- React + Vite Build Tools
- TailwindCSS
- Clerk (Authentication)
- Strapi CMS (Backend on Render)
- Google Gemini AI API

## 🛠️ Setup Instructions

1. **Clone this repository:**
   ```bash
   git clone https://github.com/fldvlpr/react-ai-resume-builder-app.git
   cd react-ai-resume-builder-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a **.env.local** file in the root directory and add environment variables as following:
   ```bash
   # Clerk Authentication
   VITE_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
   
   # Strapi Backend
   VITE_STRAPI_API_KEY=<your_strapi_api_key>
   VITE_BASE_URL=<your_web_host_url>
   
   # AI Service
   VITE_GOOGLE_AI_API_KEY=<your_google_gemini_api_key>
   ```

4. **Configure Clerk Authentication**
   
   👉 Sign up for a free account at [Clerk.dev](https://clerk.dev). Create a new application and copy your publishable key to the **.env.local** file.

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
