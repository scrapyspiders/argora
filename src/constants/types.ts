type PostData = {
  id: string,
  content: string | Uint8Array,
  owner: string,
  time: number,
  replyTo?: string,
  comment?: boolean
};

type PathParams = {
  pathBase: string,
  txid: string
}

type PostHeader = {
  userAddr: string,
  txid: string,
  time: number
}

export type {PostData, PostHeader, PathParams};