const UserModal = require("../modal/user");
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({
      status: "warning",
      message: `email or password is missing`,
    });
  }

  try {
    const user = new UserModal({ ...req.body });
    await user.save();
    res
      .status(200)
      .send({ status: "success", message: "signup successful", data: user });
  } catch (er) {
    res.status(401).send({ status: "error", message: er.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res
      .status(404)
      .send({ status: "warning", message: `email is missing` });
  }
  try {
    const user = await UserModal.findOne({ email });
    if (!user) {
      res.status(401).send({ status: "error", message: "Invalid Credentials" });
    } else {
      const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {
        expiresIn: "1 day",
      });
      res.status(200).send({
        status: "success",
        message: "Login successfull",
        userName: user.name,
        token: token,
      });
    }
  } catch (er) {
    res.status(401).send({ status: "error", message: er.message });
  }
};

module.exports = {
  userLogin,
  userSignup,
};
