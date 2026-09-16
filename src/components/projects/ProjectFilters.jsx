import { projectCategories } from "../../data/projects";

export default function ProjectFilters({
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {projectCategories.map((category) => {
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={`
              rounded-full border px-4 py-2 text-sm transition
              ${
                isActive
                  ? "border-white bg-white text-zinc-950"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
              }
            `}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}