const timelineGql = `{
  transactions(
    first: 30
    tags: [
      { name: "App-Name", values: "argora" }
      { name: "App-Version", values: "0.0.1" }
      { name: "reply-to", values: "world" }
    ]
  ) {
    edges {
      node {
        id
        owner { address }
        block { timestamp }
      }
    }
  }
}`;

const postGql = (txid: string) => `{
  transaction(
    id: "${txid}"
  ) {
    id
    owner { address }
    block { timestamp }
  }
}`;

const repliesGql = (txid: string) => `{
  transactions(
    tags: [
      { name: "App-Name", values: "argora" }
      { name: "App-Version", values: "0.0.1" }
      { name: "reply-to", values: "${txid}" }
    ]
  ) {
  	edges {
			node {
    		id
    		owner { address }
    		block { timestamp }
  		}
		}
	}
}`;

export { timelineGql, postGql, repliesGql };