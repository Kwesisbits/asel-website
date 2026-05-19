export type ProgramTrack = "technical" | "digital" | "career";
export type ProgramFormat = "In-Person" | "Hybrid" | "Online";

export interface Program {
  id: string;
  track: ProgramTrack;
  title: string;
  duration: string;
  format: ProgramFormat;
  certification: string;
  summary: string;
  learningPoints: string[];
  targetAudience: string;
  isComingSoon?: boolean;
}

export interface UIState {
  isPartnerDrawerOpen: boolean;
  signupModal: {
    isOpen: boolean;
    preSelectedProgram: string | null;
  };
}
