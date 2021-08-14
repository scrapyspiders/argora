type PostData = {
  id: string,
  data: string | Uint8Array,
  owner: string | undefined,
  time: number | undefined,
  replyTo?: string,   // <- add the value on the top (txid at the moment) with a link to it
  comment?: boolean,  // <- resize
  fullText?: boolean  // <- show full text if it's long
};

type ParsedData = {
  text: string,
  picture: string
}

type PathParams = {
  pathBase: string,
  txid: string,
  addr: string
}

type PostHeader = {
  userAddr: string,
  txid: string,
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
  comment?: boolean,
  loading: boolean
}

export type {PostData, ParsedData, PostHeader, PathParams, FormPictureType, FormType};