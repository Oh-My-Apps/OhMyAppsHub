import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <h1 className="text-3xl font-bold">Bienvenue sur votre Dashboard</h1>
          <p className="mt-4 text-muted-foreground">
            Sélectionnez une option dans le menu pour commencer.
          </p>
        </main>
      </div>
    </div>
  );
}