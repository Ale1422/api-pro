const { User } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;


const registerUser = async (req, res, next) => {
    try {
        const { name, lastName, email, password } = req.body,
            passwordHash = await bcrypt.hash(password, 10),
            user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (user) throw new Error('Email ya registrado');

        const newUser = await User.create({ name, lastName, email, passwordHash });
        res.json(newUser)
    } catch (error) {
        next(error)
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        const passwordOk =
            user === null ? false : await bcrypt.compare(password, user.passwordHash);
        if (!(user && passwordOk)) {
            throw new Error("Usuario o contraseña invalida");
        }

        const userForToken = {
            id: user.id,
            name: user.name,
            email: user.email,
            iss: "prodePicante",
        };

        const token = jwt.sign(userForToken, SECRET);

        res.send({
            id: user.id,
            token,
            isActive: user.isActive
        });
    } catch (error) {
        next(error);
    }
};

const getInfoUser = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await User.findOne({
            where: { id },
            attributes: { exclude: ["passwordHash"] },
        });

        res.send(user);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    registerUser,
    loginUser,
    getInfoUser
}