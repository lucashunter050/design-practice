import Image from "next/image";
import NaiveSimulation from "./components/NaiveSimulation";
import CanvasSimulation from "./canvas-simulation/CanvasSimulation";
import Sidebar from "./components/Sidebar";
export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <CanvasSimulation>
        <Sidebar />
        </CanvasSimulation>
      </main>
    </div>
  );
}
