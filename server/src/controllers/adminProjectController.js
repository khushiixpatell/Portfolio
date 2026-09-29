import prisma from "../lib/prisma.js";

export async function getAdminProjects(req, res) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        displayOrder: "asc",
      },
    });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("ADMIN GET PROJECTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve projects.",
    });
  }
}

export async function createProject(req, res) {
  try {
    const {
      slug,
      title,
      shortTitle,
      description,
      categories,
      categoryLabel,
      type,
      contribution,
      technologies,
      status,
      featured,
      visible,
      displayOrder,
      githubUrl,
      liveUrl,
      imageUrl,
      overview,
      problem,
      solution,
      challenges,
      results,
      responsibilities,
      highlights,
      learnings,
      screenshots,
      imagePublicId,
      screenshotPublicIds,
    } = req.body;

    if (
      !slug ||
      !title ||
      !description ||
      !categoryLabel ||
      !type
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Slug, title, description, category label, and type are required.",
      });
    }

    const project = await prisma.project.create({
      data: {
        slug,
        title,
        shortTitle: shortTitle || null,
        description,
        categories: categories || [],
        categoryLabel,
        type,
        contribution: contribution || null,
        technologies: technologies || [],
        status: status || "Completed",
        featured: featured ?? false,
        visible: visible ?? true,
        displayOrder: displayOrder ?? 0,
        githubUrl: githubUrl || null,
        liveUrl: liveUrl || null,
        imageUrl: imageUrl || null,
        overview: overview || null,
        problem: problem || null,
        solution: solution || null,
        challenges: challenges || null,
        results: results || null,

        responsibilities: responsibilities || [],
        highlights: highlights || [],
        learnings: learnings || [],
        screenshots: screenshots || [],
        imagePublicId: imagePublicId || null,
        screenshotPublicIds: screenshotPublicIds || [],
      },
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message:
          "A project with that slug already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to create project.",
    });
  }
}

export async function updateProject(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID.",
      });
    }

    const allowedFields = [
      "slug",
      "title",
      "shortTitle",
      "description",
      "categories",
      "categoryLabel",
      "type",
      "contribution",
      "technologies",
      "status",
      "featured",
      "visible",
      "displayOrder",
      "githubUrl",
      "liveUrl",
      "imageUrl",
      "overview",
      "problem",
      "solution",
      "challenges",
      "results",
      "responsibilities",
      "highlights",
      "learnings",
      "screenshots",
      "imagePublicId",
      "screenshotPublicIds",
    ];

    const data = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    }

    const project = await prisma.project.update({
      where: {
        id,
      },
      data,
    });

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message:
          "A project with that slug already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to update project.",
    });
  }
}

export async function deleteProject(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID.",
      });
    }

    await prisma.project.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Project deleted.",
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to delete project.",
    });
  }
}

export async function reorderProjects(req, res) {
  try {
    const { projects } = req.body;

    if (!Array.isArray(projects)) {
      return res.status(400).json({
        success: false,
        message: "Projects must be an array.",
      });
    }

    const validProjects = projects.every(
      (project) =>
        Number.isInteger(project.id) &&
        Number.isInteger(project.displayOrder)
    );

    if (!validProjects) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ordering data.",
      });
    }

    // Update each project's display order.
    // We intentionally avoid Prisma's transaction API here
    // because this deployment/database configuration can
    // time out while acquiring an interactive transaction.
    await Promise.all(
      projects.map((project) =>
        prisma.project.update({
          where: {
            id: project.id,
          },
          data: {
            displayOrder: project.displayOrder,
          },
        })
      )
    );

    const updatedProjects =
      await prisma.project.findMany({
        orderBy: [
          {
            displayOrder: "asc",
          },
          {
            id: "asc",
          },
        ],
      });

    return res.status(200).json({
      success: true,
      data: updatedProjects,
    });
  } catch (error) {
    console.error(
      "REORDER PROJECTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to reorder projects.",
    });
  }
}