export default function TechBadge({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300">
      {children}
    </span>
  );
}