import Arweave from 'arweave';
import ArDB from '@textury/ardb';
import * as smartweave from 'smartweave';
import transaction from '@textury/ardb/lib/models/transaction';
import {GQLTagInterface} from '@textury/ardb/lib/faces/gql';
import block from '@textury/ardb/lib/models/block';
import {C_appVersionTag, C_replyToRootName} from '../constants';
import {T_planet, T_timeline, T_txid, T_walletAddr} from '../types';

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

const getTimeline = async (type: T_timeline, planet: T_planet | undefined, txid: T_txid | T_walletAddr) => {
  let result: transaction[] | block[];
  let replyToTags: (GQLTagInterface | undefined)[] | { value: any; }[] = [undefined];
  let planetTags: (GQLTagInterface | undefined)[] | { value: any; }[] = [undefined];

  // root timeline (Metaweave timeline)
  if(!planet){
    if(type === "profile"){
      result = await ardb.search('transactions')
      .tag('App-Name', 'argora')
      .tag('App-Version', C_appVersionTag)
      .from(txid)
      .limit(30).find();
      replyToTags = result.map(tx => 'tags' in tx ? tx.tags.find(tag => tag.name === 'reply-to') : undefined);
    }
    else{
      result = await ardb.search('transactions')
      .tag('App-Name', 'argora')
      .tag('App-Version', C_appVersionTag)
      .tag('reply-to', txid)
      .limit(30).find()
    }
  }
  
  // App-Version: v1.1
  else{
    if(type === "profile"){
      result = await ardb.search('transactions')
      .tag('App-Name', 'argora')
      .tag('App-Version', C_appVersionTag)
      .tag('planet', planet)
      .from(txid)
      .limit(30).find();
      replyToTags = result.map(tx => 'tags' in tx ? tx.tags.find(tag => tag.name === 'reply-to') : undefined);
    }
    else{
      result = await ardb.search('transactions')
      .tag('App-Name', 'argora')
      .tag('App-Version', C_appVersionTag)
      .tag('reply-to', txid)
      .tag('planet', planet)
      .limit(30).find()
    }
  }
  
  planetTags = result.map(tx => 'tags' in tx ? tx.tags.find(tag => tag.name === 'planet') : undefined);
  
  return {result, replyToTags, planetTags};
};

const countPostsByPlanet = async (planet: T_planet) => {
  const result = await ardb.search('transactions')
  .tag('App-Name', 'argora')
  .tag('App-Version', C_appVersionTag)
  .tag('planet', planet)
  .tag('reply-to', C_replyToRootName)
  .limit(100).find();
  return result.length;
};

export {arweave, ardb, getVertoPeople, getTimeline, countPostsByPlanet};