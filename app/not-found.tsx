import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <div className="mono text-sm text-sky-300">
          404
        </div>

        <h1 className="mt-4 text-4xl font-bold">
          Page not found.
        </h1>

        <p className="mt-4 text-slate-400">
          The requested portfolio page does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-bold text-black"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
