import {T_txid, T_walletAddr, T_topic, T_timeline} from './primary';

type PostData = {
  id: T_txid,
  data: string | Uint8Array,
  owner: T_walletAddr | undefined,
  time: number | undefined,
  replyTo?: T_txid | T_topic,   // <- add the value on the top (txid at the moment) with a link to it
  comment?: boolean,         // <- resize
  fullText?: boolean         // <- show full text if it's long
};

type ParsedData = {
  text: string,
  picture: T_txid
}

type PathParams = {
  pathBase: string,
  txid: T_txid,
  addr: T_walletAddr
}

type PostHeader = {
  userAddr: T_walletAddr,
  txid: T_txid,
  time: number
}

type FormPictureType = {
  blobUrl: string,
  type: string
}

type FormType = {
  handleSubmit: (inputValue: string, picture: FormPictureType | null, callback: () => void) => Promise<void>,
  placeholder: string,
  loginMessage: string,
  type: T_timeline,
  loading: boolean
}

type VertoUserLink = {
  twitter?: string,
  github?: string,
  instagram?: string
}

type VertoUser = {
  username?: string,
  name?: string,
  addresses: [T_walletAddr],
  image: T_txid,
  bio: string,
  links: VertoUserLink
}

export type {
  PostData,
  ParsedData,
  PostHeader,
  PathParams,
  FormPictureType,
  FormType,
  VertoUser,
};

export * from './primary';