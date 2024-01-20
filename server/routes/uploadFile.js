const { prisma } = require("../../prisma/prisma-client");
const { verifyRefreshToken } = require("../service/tokenService");

const uploadFile = async (req, res) => {
  try {
    console.log(
      req.file.mimetype.startsWith("image"),
      req.file.mimetype.startsWith("audio")
    );
    const fileType = req.file.mimetype;
    const name = req.body.newName;

    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.json({ message: "Не авторизован" });
    }
    const email = verifyRefreshToken(refreshToken).payload;

    const user = await prisma.user.findFirst({ where: { email } });
    let record;

    if (fileType.startsWith("image")) {
      record = await prisma.picture.create({
        data: {
          filename: req.file.filename,
          title: name,
          author: { connect: { email } },
        },
      });
    } else {
      record = await prisma.track.create({
        data: {
          filename: req.file.filename,
          title: name,
          author: { connect: { email } },
        },
      });
    }
    console.log(record);

    return res.json({ message: "Загрузка завершена успешно" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { uploadFile };
