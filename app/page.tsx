'use client';


export default function HomePage() {
  return (
    <>
      

      <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 space-y-6 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">Welcome 👋</h1>
          <p className="text-gray-500 text-md">Simple & secure auth with Google</p>

          {/* <div className="space-y-4">
            <Link
              href="/register"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Register
            </Link>

            <Link
              href="/login"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Login
            </Link>
          </div> */}
        </div>
      </main>
    </>
  );
}
