import {
  useSortable,
} from "@dnd-kit/sortable";

import {
  CSS,
} from "@dnd-kit/utilities";

export default function SortableProject({
  project,
  children,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: project.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={
        isDragging
          ? "relative z-20 opacity-60"
          : ""
      }
    >
      <div className="flex gap-3">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="flex w-10 shrink-0 cursor-grab items-center justify-center rounded-xl border border-white/10 text-zinc-500 transition hover:border-white/20 hover:text-white active:cursor-grabbing"
          aria-label={`Reorder ${project.title}`}
        >
          <span className="text-lg leading-none">
            ≡
          </span>
        </button>

        <div className="min-w-0 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}