import Link from "next/link";
import { ThemeToggler } from "./theme-toggler";

export function Header() {
  return (
    <header className="sticky top-0 bg-transparent backdrop-blur-lg z-50 shadow-sm h-20 flex justify-center items-center">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">👾Process Scheduler_</h1>
        </Link>
        <ThemeToggler />
      </div>
    </header>
  );
}
