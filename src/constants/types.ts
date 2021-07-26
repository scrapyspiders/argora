type PostData = {
  id: string,
  content: string | Uint8Array,
  owner: string,
  time: number,
  replyTo?: string
};

type ThreadParams = {
  pathBase: string,
  txid: string
}

export type { PostData, ThreadParams };