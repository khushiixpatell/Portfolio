import prisma from "../lib/prisma.js";

// PUBLIC
export async function getExperiences(req, res) {
  try {
    const experiences =
      await prisma.experience.findMany({
        where: {
          visible: true,
        },
        orderBy: [
          {
            displayOrder: "asc",
          },
          {
            id: "asc",
          },
        ],
      });

    return res.json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    console.error(
      "GET EXPERIENCES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to load experience.",
    });
  }
}

// ADMIN
export async function getAdminExperiences(
  req,
  res
) {
  try {
    const experiences =
      await prisma.experience.findMany({
        orderBy: [
          {
            displayOrder: "asc",
          },
          {
            id: "asc",
          },
        ],
      });

    return res.json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    console.error(
      "GET ADMIN EXPERIENCES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to load experience.",
    });
  }
}

export async function createExperience(req, res) {
  try {
    const {
      company,
      role,
      location,
      startDate,
      endDate,
      description,
      technologies,
      companyUrl,
      visible,
    } = req.body;

    if (
      !company ||
      !role ||
      !startDate ||
      !endDate ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Company, role, dates, and description are required.",
      });
    }

    // New experiences automatically go to the bottom.
    const lastExperience =
      await prisma.experience.findFirst({
        orderBy: {
          displayOrder: "desc",
        },
        select: {
          displayOrder: true,
        },
      });

    const experience =
      await prisma.experience.create({
        data: {
          company: company.trim(),
          role: role.trim(),
          location: location?.trim() || null,
          startDate: startDate.trim(),
          endDate: endDate.trim(),
          description: description.trim(),

          technologies:
            Array.isArray(technologies)
              ? technologies
              : [],

          companyUrl:
            companyUrl?.trim() || null,

          visible:
            typeof visible === "boolean"
              ? visible
              : true,

          displayOrder:
            (lastExperience?.displayOrder ?? 0) +
            1,
        },
      });

    return res.status(201).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    console.error(
      "CREATE EXPERIENCE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to create experience.",
    });
  }
}

export async function updateExperience(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid experience ID.",
      });
    }

    const allowedFields = [
      "company",
      "role",
      "location",
      "startDate",
      "endDate",
      "description",
      "technologies",
      "companyUrl",
      "visible",
      "displayOrder",
    ];

    const data = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    }

    const experience =
      await prisma.experience.update({
        where: {
          id,
        },
        data,
      });

    return res.json({
      success: true,
      data: experience,
    });
  } catch (error) {
    console.error(
      "UPDATE EXPERIENCE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to update experience.",
    });
  }
}

export async function deleteExperience(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid experience ID.",
      });
    }

    await prisma.experience.delete({
      where: {
        id,
      },
    });

    return res.json({
      success: true,
      message: "Experience deleted.",
    });
  } catch (error) {
    console.error(
      "DELETE EXPERIENCE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to delete experience.",
    });
  }
}