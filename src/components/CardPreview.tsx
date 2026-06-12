import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  Globe, 
  FileText, 
  Link2, 
  MapPin, 
  Building2,
  ExternalLink,
  Sparkles,
  Sun,
  Moon,
  Award,
  GraduationCap,
  Briefcase,
  Check,
  Copy,
  Calendar,
  BadgeCheck,
  Atom,
  Wind,
  Terminal,
  Database,
  Cpu,
  Braces,
  Layers,
  Triangle,
  CreditCard,
  Shield,
  UserCheck,
  Camera
} from "lucide-react";
import { ProfileData } from "../types";

interface CardPreviewProps {
  data: ProfileData;
  onViewResume: () => void;
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
  onAvatarChange?: (newBase64: string) => void;
  onResetAvatar?: () => void;
}

export const CardPreview: React.FC<CardPreviewProps> = ({ 
  data, 
  onViewResume, 
  theme = "light", 
  onThemeToggle,
  onAvatarChange,
  onResetAvatar
}) => {
  const isDark = theme === "dark";
  const [copied, setCopied] = React.useState(false);

  const {
    name,
    pronouns,
    title,
    company,
    location,
    avatarUrl,
    summary,
    skills,
    socials,
    useInteractiveResume
  } = data;

  const handleCopyEmail = () => {
    if (!socials.email) return;
    navigator.clipboard.writeText(socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAvatarClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && onAvatarChange) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result && typeof reader.result === "string") {
            onAvatarChange(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Maps popular skills to beautiful colored brand indicators or modern Lucide icons
  const getSkillIcon = (skillName: string) => {
    const nameLower = skillName.toLowerCase();
    
    if (nameLower.includes("typescript")) {
      return (
        <span className="bg-[#3178C6] text-white text-[8px] font-extrabold px-0.5 rounded-sm flex items-center justify-center leading-none h-3.5 w-3.5 select-none">
          TS
        </span>
      );
    }
    if (nameLower.includes("javascript")) {
      return (
        <span className="bg-[#F7DF1E] text-black text-[8px] font-extrabold px-0.5 rounded-sm flex items-center justify-center leading-none h-3.5 w-3.5 select-none">
          JS
        </span>
      );
    }
    if (nameLower.includes("next.js") || nameLower.includes("nextjs")) {
      return (
        <span className="bg-[#111111] dark:bg-white text-white dark:text-black text-[8px] font-extrabold px-0.5 rounded-full flex items-center justify-center leading-none h-3.5 w-3.5 select-none font-mono">
          N
        </span>
      );
    }
    if (nameLower.includes("react")) {
      return <Atom size={13} className="text-cyan-400 dark:text-cyan-300 animate-[spin_8s_linear_infinite]" />;
    }
    if (nameLower.includes("tailwind")) {
      return <Wind size={13} className="text-sky-400" />;
    }
    if (nameLower.includes("node")) {
      return <ServerIcon />;
    }
    if (nameLower.includes("mongodb") || nameLower.includes("mongo")) {
      return <Database size={13} className="text-emerald-600 dark:text-emerald-400" />;
    }
    if (nameLower.includes("python")) {
      return <Terminal size={13} className="text-amber-500" />;
    }
    if (nameLower.includes("html")) {
      return <span className="text-orange-500 font-mono text-[9px] font-extrabold">&lt;/&gt;</span>;
    }
    if (nameLower.includes("css")) {
      return <Sparkles size={12} className="text-pink-500" />;
    }
    if (nameLower.includes("github") || nameLower.includes("git")) {
      return <Github size={13} className="text-slate-700 dark:text-slate-300" />;
    }
    if (nameLower.includes("stripe")) {
      return <CreditCard size={13} className="text-indigo-500" />;
    }
    if (nameLower.includes("auth")) {
      return <Shield size={13} className="text-violet-500" />;
    }
    if (nameLower.includes("supabase")) {
      return <Sparkles size={13} className="text-emerald-400" />;
    }
    if (nameLower.includes("vercel")) {
      return <Triangle size={12} className="text-black dark:text-white fill-black dark:fill-white" />;
    }
    if (nameLower.includes("c++")) {
      return <Cpu size={13} className="text-rose-500" />;
    }
    if (nameLower.includes("c")) {
      return <Cpu size={13} className="text-blue-500" />;
    }
    if (nameLower.includes("dsa") || nameLower.includes("structures") || nameLower.includes("algorithms")) {
      return <Braces size={13} className="text-indigo-500" />;
    }
    if (nameLower.includes("oop") || nameLower.includes("object")) {
      return <Layers size={13} className="text-purple-500" />;
    }

    return <Cpu size={13} className="text-slate-405" />;
  };

  const ServerIcon = () => (
    <svg className="h-3.5 w-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="1.5" />
      <rect x="2" y="14" width="20" height="8" rx="1.5" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );

  return (
    <div id="card-preview-container" className="relative w-full max-w-[440px] mx-auto px-1 sm:px-0 group/card">
      {/* Soft rotating blur glow behind the entire card */}
      <div className="absolute -inset-2.5 rounded-[34px] pointer-events-none blur-xl opacity-25 dark:opacity-45 transition-opacity duration-300 group-hover/card:opacity-40 dark:group-hover/card:opacity-60 animate-[spin_12s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_15%,#6366f1_40%,#d946ef_65%,#38bdf8_85%,transparent_100%)]" />

      {/* Main beautifully styled Card layout matching the user's mockup */}
      <motion.div
        id="intro-card-main"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden rounded-[28px] p-[1.5px] transition-all duration-300 shadow-2xl ${
          isDark 
            ? "bg-slate-900/40 shadow-slate-950/80" 
            : "bg-slate-200/50 shadow-slate-200/40"
        }`}
      >
        {/* Spinning razor-thin border light */}
        <div className="absolute inset-0 pointer-events-none animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_15%,#6366f1_40%,#d946ef_65%,#38bdf8_85%,transparent_100%)]" />

        {/* Inner Card Content Frame */}
        <div className={`relative rounded-[26.5px] overflow-hidden ${
          isDark ? "bg-[#0E0E12] text-white" : "bg-white text-[#111111]"
        }`}>
          <div className="p-4 sm:p-8 flex flex-col">
          
          {/* Header row containing Moon/Sun and Resume buttons inside card margin margins */}
          <div className="flex items-center justify-between w-full mb-2 sm:mb-3">
            
            {/* Theme Toggle Capsule Button */}
            {onThemeToggle && (
              <motion.button
                id="theme-toggle"
                onClick={onThemeToggle}
                className={`flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs font-bold rounded-full border transition-all duration-200 shadow-sm cursor-pointer ${
                  isDark
                    ? "border-slate-800 bg-[#14141A] text-slate-300 hover:text-white hover:bg-[#1C1C24]"
                    : "border-slate-200/90 bg-white text-slate-700 hover:text-black hover:bg-slate-50"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {isDark ? (
                  <>
                    <Sun size={12} className="text-amber-400 fill-amber-300/40 sm:w-3.5 sm:h-3.5" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon size={12} className="text-slate-600 fill-slate-500/15 sm:w-3.5 sm:h-3.5" />
                    <span>Dark</span>
                  </>
                )}
              </motion.button>
            )}

            {/* Resume / Portfolio PDF Button */}
            <motion.button
              id="resume-trigger"
              onClick={onViewResume}
              className={`flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs font-bold rounded-full border transition-all duration-200 shadow-sm cursor-pointer ${
                isDark
                  ? "border-slate-800 bg-[#14141A] text-slate-300 hover:text-white hover:bg-[#1C1C24]"
                  : "border-slate-200/90 bg-white text-slate-700 hover:text-black hover:bg-slate-50"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <FileText size={12} className="opacity-80 sm:w-3.5 sm:h-3.5" />
              <span>Resume</span>
            </motion.button>
          </div>

          {/* Centered Profile Avatar Section */}
          <div className="relative mx-auto mt-2 sm:mt-4 group select-none">
            
            {/* Spinning background neon soft blur glow */}
            <div className={`absolute -inset-2.5 rounded-full filter blur-[12px] opacity-75 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_15%,#6366f1_40%,#d946ef_65%,#38bdf8_85%,transparent_100%)]`} />

            {/* Main Circle Container with Rotating Border */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className={`relative w-[84px] h-[84px] sm:w-[116px] sm:h-[116px] lg:w-[132px] lg:h-[132px] rounded-full p-[2.5px] outline-none overflow-hidden transition-all duration-300 shadow-md ${
                isDark 
                  ? "bg-slate-900 shadow-violet-950/20" 
                  : "bg-white shadow-indigo-100/50"
              }`}
            >
              {/* Spinning Sharp Border Light */}
              <div className={`absolute inset-0 pointer-events-none animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_15%,#6366f1_40%,#d946ef_65%,#38bdf8_85%,transparent_100%)]`} />

              {/* Inner Frame over rotating background */}
              <div className={`absolute inset-[2px] rounded-full overflow-hidden transition-colors duration-300 ${
                isDark ? "bg-[#0E0E12]" : "bg-white"
              }`}>
                {avatarUrl ? (
                  <img
                    id="profile-avatar-img"
                    src={avatarUrl}
                    alt={name}
                    className="h-full w-full object-cover select-none"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || "John")}`;
                    }}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-700 text-2xl sm:text-3xl font-extrabold text-white">
                    {name ? name.charAt(0) : "U"}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Premium Verification Accent Badge */}
            <div 
              className={`absolute bottom-0 right-0 h-5.5 w-5.5 sm:h-7 sm:w-7 rounded-full flex items-center justify-center shadow-md border-2 z-10 ${
                isDark 
                  ? "bg-black border-[#0E0E12]" 
                  : "bg-black border-white"
              }`}
              style={{ contentVisibility: "auto" }}
            >
              <Check size={8} className="text-white stroke-[4] sm:w-[11px] sm:h-[11px]" />
            </div>
          </div>

          {/* Identification Details */}
          <h1 id="card-profile-name" className={`text-lg sm:text-2xl font-extrabold text-center mx-auto mt-3 sm:mt-5 tracking-tight transition-colors ${
            isDark ? "text-white" : "text-[#111111]"
          }`}>
            {name || "Ankur Yadav"}
          </h1>

          {/* Specialty Sub-Title Pill Tag */}
          <div className="flex justify-center mt-1 sm:mt-2">
            <span className={`inline-flex items-center px-3.5 py-0.5 sm:px-4 sm:py-1 text-[10px] sm:text-xs font-bold rounded-full border shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${
              isDark 
                ? "border-slate-800 bg-[#14141A] text-slate-300" 
                : "border-slate-200 bg-white text-slate-600"
            }`}>
              {title || "Full-Stack Developer"}
            </span>
          </div>

          {/* About Me Title */}
          <div className={`flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-bold mt-2.5 sm:mt-4 select-none ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}>
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-indigo-500" />
            <span className="uppercase tracking-wider">About Me</span>
          </div>

          {/* Core About summary */}
          <p id="card-profile-summary" className={`text-xs sm:text-sm text-center leading-relaxed max-w-sm mx-auto mt-1.5 sm:mt-3 px-1 whitespace-pre-wrap ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}>
            {summary || "Full-Stack Developer passionate about user experience and responsive applications."}
          </p>

          {/* Elegant Wrapped Skill Badges Grid */}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-3 sm:mt-5 max-w-sm mx-auto">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-xs font-extrabold shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-150 ${
                    isDark 
                      ? "bg-[#13131A] border-slate-800 hover:border-slate-700 text-slate-200" 
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  {getSkillIcon(skill)}
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          )}

          {/* Single Primary Action button: Portfolio */}
          <div className="max-w-sm mx-auto w-full mt-3.5 sm:mt-6">
            <motion.a
              id="portfolio-btn"
              href={socials.portfolio || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-extrabold rounded-lg sm:rounded-xl shadow-md cursor-pointer transition-all duration-200 w-full ${
                isDark
                  ? "bg-white hover:bg-slate-100 text-black"
                  : "bg-black hover:bg-black/90 text-white"
              }`}
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Globe size={13} className="sm:w-3.5 sm:h-3.5" />
              <span>Portfolio</span>
            </motion.a>
          </div>

          {/* Interactive Input Copy Email block Box */}
          {socials.email && (
            <div className={`mt-3 sm:mt-5 flex items-center justify-between border rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 max-w-sm mx-auto w-full transition-colors ${
              isDark 
                ? "border-slate-800 bg-[#13131A]/40" 
                : "border-slate-200 bg-slate-50/50"
            }`}>
              <div className="flex items-center gap-2 overflow-hidden">
                <Mail size={13} className="text-slate-400 flex-shrink-0 sm:w-3.5 sm:h-3.5" />
                <span className={`text-[10px] sm:text-xs font-semibold truncate select-all font-mono leading-none ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}>
                  {socials.email}
                </span>
              </div>

              {/* Copy action target link */}
              <button
                id="copy-email-trigger"
                onClick={handleCopyEmail}
                className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg border transition-all cursor-pointer flex items-center justify-center flex-shrink-0 ${
                  copied
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                    : isDark
                      ? "border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                      : "border-slate-200 bg-white text-slate-500 hover:text-slate-950 hover:bg-slate-50 shadow-xs"
                }`}
                title="Copy email to clipboard"
              >
                {copied ? <Check size={10} className="stroke-[3] sm:w-3.5 sm:h-3.5" /> : <Copy size={10} className="sm:w-3.5 sm:h-3.5" />}
              </button>
            </div>
          )}

          {/* Horizontal Row of square outline social media buttons */}
          <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 max-w-sm mx-auto w-full pb-1" id="socials-grid">
            
            {/* LinkedIn */}
            {socials.linkedin && (
              <motion.a
                href={socials.linkedin.startsWith("http") ? socials.linkedin : `https://linkedin.com/in/${socials.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl border flex items-center justify-center transition-all shadow-sm ${
                  isDark 
                    ? "border-slate-800 bg-[#13131A] text-slate-300 hover:border-violet-500 hover:text-white" 
                    : "border-slate-200/90 bg-white text-slate-600 hover:border-indigo-600 hover:text-indigo-600"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                title="LinkedIn Account"
              >
                <Linkedin size={15} className="sm:w-[18px] sm:h-[18px]" />
              </motion.a>
            )}

            {/* GitHub */}
            {socials.github && (
              <motion.a
                href={socials.github.startsWith("http") ? socials.github : `https://github.com/${socials.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl border flex items-center justify-center transition-all shadow-sm ${
                  isDark 
                    ? "border-slate-800 bg-[#13131A] text-slate-300 hover:border-violet-500 hover:text-white" 
                    : "border-slate-200/90 bg-white text-slate-600 hover:border-[#111111] hover:text-[#111111]"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                title="GitHub Profile"
              >
                <Github size={15} className="sm:w-[18px] sm:h-[18px]" />
              </motion.a>
            )}

            {/* Twitter / X */}
            {socials.twitter && (
              <motion.a
                href={socials.twitter.startsWith("http") ? socials.twitter : `https://twitter.com/${socials.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl border flex items-center justify-center transition-all shadow-sm ${
                  isDark 
                    ? "border-slate-800 bg-[#13131A] text-slate-300 hover:border-violet-500 hover:text-white" 
                    : "border-slate-200/90 bg-white text-slate-600 hover:border-indigo-500 hover:text-indigo-500"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                title="Twitter / X Feed"
              >
                <Twitter size={15} className="sm:w-[18px] sm:h-[18px]" />
              </motion.a>
            )}

            {/* Phone (Alternative) */}
            {socials.phone && (
              <motion.a
                href={`tel:${socials.phone}`}
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl border flex items-center justify-center transition-all shadow-sm ${
                  isDark 
                    ? "border-slate-800 bg-[#13131A] text-slate-300 hover:border-violet-500 hover:text-white" 
                    : "border-slate-200/90 bg-white text-slate-600 hover:border-emerald-600 hover:text-emerald-600"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                title="Call Phone"
              >
                <Phone size={14} className="sm:w-[17px] sm:h-[17px]" />
              </motion.a>
            )}

            {/* Custom Link / Extra */}
            {socials.customUrl && (
              <motion.a
                href={socials.customUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl border flex items-center justify-center transition-all shadow-sm ${
                  isDark 
                    ? "border-slate-800 bg-[#13131A] text-slate-300 hover:border-violet-500 hover:text-white" 
                    : "border-slate-200/90 bg-white text-slate-600 hover:border-indigo-600 hover:text-indigo-600"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={socials.customLabel || "Custom Link"}
              >
                <Link2 size={15} className="sm:w-[18px] sm:h-[18px]" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
      </motion.div>
    </div>
  );
};
