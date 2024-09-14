import prisma from "../db";

export const getPostInvitations = async (req, res) => {
  const { belongsToPostId } = req.params;

  const invitations = await prisma.invitation.findMany({
    where: {
      belongsToPostId,
    },
  });
  return res.status(200).json({ data: invitations });
};

export const getInvitation = async (req, res) => {
  const { id } = req.params;
  const invitation = await prisma.invitation.findUnique({
    where: {
      id,
    },
  });
  return res.status(200).json({ data: invitation });
};
