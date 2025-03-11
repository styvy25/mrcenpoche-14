
import { Trophy, Medal, Award, BookCheck, Brain, Star } from "lucide-react";
import { BadgeProps } from "./types";

// Helper function to represent icon components as functions instead of JSX
const createIconComponent = (Icon: typeof Trophy, className: string) => ({
  icon: Icon,
  className: className
});

export const badges: BadgeProps[] = [
  {
    id: "perfect-score",
    name: "Score parfait",
    description: "Obtenir 100% à un quiz",
    icon: createIconComponent(Trophy, "h-8 w-8 text-yellow-500"),
    condition: (score, total) => score === total,
  },
  {
    id: "advanced",
    name: "Niveau avancé",
    description: "Obtenir plus de 90% à un quiz difficile",
    icon: createIconComponent(Medal, "h-8 w-8 text-blue-500"),
    condition: (score, total) => (score / total) > 0.9,
  },
  {
    id: "strong-start",
    name: "Bon début",
    description: "Obtenir plus de 80% à votre premier quiz",
    icon: createIconComponent(Award, "h-8 w-8 text-green-500"),
    condition: (score, total) => (score / total) > 0.8,
  },
  {
    id: "fast-learner",
    name: "Apprentissage rapide",
    description: "Terminer un quiz en moins de 2 minutes avec un bon score",
    icon: createIconComponent(BookCheck, "h-8 w-8 text-purple-500"),
    condition: (score, total) => (score / total) > 0.7,
  },
  {
    id: "knowledge-master",
    name: "Maître du savoir",
    description: "Obtenir plus de 85% sur 5 quiz différents",
    icon: createIconComponent(Brain, "h-8 w-8 text-indigo-500"),
    condition: (score, total) => (score / total) > 0.85,
  },
  {
    id: "perfect-memory",
    name: "Mémoire parfaite",
    description: "Répondre correctement à toutes les questions de mémoire",
    icon: createIconComponent(Star, "h-8 w-8 text-amber-500"),
    condition: (score, total) => score >= total - 1,
  },
];

export const calculateEarnedBadges = (score: number, totalQuestions: number): BadgeProps[] => {
  return badges.filter(badge => badge.condition(score, totalQuestions));
};
