import { z } from "zod";

export const commentValidation = z.object({
  postId: z.string(),
  text: z.string(),
  replyToId: z.string().optional(),
});

export type CommentRequest = z.infer<typeof commentValidation>;
