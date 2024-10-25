"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Settings,
  Palette,
  Layout,
  ChevronRight,
  MonitorPlay,
  ChevronDown,
  Laptop,
  Users,
  Bell,
  Boxes,
  Paintbrush,
  Sliders,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface MenuItem {
  title: string;
  icon: any;
  href?: string;
  submenu?: {
    title: string;
    href: string;
    icon: any;
  }[];
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const items: MenuItem[] = [
    {
      title: "Programmes",
      icon: MonitorPlay,
      submenu: [
        { title: "Applications", href: "/programmes/apps", icon: Laptop },
        { title: "Utilisateurs", href: "/programmes/users", icon: Users },
        { title: "Notifications", href: "/programmes/notifications", icon: Bell },
      ],
    },
    {
      title: "Configuration",
      icon: Layout,
      submenu: [
        { title: "Système", href: "/configuration/system", icon: Boxes },
        { title: "Intégrations", href: "/configuration/integrations", icon: Sliders },
      ],
    },
    {
      title: "Customisation",
      icon: Palette,
      submenu: [
        { title: "Thèmes", href: "/customisation/themes", icon: Paintbrush },
        { title: "Styles", href: "/customisation/styles", icon: Palette },
      ],
    },
    {
      title: "Paramètres",
      icon: Settings,
      submenu: [
        { title: "Profil", href: "/settings/profile", icon: UserCircle },
        { title: "Préférences", href: "/settings/preferences", icon: Settings },
      ],
    },
  ];

  const toggleMenu = (title: string) => {
    setOpenMenus((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title]
    );
  };

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[240px]",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 z-20 rounded-full border bg-background"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronRight
          className={cn("h-4 w-4 transition-transform", 
            isCollapsed ? "" : "rotate-180"
          )}
        />
      </Button>
      <ScrollArea className="flex-1">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              {items.map((item) => (
                <Collapsible
                  key={item.title}
                  open={!isCollapsed && openMenus.includes(item.title)}
                  onOpenChange={() => !isCollapsed && toggleMenu(item.title)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between px-3 py-2 text-sm font-medium",
                        isCollapsed && "justify-center px-2"
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className={cn("h-5 w-5", 
                          isCollapsed ? "mr-0" : "mr-2"
                        )} />
                        {!isCollapsed && <span>{item.title}</span>}
                      </div>
                      {!isCollapsed && (
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openMenus.includes(item.title) && "rotate-180"
                          )}
                        />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1">
                    {!isCollapsed && item.submenu?.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className={cn(
                          "flex items-center rounded-md px-8 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                          pathname === subitem.href ? "bg-accent" : "transparent"
                        )}
                      >
                        <subitem.icon className="mr-2 h-4 w-4" />
                        <span>{subitem.title}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}