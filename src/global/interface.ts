import { IPost } from "@scom/scom-post";

export interface IFeed {
  posts: IPost[];
  pinnedPosts?: IPost[];
}

export interface IPostExtended extends IPost {
  isPinned?: boolean;
}