import { IAuthor } from "@scom/scom-post";

export const state = {
  ipfsGatewayUrl: ""
}

export const setDataFromJson = (options: any) => {
  if (options.ipfsGatewayUrl) {
    setIPFSGatewayUrl(options.ipfsGatewayUrl);
  }
}

export const setIPFSGatewayUrl = (url: string) => {
  state.ipfsGatewayUrl = url;
}

export const getIPFSGatewayUrl = () => {
  return state.ipfsGatewayUrl;
}

export const getCurrentUser = () => {
  const user: IAuthor = {
    id: "",
    username: "",
    description: "",
    avatar: undefined
  }
  return user;
}
