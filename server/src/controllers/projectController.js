import prisma from "../lib/prisma.js";

export async function getProjects(req, res) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        visible: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve projects.",
    });
  }
}

export async function getProjectBySlug(req, res) {
  try {
    const { slug } = req.params;

    const project = await prisma.project.findUnique({
      where: {
        slug,
      },
    });

    if (!project || !project.visible) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("GET PROJECT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve project.",
    });
  }
}