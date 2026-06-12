import React, { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Copy, 
  Check,
  Award
} from "lucide-react";
import { ProfileData } from "../types";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ProfileData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, data }) => {
  const [copied, setCopied] = React.useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const {
    name,
    title,
    company,
    location,
    summary,
    skills,
    socials,
    experiences,
    educations,
    projects,
    certifications
  } = data;

  const handlePrint = () => {
    // Elegant standard window printing for browser
    window.print();
  };

  const handleCopyTextResume = () => {
    const formatted = `
${name.toUpperCase()}
${title} ${company ? `at ${company}` : ""}
${location} | Email: ${socials.email} | Phone: ${socials.phone}
Portfolio: ${socials.portfolio} | Github: ${socials.github} | LinkedIn: ${socials.linkedin}

--------------------------------------------------
PROFESSIONAL SUMMARY
${summary}

--------------------------------------------------
SKILLS
${skills.join(", ")}

--------------------------------------------------
EXPERIENCE
${experiences.map(exp => `
• ${exp.role} - ${exp.company} (${exp.period})
  ${exp.description}
`).join("\n")}

--------------------------------------------------
EDUCATION
${educations.map(edu => `
• ${edu.degree} - ${edu.school} (${edu.period})
`).join("\n")}

--------------------------------------------------
FEATURED PROJECTS
${projects.map(proj => `
• ${proj.title}
  ${proj.description}
  Link: ${proj.link}
`).join("\n")}

${certifications && certifications.length > 0 ? `
--------------------------------------------------
CERTIFICATIONS
${certifications.map(cert => `• ${cert}`).join("\n")}
` : ""}
    `.trim();

    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div id="resume-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          id="resume-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col my-8 max-h-[85vh]"
        >
          {/* Header Action bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-850 bg-slate-900 sticky top-0 z-10 rounded-t-2xl">
            <div>
              <h3 className="text-md font-bold text-white flex items-center gap-2">
                <span>Interactive Resume Viewer</span>
              </h3>
              <p className="text-xs text-slate-400">Print or copy a raw plaintext markdown of your resume.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyTextResume}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg border border-slate-700 transition-colors"
                title="Copy formatted text to clipboard"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                <span>{copied ? "Copied Plaintext!" : "Copy Raw Text"}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors border border-indigo-500"
                title="Trigger local print layouts"
              >
                <Printer size={14} />
                <span>Print CV / PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-805 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Printable Scroll Box */}
          <div className="overflow-y-auto p-6 md:p-10 bg-white text-slate-800 print:bg-white print:text-black">
            {/* Styles inject explicitly for clean printer layouts */}
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                body * {
                  visibility: hidden;
                }
                #resume-modal-overlay {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  z-index: 9999;
                }
                #resume-modal-card {
                  box-shadow: none !important;
                  border: none !important;
                  max-height: none !important;
                  width: 100% !important;
                  max-width: none !important;
                  position: absolute;
                  left: 0;
                  top: 0;
                }
                #resume-printable-area, #resume-printable-area * {
                  visibility: visible;
                }
                #resume-printable-area {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                }
                .no-print {
                  display: none !important;
                }
              }
            `}} />

            {/* Printable Frame wrapper */}
            <div id="resume-printable-area" ref={printAreaRef} className="space-y-7 text-left">
              
              {/* Profile header block */}
              <div className="border-b-2 border-slate-900 pb-5">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-none">
                      {name || "Your Name"}
                    </h1>
                    <p className="text-md md:text-lg text-slate-600 font-semibold mt-1">
                      {title || "Specialty Title"} {company ? `at ${company}` : ""}
                    </p>
                  </div>

                  <div className="text-xs md:text-right space-y-1 text-slate-600 font-medium">
                    <div className="flex md:justify-end items-center gap-1.5">
                      <MapPin size={12} className="text-slate-500" />
                      <span>{location || "San Francisco, CA"}</span>
                    </div>
                    {socials.email && (
                      <div className="flex md:justify-end items-center gap-1.5">
                        <Mail size={12} className="text-slate-500" />
                        <a href={`mailto:${socials.email}`} className="hover:underline">{socials.email}</a>
                      </div>
                    )}
                    {socials.phone && (
                      <div className="flex md:justify-end items-center gap-1.5">
                        <Phone size={12} className="text-slate-500" />
                        <a href={`tel:${socials.phone}`} className="hover:underline">{socials.phone}</a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sub-Contact Link Icons */}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-indigo-750 font-bold border-t border-slate-100 pt-3">
                  {socials.portfolio && (
                    <a href={socials.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                      <Globe size={11} /> Portfolio: {socials.portfolio.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                  {socials.linkedin && (
                    <a href={socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                      <Globe size={11} /> LinkedIn: {socials.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
                    </a>
                  )}
                  {socials.github && (
                    <a href={socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                      <Globe size={11} /> GitHub: {socials.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                    </a>
                  )}
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-2">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                  Professional Objective & Summary
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-wrap">
                  {summary || "Dedicated professional ready to tackle engineering roadblocks."}
                </p>
              </div>

              {/* Skills */}
              {skills && skills.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                    Technical Expertise & Core Skills
                  </h2>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 text-xs font-semibold rounded font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Experience */}
              <div className="space-y-3">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                  <Briefcase size={14} /> Professional Experience
                </h2>

                {experiences.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No historical timeline items provided.</p>
                ) : (
                  <div className="space-y-4">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                          <h3 className="text-xs font-extrabold text-slate-900">
                            {exp.role || "Role Position"} <span className="text-slate-400 font-normal">|</span> <span className="text-slate-700 font-bold">{exp.company || "Enterprise Corp"}</span>
                          </h3>
                          <span className="text-xs text-slate-500 font-bold font-mono">{exp.period || "Period"}</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-wrap pl-1 border-l-2 border-slate-100">
                          {exp.description || "Work objectives details."}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                  <GraduationCap size={15} /> Academic Background
                </h2>

                {educations.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">Education details empty.</p>
                ) : (
                  <div className="space-y-3">
                    {educations.map((edu) => (
                      <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                        <div>
                          <h3 className="text-xs font-extrabold text-slate-900">
                            {edu.degree || "Degree credentials"}
                          </h3>
                          <p className="text-xs text-slate-600">{edu.school || "Alma university"}</p>
                        </div>
                        <span className="text-xs text-slate-500 font-bold font-mono">{edu.period || "Grad Period"}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Projects */}
              {projects && projects.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                    <FolderGit2 size={14} /> Selected Software Projects
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="border border-slate-100 p-3 rounded-lg bg-slate-50">
                        <h3 className="text-xs font-extrabold text-slate-900 flex items-center justify-between">
                          <span>{proj.title || "Project title"}</span>
                          {proj.link && (
                            <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-700 hover:underline inline-flex items-center gap-0.5 no-print">
                              View Code
                            </a>
                          )}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">
                          {proj.description || "Project summary objective details."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {certifications && certifications.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                    <Award size={15} /> Professional Certifications
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2 border border-slate-100 p-2.5 rounded-lg bg-slate-50/70">
                        <div className="h-2 w-2 rounded-full bg-indigo-600" />
                        <span className="text-xs text-slate-800 font-semibold">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Footer warning bar */}
          <div className="px-6 py-3 border-t border-slate-850 bg-slate-900 rounded-b-2xl flex items-center justify-between text-[11px] text-slate-500">
            <span>All details fully compiled. Click Print CV to download standard hard-copy PDF layouts seamlessly.</span>
            <span className="font-mono">Page 1 of 1</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
