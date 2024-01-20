const path = require("path");
const { prisma } = require("../../prisma/prisma-client");
const { pathToFileURL } = require("url");

const getAllImages = async (req, res) => {
  try {
    const images = await prisma.picture.findMany();
    console.log(path.resolve("./server/media/images", images[0].filename));

    console.log(
      pathToFileURL(path.resolve("./server/media/images", images[0].filename))
    );
    return res.status(200).json({ message: "succesful request", images });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllImages,
};
