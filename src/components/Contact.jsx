export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-bold">Contact</h2>
      <p className="mt-2 text-zinc-400">Let’s connect — best ways to reach me:</p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-3 text-sky-400">
          <a className="hover:underline" href="mailto:khushiixpatell@gmail.com">
            khushiixpatell@gmail.com
          </a>
          <a className="hover:underline" href="https://github.com/khushiixpatell" target="_blank" rel="noopener">
            GitHub
          </a>
          <a className="hover:underline" href="https://linkedin.com/in/khushi-x-patel" target="_blank" rel="noopener">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
