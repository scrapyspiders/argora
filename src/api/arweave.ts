import Arweave from 'arweave';
import ArDB from '@textury/ardb';
import * as smartweave from 'smartweave';

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

export {arweave, ardb, getVertoPeople};