import { SimulatorVisualizer } from "@/components/simulator";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-start min-h-screen py-10">
      <SimulatorVisualizer />
    </section>
  );
}
