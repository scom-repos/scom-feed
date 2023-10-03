interface IPostAnalytics {
  reply: string | number;
  repost: string | number;
  like: string | number;
  bookmark: string | number;
  view: string | number;
}

export interface IReply {
  cid: string;
}

export interface IPostData {
  username: string;
  owner?: string;
  description?: string;
  dataUri?: string;
  publishDate?: number;
  avatar?: string;
  replies?: IReply[];
  analytics?: IPostAnalytics;
}

