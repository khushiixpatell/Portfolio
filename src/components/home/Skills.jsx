export default function Skills() {
  const groups = {
    Languages: ["JavaScript", "Python", "Java", "C++"],
    Frameworks: ["React", "Node.js"],
    Tools: ["Git", "MongoDB", "VS Code"],
  };

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-bold">Skills</h2>
      <p className="mt-2 text-zinc-400">Tools and technologies used in active development.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {Object.entries(groups).map(([title, items]) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold">{title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((x) => (
                <span
                  key={x}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
