import { getAuthSession } from "@/lib/auth";
import { Post, Vote, VoteType } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import PostVoteClient from "./PostVoteClient";

type Props = {
  postId: string;
  initialVotesAmt?: number;
  initialVote?: VoteType | null;
  getDate?: () => Promise<(Post & { votes: Vote[] }) | null>;
};

export default async function PostVoteServer({
  postId,
  initialVotesAmt,
  initialVote,
  getDate,
}: Props) {
  const session = await getAuthSession();

  let _voteAmt: number = 0;
  let _currentVote: VoteType | null | undefined = undefined;

  if (getDate) {
    const post = await getDate();
    if (!post) return notFound();

    _voteAmt = post.votes.reduce((acc, vote) => {
      if (vote.type === "UP") return acc + 1;
      if (vote.type === "DOWN") return acc - 1;
      return acc;
    }, 0);

    _currentVote = post.votes.find(
      (vote) => vote.userId === session?.user.id
    )?.type;
  } else {
    _voteAmt = initialVotesAmt!;
    _currentVote = initialVote!;
  }

  return (
    <PostVoteClient
      postId={postId}
      initialVotesAmt={_voteAmt}
      initialVote={_currentVote}
    />
  );
}
