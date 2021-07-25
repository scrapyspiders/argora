type PostData = {
  id: string,
  content: string | Uint8Array,
  owner: string,
  time: number,
  replyTo?: string
};

export default PostData;