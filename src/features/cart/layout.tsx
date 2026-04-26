export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar simulée */}
      <div className="w-[160px] bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-4 flex-shrink-0">
        {/* Logo */}
        <div>
          <div className="w-10 h-10 bg-[#E85C1A] rounded-xl mb-8" />
          {/* Nav items */}
          <div className="flex flex-col gap-6 text-sm text-gray-500">
            <span>Publication</span>
            <span>A & Q</span>
            <span className="text-[#E85C1A] font-medium">Shop</span>
            <span>Studio</span>
            <span>Profile</span>
            <span>Setting</span>
          </div>
        </div>
        {/* Log out */}
        <span className="text-sm text-[#E85C1A]">Log Out</span>
      </div>

      {/* Content */}
      <main className="flex-1 bg-[#FDF6F0]">
        {children}
      </main>

    </div>
  );
}