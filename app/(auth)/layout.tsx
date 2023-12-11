export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] flex items-center justify-center w-screen h-screen overflow-hidden">
      {children}
    </div>
  );
}
