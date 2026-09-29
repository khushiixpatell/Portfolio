import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProjectBySlug } from "../../services/api";

import BiteWise from "./BiteWise";
import Zeuty from "./Zeuty";
import GDGCommandHub from "./GDGCommandHub";
import GECAI from "./GECAI";
import ConnectFour from "./ConnectFour";

import GenericProjectPage from "./GenericProjectPage";

const customProjectPages = {
  "gdg-command-hub": GDGCommandHub,
  "gec-ai": GECAI,
  "connect-four-ai": ConnectFour,
  bitewise: BiteWise,
  zeuty: Zeuty,
};

export default function ProjectPage() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        setNotFound(false);

        const data = await getProjectBySlug(slug);

        setProject(data);
      } catch (error) {
        console.error(
          "Failed to load project:",
          error
        );

        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-6xl px-6 py-24">
        <p className="text-sm text-zinc-500">
          Loading project...
        </p>
      </main>
    );
  }

  if (notFound || !project) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-6xl px-6 py-24">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
          404
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white">
          Project not found.
        </h1>

        <p className="mt-4 text-zinc-400">
          This project doesn't exist or is currently
          unavailable.
        </p>

        <a
          href="/#work"
          className="mt-8 inline-block rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
        >
          Back to projects
        </a>
      </main>
    );
  }

  const CustomProjectPage =
    customProjectPages[project.slug];

  if (CustomProjectPage) {
    return <CustomProjectPage />;
  }

  return (
    <GenericProjectPage project={project} />
  );
}