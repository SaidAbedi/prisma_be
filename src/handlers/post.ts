import prisma from "../db";
export const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  res.json({ data: post });
};

export const createPost = async (req, res) => {
  const { title, belongsToId, description } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      belongsToId,
      description,
    },
  });
  return res.status(201).json({ data: post });
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, belongsToId } = req.body;
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      belongsToId,
    },
  });
  return res.status(200).json({ data: post });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {
      id,
    },
  });
  return res.status(200).json({ data: post });
};
