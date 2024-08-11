const express = require('express');
const router = express.Router();
const VidImage = require('../models/VidImage');
const User = require('../models/User');
const fs = require('fs')
const fetchUser = require('../middlewares/fetchUser')
const success = false;

router.post('/add', fetchUser, async (req, res) => {
    const { category, fileType, desc } = req.body;
    const email = req.user;
    try {
        const addedUser = await User.findOne({ email });
        let dataBase;
        let ran = Math.random();
        if (category == "image") {
            if (fileType === '' || fileType === undefined) {
                dataBase = "http://localhost:8000/banner.jpg";
            }
            else {
                const buffer = Buffer.from(fileType.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');
                try {
                    fs.writeFileSync(`public/products/${desc.slice(0, 5)}${ran}.png`, buffer);
                } catch (error) {
                    return res.json({ "Error": error.message });
                }

                dataBase = `http://localhost:8000/products/${desc.slice(0, 5)}${ran}.png`;
            }
        }
        else {
            if (fileType === '' || fileType === undefined) {
                dataBase = "http://localhost:8000/video.mp4";
            }
            else {
                const buffer = Buffer.from(fileType.replace(/^data:video\/(mp4|mkv|ts|);base64,/, ''), 'base64');
                try {
                    fs.writeFileSync(`public/products/${desc.slice(0, 5)}${ran}.mp4`, buffer);
                } catch (error) {
                    return res.json({ "Error": error.message });
                }

                dataBase = `http://localhost:8000/products/${desc.slice(0, 5)}${ran}.mp4`;
            }
        }

        const createProduct = await VidImage.create({ category, fileType: dataBase, desc, user: addedUser });
        return res.json({ Pass: createProduct });
    }
    catch (err) {
        console.log(err.message);
    }
})

router.get('/getVideos', async (req, res) => {
    try {
        let skipItem = req.query.skip == 'undefined' ? 0 : Number(req.query.skip)
        let limitItem = req.query.limit == 'undefined' ? 15 : Number(req.query.limit)
        let skipedItem = (skipItem - 1) * limitItem
        const getProductTotal = await VidImage.find({ category: "video" });
        const getProduct = await VidImage.find({ category: "video" }).sort({ _id: -1 }).skip(skipedItem).limit(limitItem);
        return res.json({ data: getProduct, totalPosts: getProductTotal.length });
    }
    catch (err) {
        console.log(err.message);
    }
})


router.get('/getsaved', fetchUser, async (req, res) => {
    try {
        let skipItem = req.query.skip == 'undefined' ? 0 : Number(req.query.skip)
        const email = req.user
        // {category: { $in: [yourCategory] }}
        // ({category: { $elemMatch: {$eq: 'yourCategory'} }});
        // ({ category: { $all: [yourCategory] } });
        let limitItem = req.query.limit == 'undefined' ? 15 : Number(req.query.limit)
        let skipedItem = (skipItem - 1) * limitItem;
        const getProductTotal = await VidImage.find({ usersaves: { $in: [email] } });
        const getProduct = await VidImage.find({ usersaves: { $in: [email] } }).sort({ _id: -1 }).skip(skipedItem).limit(limitItem);
        return res.json({ data: getProduct, totalPosts: getProductTotal.length });
    }
    catch (err) {
        console.log(err.message);
    }
})


router.get('/getimages', async (req, res) => {
    try {
        let skipItem = req.query.skip == 'undefined' ? 0 : Number(req.query.skip)
        let limitItem = req.query.limit == 'undefined' ? 15 : Number(req.query.limit)
        let skipedItem = (skipItem - 1) * limitItem;
        const getProductTotal = await VidImage.find({ category: "image" });
        const getProduct = await VidImage.find({ category: "image" }).sort({ _id: -1 }).skip(skipedItem).limit(limitItem);
        return res.json({ data: getProduct, totalPosts: getProductTotal.length });
    }
    catch (err) {
        console.log(err.message);
    }
})


router.get('/get', async (req, res) => {
    try {
        //         .find({'author': req.params.id})
        //   .skip(req.query.skip)
        //   .limit(25)
        //   .populate({
        //     path: 'author',
        //     select: 'firstName lastName img'
        //   })
        let skipItem = req.query.skip == 'undefined' ? 0 : Number(req.query.skip)
        let limitItem = req.query.limit == 'undefined' ? 15 : Number(req.query.limit)
        let skipedItem = (skipItem - 1) * limitItem
        const getProductTotal = await VidImage.find();
        const getProduct = await VidImage.find().sort({ _id: -1 }).skip(skipedItem).limit(limitItem);
        return res.json({ data: getProduct, totalPosts: getProductTotal.length });
    }
    catch (err) {
        console.log(err.message);
    }
})



router.put('/likes', fetchUser, async (req, res) => {
    try {
        const email = req.user
        const likedProductExist = await VidImage.findOne({ _id: req.body.id });
        const checkExistence = likedProductExist.userslikes.indexOf(email);
        if (!(checkExistence === -1)) {
            const deltedLike = await VidImage.findOneAndUpdate({ _id: req.body.id }, { $pull: { userslikes: email } });
            return res.json({ data: deltedLike })
        }
        const likedProduct = await VidImage.updateOne({ _id: req.body.id }, { $push: { userslikes: email } });
        return res.json({ Data: likedProduct, success: !success });
    }
    catch (err) {
        console.log(err.message);
    }
})



router.put('/comments', fetchUser, async (req, res) => {
    const { comments } = req.body;
    try {
        const commentUser = await User.findOne({ email: req.user });
        const { name, image } = commentUser
        const dat = new Date();
        const commentObject = { name, image, comments, dateTi: dat.toLocaleString() }
        const updatedProduct = await VidImage.findOneAndUpdate({ _id: req.body.id }, { $push: { userscomments: commentObject } });
        console.log(updatedProduct);
        if (!updatedProduct) {
            return res.json({ "Message": "A Problem Occured" });
        }

        console.log(updatedProduct);
        return res.json({ "Message": "Updated Successfully" });
    }
    catch (err) {
        console.log(err.message);
    }
})


router.put('/saveposts', fetchUser, async (req, res) => {
    try {
        const email = req.user
        const likedProductExist = await VidImage.findOne({ _id: req.body.id });
        const checkExistence = likedProductExist.usersaves.indexOf(email);
        if (!(checkExistence === -1)) {
            const deletedSave = await VidImage.findOneAndUpdate({ _id: req.body.id }, { $pull: { usersaves: email } });
            return res.json({ data: deletedSave })
        }
        const savedPost = await VidImage.updateOne({ _id: req.body.id }, { $push: { usersaves: email } });
        return res.json({ Data: savedPost, success: !success });
    }
    catch (err) {
        console.log(err.message);
    }
})


router.put('/getsaveposts', fetchUser, async (req, res) => {
    try {
        const email = req.user
        // {category: { $in: [yourCategory] }}
        // ({category: { $elemMatch: {$eq: 'yourCategory'} }});
        // ({ category: { $all: [yourCategory] } });
        const savedProduct = await VidImage.find({ category: { $in: [email] } });
        if (!savedProduct) {
            return res.json({ data: "Error Occured", success })
        }

        return res.json({ Data: savedProduct, success: !success });
    }
    catch (err) {
        console.log(err.message);
    }
})


router.delete('/delete', async (req, res) => {
    try {
        const deletedProduct = await VidImage.findOneAndDelete({ _id: req.body.id });
        if (!deletedProduct) {
            return res.json({ "Message": "A Problem Occur" });
        }

        return res.json({ "Message": "Deleted Successfully" });
    }
    catch (err) {
        console.log(err.message);
    }
})



router.post('/filesZip', async (req, res) => {
    const { fileType } = req.body;
    try {
        let dataBase;
        let ran = Math.random();
        if (fileType === '' || fileType === undefined) {
            dataBase = "http://localhost:8000/banner.jpg";
        }
        else {
            const buffer = Buffer.from(fileType.replace(/^data:application\/(x-zip-compressed|zip);base64,/, ''), 'base64');
            try {
                fs.writeFileSync(`public/zipfiles/${ran}.zip`, buffer);
            } catch (error) {
                return res.json({ Error: error.message });
            }

            dataBase = `http://localhost:8000/zipfiles/${ran}.zip`;
        }

        console.log(dataBase);
        res.json({ Msg: "Done" })
    }
    catch (err) {
        console.log(err.message);
    }
})

module.exports = router