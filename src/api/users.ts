import {Router} from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.status(200)
    res.json({"message":'Hello From Users!'});
})
userRouter.get('/:id', (req, res) => {})
userRouter.post('/', (req, res) => {})
userRouter.put('/:id', (req, res) => {})
userRouter.delete('/:id', (req, res) => {})



export default userRouter;