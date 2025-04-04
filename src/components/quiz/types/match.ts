
import { QuizQuestion } from "../types";

export interface MatchParticipant {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  correctAnswers: number;
  totalAnswers: number;
}

export interface Match {
  id: string;
  title: string;
  createdAt: Date;
  status: "pending" | "active" | "completed";
  category: string;
  questions: QuizQuestion[];
  participants: MatchParticipant[];
  inviteLink?: string;
  creator: string;
}

export interface MatchInvite {
  matchId: string;
  invitedBy: string;
  category: string;
  message: string;
}

// Currently we're not using Supabase for matches, but we're defining these types
// for future integration
export interface MatchPlayer {
  id: string;
  match_id: string;
  user_id: string;
  joined_at: Date;
  score?: number;
}
