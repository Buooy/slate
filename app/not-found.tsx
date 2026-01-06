export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <a
          href="/"
          className="inline-block bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}
