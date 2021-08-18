import Arweave from 'arweave';
import ArDB from '@textury/ardb';
import * as smartweave from 'smartweave';
import transaction from '@textury/ardb/lib/models/transaction';
import {GQLTagInterface} from '@textury/ardb/lib/faces/gql';
import block from '@textury/ardb/lib/models/block';
import {appVersionTag} from '../constants';
import {T_timeline, T_txid, T_walletAddr} from '../types';

const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 20000,     // Network request timeouts in milliseconds
  logging: false,
});

const ardb = new ArDB(arweave);

const getVertoPeople = async () => {
  const vertoID = await smartweave.readContract(
    arweave,
    "t9T7DIOGxx4VWXoCEeYYarFYeERTpWIC1V3y-BPZgKE"
  );
  return vertoID.people;
}

const getTimeline = async (type: T_timeline, txid: T_txid | T_walletAddr) => {
  let result: transaction[] | block[];
  let replyToTags: (GQLTagInterface | undefined)[] | { value: any; }[] = [undefined];

  if(type === "profile"){
    result = await ardb.search('transactions')
      .tag('App-Name', 'argora')
      .tag('App-Version', appVersionTag)
      .from(txid)
      .limit(30).find();
    replyToTags = result.map(tx => 'tags' in tx ? tx.tags.find(tag => tag.name === 'reply-to') : undefined);
  }
  else{
    result = await ardb.search('transactions')
      .tag('App-Name', 'argora')
      .tag('App-Version', appVersionTag)
      .tag('reply-to', txid)
      .limit(30).find()
  }
  
  return {result, replyToTags};
};

export {arweave, ardb, getVertoPeople, getTimeline};