import { Separator } from "@/components/ui/separator";
import { Github, Globe, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 py-8 md:py-12">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-semibold">👾Process Scheduler_</h3>
            <p className="text-sm text-muted-foreground">
              A simulation tool for operating system process scheduling
              algorithms
            </p>
          </div>

          <Separator className="w-full max-w-xs" />

          <div className="flex flex-col items-center gap-4">
            <p className="text-sm font-medium">
              Developed with <Heart className="inline h-3 w-3 text-red-500" />{" "}
              by:
            </p>

            <a
              href="https://enderpuentes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            >
              <Globe className="h-4 w-4" />
              <span>Ender Puentes</span>
            </a>

            <Link
              href="https://github.com/EnderPuentes/ula-so-process-scheduler"
              aria-label="See Source Code"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
              <span>View Source Code</span>
            </Link>
          </div>

          <Separator className="w-full max-w-xs" />

          <p className="text-xs text-muted-foreground">
            © {currentYear} Ender Puentes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
