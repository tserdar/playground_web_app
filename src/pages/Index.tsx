
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
import Modal from "@/components/Modal";

import axios from "axios";
import ChatBox from "@/components/ChatBox";

const apiUrl = import.meta.env.VITE_PLAYGROUND_API_URL;

const Index = () => {
  const { toast } = useToast();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [chatOpen, setChatOpen] = useState(false);


  const handleFileUpload = async (file: File, demoType: string) => {
    const endpointMap: Record<string, string> = {
      "Face Recognition": `${apiUrl}/face?visualize=True`,
      "Optical Character Recognition": `${apiUrl}/ocr?visualize=True`,
    };

    const url = endpointMap[demoType];
    if (!url) {
      toast({
        title: "Unsupported Demo",
        description: `No endpoint configured for: ${demoType}`,
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const controller = new AbortController();
    setAbortController(controller);
    setModalOpen(true);
    setLoading(true);
    setImageSrc(null);

    try {
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
        signal: controller.signal,
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setUploadProgress(percent);
        },
      });

      const imageBlob = response.data;
      const imageURL = URL.createObjectURL(imageBlob);
      setImageSrc(imageURL);
    } catch (error: unknown) {
        if (axios.isCancel(error)) {
          toast({ title: "Upload Aborted", description: "You cancelled the upload." });
        } else if (axios.isAxiosError(error)) {
          toast({
            title: "Upload Failed",
            description: error.response?.data?.detail || error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Unexpected Error",
            description: String(error),
            variant: "destructive",
          });
        }
      }
    finally {
      setLoading(false);
      setUploadProgress(null);
    }
  };


  const demos = [
    {
      id: "face-recognition",
      title: "Face Recognition",
      description: "Basic facial detection and recognition using deep learning models",
      icon: Eye,
      acceptedTypes: "image/*,video/*",
      status: "Active",
      gradient: "from-purple-500 to-pink-500",
      requiresUpload: true 
    },
    {
      id: "ocr",
      title: "Optical Character Recognition",
      description: "Extract text from images with using computer vision",
      icon: FileText,
      acceptedTypes: "image/*",
      status: "Active",
      gradient: "from-blue-500 to-cyan-500",
      requiresUpload: true 

    },
    {
      id: "chatbot",
      title: "AI Chatbot",
      description: "Intelligent conversational AI powered by modern language models",
      icon: MessageSquare,
      acceptedTypes: "", // ✅ still fine
      status: "Active",
      gradient: "from-green-500 to-emerald-500",
      requiresUpload: false 
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
            Try Out
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
                🛈 This project is intentionally built to cost <strong>virtually nothing aside from the domain name</strong>. It exists purely as a technical showcase to demonstrate my ability to design, build, and deploy end-to-end AI/ML systems. Rather than focusing on production-scale infrastructure, the emphasis is on clean architecture, automation, MLOps practices, and the ability to deliver working prototypes independently.
              </AlertDescription>
            </Alert>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <div className="flex flex-wrap justify-center gap-4">
                {/* <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-6 py-3 text-lg transition-all duration-300 hover:scale-105"
                  onClick={() => window.open("https://github.com/tserdar/playground_web_app", "_blank")}
                >
                  <Github className="mr-2 h-5 w-5" />
                  Frontend Repository
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button> */}

                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-green-400 hover:from-blue-700 hover:to-cyan-700 text-white border-0 px-6 py-3 text-lg transition-all duration-300 hover:scale-105"
                  onClick={() => window.open("https://github.com/tserdar/playground_api", "_blank")}
                >
                  <Github className="mr-2 h-5 w-5" />
                  Public API Repository
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              About This Project
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              This is intended to be a <strong>fully open source</strong> interactive portfolio project to showcase my skills in <strong>Applied AI/ML Research</strong> and <strong>Engineering</strong> (incl. Backend, DevOps & MLOPs). It features prototype-level implementations of computer vision, NLP, and DevOps/MLOps practices — <strong>functional by design, but not intended for further refinement.</strong> I plan to add self-trained models later. For now, my focus is on automating the pipeline and integration layer.
              <br />
              <br />
              <span className="text-yellow-300 font-medium">🛈 Frontend software is outside of my primary area of expertise.</span> The UI here is solely built for demonstration purposes.<br />
              Thus, the frontend code <strong>does not represent my main professional skills</strong>, which lies in <strong>Applied AI/ML Research</strong> and <strong>Engineering</strong> (incl. Backend, DevOps & MLOPs). You can view the optional web client code{" "}
              <a
                href="https://github.com/tserdar/playground_web_app"
                className="underline text-blue-300 hover:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>.
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
                isActive={demo.status !== "Coming Soon"}
                onUpload={(file) => handleFileUpload(file, demo.title)}
                onActivate={() => {
                  if (demo.title === "AI Chatbot") {
                    setChatOpen(true);
                  }
                }}
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
                    {["Python", "PyTorch", "Hugging Face - Transformers", "EasyOCR", "retina-face", "scikit-learn", "OpenCV/Pillow"].map((tech) => (
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
            This is an ongoing project showcasing AI/ML development and DevOps/MLOps practices.
          </p>
          <p className="text-gray-500 text-sm">
            Built with ❤️ and lots of decaf ☕ | © 2025 Serdar's AI/ML Playground
          </p>
        </div>
      </footer>
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          if (abortController) abortController.abort();
          setModalOpen(false);
          setLoading(false);
          setImageSrc(null);
        }}
        loading={loading}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Result"
            className="rounded-md max-w-full max-h-[70vh] mx-auto"
          />
        )}
      </Modal>

      <Modal isOpen={chatOpen} onClose={() => setChatOpen(false)} loading={false}>
        <ChatBox />
      </Modal>
    </div>
  );
};

export default Index;
