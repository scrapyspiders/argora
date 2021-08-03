type PostData = {
  id: string,
  content: string | Uint8Array,
  owner: string | undefined,
  time: number | undefined,
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
  loginMessage: string,
  comment?: boolean,
  loading: boolean
}

export type {PostData, PostHeader, PathParams, FormType};