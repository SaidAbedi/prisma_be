import {Router} from 'express';
import { prisma } from '../server';
import morgan from 'morgan';


const postRouter = Router();

postRouter.get('/', async(req, res) => {
    const posts = await prisma.post.findMany()
    res.status(200).json(posts)
})

postRouter.get('/:id', async(req, res) => {
    const { id } = req.params
    const post = await prisma.post.findUnique({
        where: {
            id
        }
    })
    return res.status(200).json(post)

})
postRouter.post('/', (req, res) => {
    const { title, belongsToId} = req.body
    const post = prisma.post.create({
        data: {
            title,
            belongsToId
        }
    })
    return res.status(201).json(post)
})
postRouter.put('/:id', (req, res) => {
    const { id } = req.params
    const { title, belongsToId } = req.body
    const post = prisma.post.update({
        where: {
            id
        },
        data: {
            title,
            belongsToId
        }
    })
    return res.status(200).json(post)
})
postRouter.delete('/:id', (req, res) => {
    const { id } = req.params
    const post = prisma.post.delete({
        where: {
            id
        }
    })
    return res.status(200).json(post)
})


export default postRouter;