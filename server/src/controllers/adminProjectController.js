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