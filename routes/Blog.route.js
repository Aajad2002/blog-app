const express = require("express");
const { BlogModel } = require("../model/Blog.model");

const blogRouter = express.Router();

//post request
blogRouter.post("/", async (req, res) => {
    try {
        const blog = new BlogModel(req.body)
        blog.save()
        res.status(200).send({ "msg": "new Blog posted" })
    } catch (error) {
        res.status(404).send({ "msg": error.message })

    }
})
blogRouter.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id
        await BlogModel.findByIdAndDelete({ _id: id })

        res.status(200).send({ "msg": "Blog deleted" })
    } catch (error) {
        res.status(404).send({ "msg": error.message })

    }
})
blogRouter.patch("/:id", async (req, res) => {
    try {
        let id = req.params.id
        await BlogModel.findByIdAndUpdate({ _id: id }, req.body)

        res.status(200).send({ "msg": "Blog deleted" })
    } catch (error) {
        res.status(404).send({ "msg": error.message })

    }
})
blogRouter.patch("/:id/like", async (req, res) => {
    try {
        let id = req.params.id
        const blog = await BlogModel.findOne({ _id: id });
        console.log(blog)
        const o = blog.likes + 1

        await BlogModel.findByIdAndUpdate({ _id: id }, { likes: o })

        res.status(200).send({ "msg": "Blog liked" })

    } catch (error) {
        res.status(404).send({ "msg": error.message })

    }
})
blogRouter.patch("/:id/comment", async (req, res) => {
    try {
        let id = req.params.id
        const blog = await BlogModel.findOne({ _id: id });
        let arr = [...blog.comments, req.body]
        await BlogModel.findByIdAndUpdate({ _id: id }, { comments: arr })
        res.status(200).send({ "msg": "Blog commented" })

    } catch (error) {
        res.status(404).send({ "msg": error.message })

    }
})
blogRouter.get("/", async (req, res) => {
    try {
        const { page,title,category,sort,order } = req.query
        if (title) {
            const blog = await BlogModel.find({title}).skip((page-1)*5).limit(5);
            res.status(200).send({ "data": blog })
        }else if(category && order){
            const blog = await BlogModel.find({category}).sort({date:order=="asc"?1:-1}).skip((page-1)*5).limit(5);
            res.status(200).send({ "data": blog })

        }else if(category){
            const blog = await BlogModel.find({category}).skip((page-1)*5).limit(5);
            res.status(200).send({ "data": blog })
        }else if( order){
            const blog = await BlogModel.find().sort({date:order=="asc"?1:-1}).skip((page-1)*5).limit(5);
            res.status(200).send({ "data": blog })

        }       
        else {
            const blog = await BlogModel.find().skip((page-1)*5).limit(5);
            res.status(200).send({ "data": blog })
        }

    } catch (error) {
        res.status(404).send({ "msg": error.message })

    }
})
module.exports = { blogRouter }