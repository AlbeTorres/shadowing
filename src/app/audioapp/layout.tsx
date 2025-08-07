


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎧 Audio Learning Studio
          </h1>
          <p className="text-gray-600">Aprende idiomas con transcripción inteligente</p>
        </header>
        {children}
        </div>
        </div>

  );
}
