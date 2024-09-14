import express, {Request, Response} from 'express';
import morgan from 'morgan';
import applicationsRouter from './api/applications';
import invitationsRouter from './api/invitations';
import postRouter from './api/posts';
import userRouter from './api/users';
import {PrismaClient  } from '@prisma/client'
import { protectRoute } from './modules/auth';
import { createUser, loginUser } from './handlers/user';
const app = express();

export const prisma = new PrismaClient();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req:Request, res:Response) => {
  res.status(200)
  res.json({"message":'Hello World!'});
});



app.use('/api/applications', protectRoute, applicationsRouter);
app.use('/api/invitations', protectRoute, invitationsRouter);
app.use('/api/posts', protectRoute, postRouter);
app.use('/api/users', protectRoute, userRouter);

app.post('/user', createUser)
app.post('/login', loginUser)


export default app;