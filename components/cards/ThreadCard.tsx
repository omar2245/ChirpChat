import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  children?: any[] | [];
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: { id: string; name: string; image: string } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  children,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment = false,
}: Props) => {
  const totalReplies = children?.length ?? 0;

  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 sx:px-7" : "bg-dark-2 p-7"
      }  `}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="realtive w-11 h-11">
              <div className="relative w-11 h-11">
                <Image
                  src={author.image}
                  alt="author"
                  fill
                  className="cursor-pointer rounded-full object-cover"
                />
              </div>
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                {/* <Image
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                /> */}
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                {/* <Image
                  src="/assets/repost.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                /> */}
              </div>
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
              {!isComment && totalReplies > 0 && (
                <Link
                  href={`/thread/${id}`}
                  className="flex flex-row items-center"
                >
                  <div className="flex flex-row items-center relative">
                    {children?.slice(0, 3).map(
                      (child, index) =>
                        child?.author?.image && (
                          <div
                            className={`relative w-5 h-5  ${
                              index === 0 ? "ml-0" : "-ml-1"
                            }`}
                          >
                            <Image
                              src={child.author.image}
                              alt={"replier"}
                              fill
                              className="rounded-full object-cover "
                            />
                          </div>
                        )
                    )}
                  </div>

                  <p className="mt-1 ml-2 text-subtle-medium text-gray-1">
                    {totalReplies} {totalReplies > 1 ? "replies" : "reply"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
