import Navbar from "@/components/Navbar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <section className="h-screen w-screen flex flex-col">
      <Navbar />
      {children}
    </section>
  );
}
