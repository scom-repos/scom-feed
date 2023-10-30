import { Control, application } from "@ijstech/components";
import { getIPFSGatewayUrl } from "../store/index";
import { IPostData } from "@scom/scom-post";

const getImageIpfsUrl = (url: string) => {
  const ipfsBaseUrl = getIPFSGatewayUrl();
  if (isIpfsCid(url))
    return ipfsBaseUrl + url;
  return url;
}

const isIpfsCid = (value: string): boolean => {
  const regex = new RegExp('^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})$');
  return regex.test(value);
}

export {
  getImageIpfsUrl
}