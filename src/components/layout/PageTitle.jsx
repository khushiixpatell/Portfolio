import { useEffect } from "react";

export default function PageTitle({ title }) {
  useEffect(() => {
    const previousTitle = document.title;

    document.title = title;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  return null;
}