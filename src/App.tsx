import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal, Sun, Moon } from "lucide-react";
import { ProfileData } from "./types";
import { defaultProfileData } from "./defaultData";
import { CardPreview } from "./components/CardPreview";
import { ResumeModal } from "./components/ResumeModal";

export default function App() {
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const saved = localStorage.getItem("profile-data-saved");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Use the latest defaultProfileData, and only restore avatarUrl if it was customized
        let finalAvatarUrl = parsed.avatarUrl || defaultProfileData.avatarUrl;
        if (
          finalAvatarUrl === "https://github.com/Ankur1079.png" || 
          finalAvatarUrl === "https://avatars.githubusercontent.com/Ankur1079"
        ) {
          finalAvatarUrl = "/avatar.jpg";
        }
        return { 
          ...defaultProfileData, 
          avatarUrl: finalAvatarUrl 
        };
      } catch (e) {
        return defaultProfileData;
      }
    }
    return defaultProfileData;
  });
  const [resumeOpen, setResumeOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Synchronize document body theme classes for page-wide smooth transitions
  useEffect(() => {
    const isDark = theme === "dark";
    document.body.className = isDark ? "theme-dark" : "theme-light";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [theme]);

  const triggerViewResume = () => {
    if (profileData.useInteractiveResume) {
      setResumeOpen(true);
    } else if (profileData.socials.resumeUrl) {
      window.open(profileData.socials.resumeUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleAvatarChange = (newBase64: string) => {
    setProfileData(prev => {
      const updated = { ...prev, avatarUrl: newBase64 };
      localStorage.setItem("profile-data-saved", JSON.stringify(updated));
      return updated;
    });
  };

  const handleResetAvatar = () => {
    setProfileData(prev => {
      const updated = { ...prev, avatarUrl: defaultProfileData.avatarUrl };
      localStorage.setItem("profile-data-saved", JSON.stringify(updated));
      return updated;
    });
  };

  const isDark = theme === "dark";

  return (
    <div 
      id="interactive-card-applet" 
      className={`min-h-screen w-full relative flex flex-col justify-between py-4 md:py-8 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#0c0f16] text-[#f1f5f9]" : "bg-[#f8fafc] text-[#0f172a]"
      }`}
    >
      {/* Ambient glowing blobs tailored per theme */}
      {isDark ? (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/3 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-indigo-50/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/3 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-violet-50/20 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}

      {/* Main Single Card Workstation */}
      <main className="w-full max-w-sm md:max-w-5xl mx-auto flex flex-col items-center justify-center flex-grow relative z-10 my-4 md:my-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          {/* Card Presentation element */}
          <CardPreview 
            data={profileData} 
            onViewResume={triggerViewResume} 
            theme={theme} 
            onThemeToggle={() => setTheme(prev => prev === "light" ? "dark" : "light")} 
            onAvatarChange={handleAvatarChange}
            onResetAvatar={handleResetAvatar}
          />
        </motion.div>
      </main>

      {/* Elegant minimalist footer */}
      <footer className={`w-full max-w-xl mx-auto border-t pt-6 text-center text-xs relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors ${
        isDark ? "border-slate-900 text-slate-500" : "border-slate-200/80 text-slate-400"
      }`}>
        <span className="font-medium">© 2026 {profileData.name}. All rights reserved.</span>
        <div className={`flex items-center gap-2 text-[10px] font-mono px-2.5 py-1 rounded-md transition-colors border ${
          isDark 
            ? "text-slate-400 bg-slate-900 border-slate-800/80" 
            : "text-slate-600 bg-slate-50 border-slate-200/50"
        }`}>
          <Terminal size={11} className={isDark ? "text-violet-400" : "text-indigo-600"} />
          <span>PORTFOLIO & RESUME HUB</span>
        </div>
      </footer>

      {/* Conditionally Render Interactive Resume CV Modal */}
      <ResumeModal 
        isOpen={resumeOpen} 
        onClose={() => setResumeOpen(false)} 
        data={profileData} 
      />
    </div>
  );
}
