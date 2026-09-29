import cloudinary from "../lib/cloudinary.js";

function uploadBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "khushi-portfolio/projects",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        }
      );

    uploadStream.end(buffer);
  });
}

export async function uploadProjectImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image.",
      });
    }

    const result = await uploadBuffer(
      req.file.buffer
    );

    res.status(201).json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      },
    });
  } catch (error) {
    console.error("IMAGE UPLOAD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to upload image.",
    });
  }
}

export async function deleteProjectImage(req, res) {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: "Cloudinary public ID is required.",
      });
    }

    if (
      !publicId.startsWith(
        "khushi-portfolio/projects/"
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid project image.",
      });
    }

    const result =
      await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
        invalidate: true,
      });

    if (
      result.result !== "ok" &&
      result.result !== "not found"
    ) {
      return res.status(500).json({
        success: false,
        message: "Unable to delete image.",
      });
    }

    return res.status(200).json({
      success: true,
      result: result.result,
    });
  } catch (error) {
    console.error(
      "IMAGE DELETE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to delete image.",
    });
  }
}