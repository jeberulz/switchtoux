export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <section className="w-full max-w-2xl rounded-3xl border border-black/10 bg-white p-8 shadow-sm sm:p-12 dark:border-white/15 dark:bg-zinc-950">
        <p className="mb-5 font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Next.js 16 · App Router
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-6xl dark:text-white">
          SwitchToUX is ready.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          The application foundation is installed with TypeScript, Tailwind CSS,
          and ESLint. Start building by editing this page.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noreferrer"
          >
            Read the docs
          </a>
          <code className="rounded-full border border-black/10 px-5 py-3 font-mono text-sm text-zinc-600 dark:border-white/15 dark:text-zinc-300">
            npm run dev
          </code>
        </div>
      </section>
    </main>
  );
}
