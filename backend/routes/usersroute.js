const express = require('express');
const router = express.Router();
const User = require('../models/User');
const success = false
var jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js')
const fs = require('fs');
const fetchUser = require('../middlewares/fetchUser');
const secret = "secretisnotingjustablopperahahaha!@##$$%%%%1234"

router.post('/signup', async (req, res) => {
    const { name, email, password, image, city } = req.body;

    if (!name || !email || !password || !image) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }

    const foundedUser = await User.findOne({ email });
    if (foundedUser) {
        return res.status(400).json({ error: 'User already exist' });
    }

    let dataBase;
    if (image === '' || image === undefined) {
        dataBase = "http://localhost:8000/banner.jpg";
    }
    else {
        const buffer = Buffer.from(image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');
        try {
            fs.writeFileSync(`public/imgs/${email}.png`, buffer);
        } catch (error) {
            return res.json({ "Error": error.message });
        }

        dataBase = `http://localhost:8000/imgs/${email}.png`;
    }


    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(password), secret).toString();

    const newUser = await User.create({
        name,
        email,
        password: ciphertext,
        city,
        image: dataBase
    });

    let token = jwt.sign({ email: email, name: name }, secret);

    return res.json({ data: newUser, success: !success, token });

})


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }

    const foundedUser = await User.findOne({ email });
    if (!foundedUser) {
        return res.status(400).json({ error: 'User Did Not Exist' });
    }

    var bytes = CryptoJS.AES.decrypt(foundedUser.password, secret);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    if (decryptedData.toString() !== password) {
        return res.status(400).json({ error: 'Wrong Password' });
    }

    let token = jwt.sign({ email: email, name: foundedUser.name }, secret);

    return res.json({ data: foundedUser, success: !success, token });

})

router.get('/oneUser', fetchUser, async (req, res) => {
    const email = req.user
    const oneUserFound = await User.findOne({ email })
    if (!oneUserFound) {
        return res.json({ success })
    }
    return res.json({ data: oneUserFound, success: !success });

})

router.get('/allUsers', async (req, res) => {
    const foundedUser = await User.find();
    if (!foundedUser) {
        return res.status(400).json({ success });
    }

    return res.json({ data: foundedUser, success: !success });

})

module.exports = router