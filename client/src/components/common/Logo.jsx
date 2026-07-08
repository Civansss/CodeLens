function Logo() {
  return (
    <div className="flex flex-col items-center">

      <img
        src="/logo.png"
        alt="CodeLens Logo"
        className="w-24 h-24 mb-4 rounded-2xl shadow-lg"
      />

      <h1 className="text-4xl font-bold text-gray-800">
        CodeLens
      </h1>

      <p className="text-gray-500 mt-2 text-center">
        See Beyond the Code.
      </p>

    </div>
  );
}

export default Logo;