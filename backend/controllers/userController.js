const { User } = require("../models/userModel")
const { registerValidation, loginValidation } = require("../validation/userValidation")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    const { username, email, password } = req.body

    const { error } = registerValidation.validate({ username, email, password })

    if (error) {
        res.status(400).json(error.details[0].message)
        return
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400).json({ msg: "User already exist" })
        return
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1w" })

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        })
    } else {
        res.status(400).json({ msg: "Invalid user Data" })
    }
}

const login = async (req, res) => {
    let user
    const { email, password, token } = req.body

    const { error } = loginValidation.validate({ email, password, token })
    if (error) {
        res.status(400).json(error.details[0].message)
        return
    }

    if (token && (!email || !password)) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        user = await User.findById(decoded.id)

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        })
        return
    }
    if (email && password) {
        user = await User.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1w" })
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token
            })
        }
        return
    }

    res.status(400).json({ msg: "Invalid email or password" })
}

module.exports = { register, login }