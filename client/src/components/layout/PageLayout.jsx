import Navbar from "./Navbar";

function PageLayout({ children, fullWidth = false }) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
        <div
          className={
            fullWidth
              ? "w-full px-8 py-8"
              : "max-w-7xl mx-auto px-6 py-8"
          }
        >
          {children}
        </div>
      </main>
    </>
  );
}

export default PageLayout;