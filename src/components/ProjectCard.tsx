
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import FileUpload from "./FileUpload";

interface Demo {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  acceptedTypes: string;
  status: string;
  gradient: string;
  requiresUpload?: boolean;
}

interface ProjectCardProps {
  demo: Demo;
  isActive: boolean;
  onUpload: (file: File) => void;
  onActivate: () => void;
}

const ProjectCard = ({ demo, isActive, onUpload, onActivate }: ProjectCardProps) => {
  const { icon: Icon } = demo;
  const isComingSoon = demo.status === "Coming Soon";

  return (
    <Card 
      className={`
        relative overflow-hidden transition-all duration-300 cursor-pointer group
        bg-white/5 border-white/10 backdrop-blur-sm
        hover:bg-white/10 hover:scale-105 hover:shadow-2xl
        ${isActive ? "ring-2 ring-blue-500 bg-white/10" : ""}
      `}
      onClick={!isComingSoon ? onActivate : undefined}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${demo.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between mb-2">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${demo.gradient} bg-opacity-20`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <Badge 
            variant={isComingSoon ? "secondary" : "default"}
            className={
              isComingSoon 
                ? "bg-gray-500/20 text-gray-400 border-gray-500/30" 
                : "bg-green-500/20 text-green-400 border-green-500/30"
            }
          >
            {demo.status}
          </Badge>
        </div>
        <CardTitle className="text-white text-xl">{demo.title}</CardTitle>
        <CardDescription className="text-gray-300">
          {demo.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative flex items-center justify-center min-h-[30vh]">
        {!isComingSoon ? (
          <>
            {demo.title === "AI Chatbot" ? (
              <Button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onActivate();
                }}
              >
                Start Chat
              </Button>
            ) : isActive ? (
              <FileUpload
                onFileUpload={onUpload}
                acceptedTypes={demo.acceptedTypes}
                className="w-full"
              />
            ) : (
              <Button
                variant="outline"
                className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onActivate();
                }}
              >
                Try Demo
              </Button>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Coming Soon</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-3/4 animate-pulse"></div>
            </div>
          </div>
        )}
      </CardContent>

    </Card>
  );
};

export default ProjectCard;
