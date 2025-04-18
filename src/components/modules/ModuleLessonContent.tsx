
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ArrowLeft, ArrowRight, Book, Play } from "lucide-react";
import DOMPurify from "dompurify";

// Define proper interfaces for the lazy-loaded components
interface RosettaLearningProps {
  moduleId: string;
  onComplete: () => void;
}

export interface ModuleQuizProps {
  moduleId: string;
  questions: any[];
  onComplete: (score?: number, totalQuestions?: number) => void;
  quizData?: any;
  onQuizComplete?: () => void;
}

// Import components with proper lazy loading
const RosettaLearning = React.lazy(() => import("./rosetta/RosettaLearning")) as React.FC<RosettaLearningProps>;
const ModuleQuiz = React.lazy(() => import("./ModuleQuiz")) as React.FC<ModuleQuizProps>;

export interface ModuleLessonContentProps {
  moduleId: string;
  lessonId: string;
  lessonTitle: string;
  lessonContent: string;
  quizData?: any;
  onBack: () => void;
  onNext: () => void;
  onComplete: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  activeLesson?: any;
  isCompleted?: boolean;
}

const ModuleLessonContent: React.FC<ModuleLessonContentProps> = ({
  moduleId,
  lessonId,
  lessonTitle,
  lessonContent,
  quizData,
  onBack,
  onNext,
  onComplete,
  hasNext = false,
  hasPrevious = false,
  activeLesson,
  isCompleted = false,
}) => {
  const [currentTab, setCurrentTab] = useState<string>("content");
  const [lessonCompleted, setLessonCompleted] = useState<boolean>(isCompleted);

  const handleLessonComplete = () => {
    setLessonCompleted(true);
    onComplete();
  };

  const sanitizedContent = lessonContent ? DOMPurify.sanitize(lessonContent) : "";

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">{lessonTitle}</CardTitle>
          {lessonCompleted && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="mr-1 h-5 w-5" />
              <span className="text-sm">Complété</span>
            </div>
          )}
        </div>
        <CardDescription>Module: {moduleId}</CardDescription>
      </CardHeader>

      <Tabs defaultValue="content" value={currentTab} onValueChange={setCurrentTab}>
        <div className="px-6">
          <TabsList className="w-full">
            <TabsTrigger value="content" className="flex-1">
              <Book className="mr-2 h-4 w-4" />
              Contenu
            </TabsTrigger>
            <TabsTrigger value="interactive" className="flex-1">
              <Play className="mr-2 h-4 w-4" />
              Apprentissage interactif
            </TabsTrigger>
            {quizData && (
              <TabsTrigger value="quiz" className="flex-1">
                <CheckCircle className="mr-2 h-4 w-4" />
                Quiz
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        <CardContent className="pt-6">
          <TabsContent value="content">
            <div 
              className="prose prose-sm lg:prose-base max-w-none dark:prose-invert prose-headings:text-primary"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </TabsContent>

          <TabsContent value="interactive">
            <React.Suspense fallback={<div>Chargement...</div>}>
              <RosettaLearning 
                moduleId={moduleId}
                onComplete={handleLessonComplete}
              />
            </React.Suspense>
          </TabsContent>

          {quizData && (
            <TabsContent value="quiz">
              <React.Suspense fallback={<div>Chargement...</div>}>
                <ModuleQuiz
                  moduleId={moduleId}
                  questions={quizData.questions || []}
                  onComplete={handleLessonComplete}
                  quizData={quizData}
                  onQuizComplete={handleLessonComplete}
                />
              </React.Suspense>
            </TabsContent>
          )}
        </CardContent>
      </Tabs>

      <CardFooter className="flex justify-between pt-2">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={!hasPrevious}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Précédent
        </Button>

        {!lessonCompleted && (
          <Button
            variant="default"
            onClick={handleLessonComplete}
            className="flex items-center"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Marquer comme terminé
          </Button>
        )}

        <Button
          onClick={onNext}
          disabled={!hasNext}
          className="flex items-center"
        >
          Suivant
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleLessonContent;
