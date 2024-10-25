"use client";

import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-end px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            <Github className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}