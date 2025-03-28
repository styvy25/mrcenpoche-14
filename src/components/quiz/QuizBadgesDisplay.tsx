
import React from "react";
import { BadgeProps } from "./types";

interface QuizBadgesDisplayProps {
  badges: BadgeProps[];
}

const QuizBadgesDisplay: React.FC<QuizBadgesDisplayProps> = ({ badges }) => {
  if (badges.length === 0) return null;

  return (
    <div className="flex flex-col items-center mt-6">
      <h3 className="text-lg font-semibold mb-3">Badges gagnés</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {badges.map((badge) => {
          const IconComponent = badge.icon && badge.icon.icon ? badge.icon.icon : null;
          return (
            <div
              key={badge.id}
              className="flex flex-col items-center bg-white rounded-lg p-3 shadow-sm w-28"
            >
              {IconComponent && <IconComponent className={badge.icon && badge.icon.className ? badge.icon.className : ""} />}
              <span className="text-sm font-medium mt-1 text-center">
                {badge.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizBadgesDisplay;
