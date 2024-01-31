import UsersSendDTO from "../dto/users.dto.js"

export const sessionLogin = async (req, res) => {
  try {
    if (!req.user) return res.status(400).send("Invalid credentials")
    const { token } = req.user
    res.cookie("jwtCookie", token).redirect("/products")
  } catch (e) {
    console.log("Error:", e)
    return res.status(500).send({ message: "Server Error" })
  }
}

export const sessionRegister = async (req, res) => {
  try {
    res.send({ url: "login" })
  }
  catch (e) {
    console.log("Error:", e)
    return res.status(500).send({ message: "Server Error" })
  }
}

export const githubCallback = async (req, res) => {
  try {
    if (!req.user) return res.status(400).json({ status: "error", payload: "Invalid github" })
    return res.cookie("jwtCookie", req?.user?.token).redirect("/products")
  }
  catch (e) {
    console.log("Error:", e)
    return res.status(500).send({ message: "Server Error" })
  }
}

export const sessionCurrent = (req, res) => {
  const { user } = req.user
  const userToSend = new UsersSendDTO(user)
  res.json({ status: "success", payload: userToSend })
}

export const sessionLogout = (req, res) => {
  try {
    res.cookie("jwtCookie", "").redirect("/login")
  }
  catch (e) {
    console.log("Error:", e)
    return res.status(500).send({ message: "Server Error" })
  }
}