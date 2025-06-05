
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="flex gap-3">
      <Button 
        variant="outline" 
        size="lg"
        className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
        onClick={() => window.open("https://github.com/tserdar", "_blank")}
      >
        <Github className="h-5 w-5" />
      </Button>
      <Button 
        variant="outline" 
        size="lg"
        className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
        onClick={() => window.open("https://linkedin.com/in/serdartunckol", "_blank")}
      >
        <Linkedin className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SocialLinks;
