import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4 text-text-primary dark:text-text-primary-dark">
        404 - Page Not Found
      </h2>
      <p className="text-text-property dark:text-text-property-dark mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-toolbar-highlight dark:bg-toolbar-highlight-dark text-white rounded hover:bg-toolbar-highlight/80 dark:hover:bg-toolbar-highlight-dark/80 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
