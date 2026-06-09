import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { TeamMember } from "../../data/team";

interface TeamMemberDrawerProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TeamMemberDrawer({ member, isOpen, onClose }: TeamMemberDrawerProps) {
  if (!member) return null;

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] bg-asel-navy/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.aside
            className="mr-auto flex h-full w-full max-w-[430px] flex-col overflow-y-auto bg-white p-6 shadow-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-asel-orange">Team Member</p>
              <button
                onClick={onClose}
                aria-label="Close team member drawer"
                className="rounded-full p-2 hover:bg-asel-off-white"
              >
                <X />
              </button>
            </div>

            <div className="mt-6 flex flex-col items-center text-center">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-28 w-28 rounded-full object-cover shadow-md"
                  style={{ objectPosition: member.photoPosition ?? "center" }}
                />
              ) : (
                <div className="grid h-28 w-28 place-items-center rounded-full bg-asel-yellow/20 font-display text-3xl font-bold text-asel-navy shadow-md">
                  {initials}
                </div>
              )}
              <h2 className="mt-5 font-display text-2xl font-bold text-asel-navy">{member.name}</h2>
              <p className="mt-1 font-mono text-sm font-medium text-asel-orange">{member.title}</p>
            </div>

            <div className="mt-8 flex-1">
              <h3 className="font-display text-lg font-bold text-asel-navy">About</h3>
              <p className="mt-3 leading-7 text-asel-mid-gray">{member.bio}</p>
            </div>

            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-xl border border-asel-navy/15 px-5 py-3 font-bold text-asel-navy transition hover:border-asel-yellow hover:bg-asel-off-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#0A66C2]" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
            </a>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
