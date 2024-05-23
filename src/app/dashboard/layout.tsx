import DashNav from "@/components/DashNav";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center gap-3">
      <DashNav />
      {children}
    </div>
  );
}
