import { getIPFSGatewayUrl } from "../store/index";
import mockupData from './localData/data.json';

const fetchDataByCid = async (cid: string) => {
  return {...mockupData};
  try {
    const ipfsBaseUrl = getIPFSGatewayUrl();
    const url = `${ipfsBaseUrl}/${cid}`;
    const response = await fetch(url);
    return await response.json();
  } catch {}
  return null;
}

export {
  fetchDataByCid
}
