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

type FormType = {
  handleSubmit: (inputValue: string) => Promise<void>,
  placeholder: string,
  loginMessage: string
}

export type {PostData, PostHeader, PathParams, FormType};