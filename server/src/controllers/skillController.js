import prisma from "../lib/prisma.js";

// PUBLIC
export async function getSkills(req, res) {
  try {
    const groups = await prisma.skillGroup.findMany({
      orderBy: [
        {
          displayOrder: "asc",
        },
        {
          id: "asc",
        },
      ],

      include: {
        skills: {
          orderBy: [
            {
              displayOrder: "asc",
            },
            {
              id: "asc",
            },
          ],
        },
      },
    });

    return res.json({
      success: true,
      data: groups,
    });
  } catch (error) {
    console.error("GET SKILLS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load skills.",
    });
  }
}


// ADMIN
export async function getAdminSkills(req, res) {
  try {
    const groups = await prisma.skillGroup.findMany({
      orderBy: [
        {
          displayOrder: "asc",
        },
        {
          id: "asc",
        },
      ],

      include: {
        skills: {
          orderBy: [
            {
              displayOrder: "asc",
            },
            {
              id: "asc",
            },
          ],
        },
      },
    });

    return res.json({
      success: true,
      data: groups,
    });
  } catch (error) {
    console.error(
      "GET ADMIN SKILLS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to load skills.",
    });
  }
}


// CREATE GROUP
export async function createSkillGroup(req, res) {
  try {
    const { title } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Group title is required.",
      });
    }

    const lastGroup =
      await prisma.skillGroup.findFirst({
        orderBy: {
          displayOrder: "desc",
        },
        select: {
          displayOrder: true,
        },
      });

    const group = await prisma.skillGroup.create({
      data: {
        title: title.trim(),

        displayOrder:
          (lastGroup?.displayOrder ?? 0) + 1,
      },

      include: {
        skills: true,
      },
    });

    return res.status(201).json({
      success: true,
      data: group,
    });
  } catch (error) {
    console.error(
      "CREATE SKILL GROUP ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to create skill group.",
    });
  }
}


// UPDATE GROUP
export async function updateSkillGroup(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill group ID.",
      });
    }

    const { title } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Group title is required.",
      });
    }

    const group = await prisma.skillGroup.update({
      where: {
        id,
      },

      data: {
        title: title.trim(),
      },

      include: {
        skills: {
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });

    return res.json({
      success: true,
      data: group,
    });
  } catch (error) {
    console.error(
      "UPDATE SKILL GROUP ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to update skill group.",
    });
  }
}


// DELETE GROUP
export async function deleteSkillGroup(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill group ID.",
      });
    }

    await prisma.skillGroup.delete({
      where: {
        id,
      },
    });

    return res.json({
      success: true,
      message: "Skill group deleted.",
    });
  } catch (error) {
    console.error(
      "DELETE SKILL GROUP ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to delete skill group.",
    });
  }
}


// CREATE SKILL
export async function createSkill(req, res) {
  try {
    const { name, groupId } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required.",
      });
    }

    const numericGroupId = Number(groupId);

    if (!Number.isInteger(numericGroupId)) {
      return res.status(400).json({
        success: false,
        message: "Valid skill group is required.",
      });
    }

    const lastSkill =
      await prisma.skill.findFirst({
        where: {
          groupId: numericGroupId,
        },

        orderBy: {
          displayOrder: "desc",
        },

        select: {
          displayOrder: true,
        },
      });

    const skill = await prisma.skill.create({
      data: {
        name: name.trim(),
        groupId: numericGroupId,

        displayOrder:
          (lastSkill?.displayOrder ?? 0) + 1,
      },
    });

    return res.status(201).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    console.error(
      "CREATE SKILL ERROR:",
      error
    );

    // Your schema prevents duplicate skill names
    // inside the same group.
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message:
          "That skill already exists in this group.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create skill.",
    });
  }
}


// UPDATE SKILL
export async function updateSkill(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill ID.",
      });
    }

    const { name } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required.",
      });
    }

    const skill = await prisma.skill.update({
      where: {
        id,
      },

      data: {
        name: name.trim(),
      },
    });

    return res.json({
      success: true,
      data: skill,
    });
  } catch (error) {
    console.error(
      "UPDATE SKILL ERROR:",
      error
    );

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message:
          "That skill already exists in this group.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update skill.",
    });
  }
}


// DELETE SKILL
export async function deleteSkill(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill ID.",
      });
    }

    await prisma.skill.delete({
      where: {
        id,
      },
    });

    return res.json({
      success: true,
      message: "Skill deleted.",
    });
  } catch (error) {
    console.error(
      "DELETE SKILL ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to delete skill.",
    });
  }
}