
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Github, Linkedin, Eye, FileText, MessageSquare, ExternalLink, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import FileUpload from "@/components/FileUpload";
import ProjectCard from "@/components/ProjectCard";
import SocialLinks from "@/components/SocialLinks";

const Index = () => {
  const { toast } = useToast();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const handleFileUpload = (file: File, demoType: string) => {
    toast({
      title: "File uploaded!",
      description: `${file.name} ready for ${demoType} processing`,
    });
    console.log(`File uploaded for ${demoType}:`, file);
    // Here you would typically send the file to your FastAPI backend
  };

  const demos = [
    {
      id: "face-recognition",
      title: "Face Recognition",
      description: "Advanced facial detection and recognition using deep learning models",
      icon: Eye,
      acceptedTypes: "image/*,video/*",
      status: "Active",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: "ocr",
      title: "Optical Character Recognition",
      description: "Extract text from images with high accuracy using computer vision",
      icon: FileText,
      acceptedTypes: "image/*",
      status: "Active",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "chatbot",
      title: "AI Chatbot",
      description: "Intelligent conversational AI powered by modern language models",
      icon: MessageSquare,
      acceptedTypes: "",
      status: "Coming Soon",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-800/80 to-gray-900/80 z-10 shadow-lg">
        <div className="container mx-auto px-6 py-3 flex justify-center space-x-8 items-center">
          {/* Logo or Branding (optional) */}
          {/* <div className="text-white text-xl font-semibold">Brand</div> */}

          <a href="#home" className="text-white text-lg font-medium hover:text-blue-400 transition-all duration-300">
            Home
          </a>
          <a href="#about" className="text-white text-lg font-medium hover:text-blue-400 transition-all duration-300">
            About
          </a>
          <a href="#try-now" className="text-white text-lg font-medium hover:text-blue-400 transition-all duration-300">
            Try Now
          </a>
          <a href="#tech-stack" className="text-white text-lg font-medium hover:text-blue-400 transition-all duration-300">
            Tech Stack
          </a>
        </div>
      </div>


      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-blue-800/20" />
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
              🚀 Ongoing Project
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6 animate-fade-in">
              Serdar's AI/ML Playground
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed animate-fade-in">
              An interactive demonstration project where I play with AI/ML Engineering concepts.
              <br />
              <span className="text-blue-400">Researching, learning, building and sharing the journey.</span>
            </p>
            
            {/* Work in Progress Alert */}
            <Alert className="mb-8 bg-amber-900/20 border-amber-500/30 max-w-3xl mx-auto">
              {/*<AlertTriangle className="h-4 w-4 text-amber-400" />*/}
              <AlertDescription className="text-amber-200 text-left">
                <strong>⚠️ Project Depth:</strong> As an individual, running large and complex ML models on cloud infrastructure is too expensive. My current aim is to represent the most simplistic versions of what's possible. The focus is on demonstrating 
                core concepts, clean architecture, and MLOps practices rather than production-scale implementations.
              </AlertDescription>
            </Alert>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
                onClick={() => window.open("https://github.com/tserdar/web_app", "_blank")}
              >
                <Github className="mr-2 h-5 w-5" />
                View Project Repository
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              About This Project
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              This is intended to be an interactive portfolio project to showcase my skills in AI/ML and MLOPs engineering. It will feature practical implementations 
              of computer vision, natural language processing, and MLOps practices. I intend to add my own self-trained models later on. But as of now my focus is to automate the pipeline around it. The complete code is available to public (see GitHub link above). with Python (FastAPI) 
              backend and modern React frontend, it demonstrates both technical skills and DevOps capabilities.
            </p>
            {/*
            <p className="text-gray-400 text-base leading-relaxed">
              <strong>Note:</strong> Due to cost constraints of running advanced ML infrastructure, 
              the current implementations focus on demonstrating architectural patterns, 
              code quality, and deployment practices rather than computationally intensive models.
            </p>
            */}
          </div>
        </div>
      </section>

      {/* AI/ML Demos Section */}
      <section id="try-now" className="py-0 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Interactive AI Demos
            </h2>
            <p className="text-gray-300 text-lg mb-2">
              Try out interactive demos below.
            </p>
            <p className="text-gray-400 text-sm">
              (Basic implementations due to infrastructure cost considerations)
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {demos.map((demo) => (
              <ProjectCard
                key={demo.id}
                demo={demo}
                isActive={activeDemo === demo.id}
                onUpload={(file) => handleFileUpload(file, demo.title)}
                onActivate={() => setActiveDemo(demo.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Current Technology Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    Backend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "PyTorch", "EasyOCR", "retina-face", "scikit-learn", "OpenCV/Pillow"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Tailwind CSS"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    MLOps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Docker", "GitHub Actions", "Google Cloud Platform", "FastAPI"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 mb-4">
            This is an ongoing project showcasing AI/ML development and MLOps practices.
          </p>
          <p className="text-gray-500 text-sm">
            Built with ❤️ and lots of decaf ☕ | © 2025 Serdar's AI/ML Playground
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
