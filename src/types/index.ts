import {T_txid, T_walletAddr, T_replyToRootName, T_timeline, T_planet, T_post, T_replyToProfileName} from './primary';

type PostData = {
  id: T_txid,
  data: string | Uint8Array,
  owner: T_walletAddr | undefined,
  time: number | undefined,
  replyTo?: T_txid | T_replyToRootName | T_replyToProfileName, // <- arweave tag `reply-to`: add the value on the top (txid at the moment) with a link to it
  planet?: T_planet,          // <- arweave tag `planet`: optional to stay compatible with App-Version 1.0
};

type PostComponent = PostData & {
  type: T_post
};

type ParsedData = {
  text: string,
  picture: T_txid
};

type PathParams = {
  pathBase: string,
  planet: T_planet,
  txid: T_txid,
  addr: T_walletAddr
};

type PostHeader = {
  userAddr: T_walletAddr,
  txid: T_txid,
  time: number
};

type FormPictureType = {
  blobUrl: string,
  type: string
};

type FormType = {
  handleSubmit: (inputValue: string, picture: FormPictureType | null, callback: () => void) => Promise<void>,
  type: T_timeline,
  loading: boolean
};

type T_userVertoID_link = {
  twitter?: string,
  github?: string,
  instagram?: string
};

type T_userVertoID = {
  username: string,
  name?: string,
  addresses: [T_walletAddr],
  image: T_txid,
  bio: string,
  links: T_userVertoID_link
};

export type {
  PostData,
  PostComponent,
  ParsedData,
  PostHeader,
  PathParams,
  FormPictureType,
  FormType,
  T_userVertoID
};

export * from './primary';