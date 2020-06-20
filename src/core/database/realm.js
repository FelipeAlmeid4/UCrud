import Realm from 'realm';
import PeopleSchema from '../../schemas/PeopleSchema';
import RNFS from 'react-native-fs';

const database = 'realmdb.realm';

const config = {
  schema: [PeopleSchema],
  schemaVersion: 0,
  path: RNFS.DocumentDirectoryPath + '/' + database,
  migration: (oldRealm, newRealm) => {},
};

let realmInstance = Realm.open(config);

const getInstanceRealm = () => realmInstance;

const createBackup = async () => {
  //implementar
};

const restaureBackup = async path => {
  // implementar
};

export {getInstanceRealm, createBackup, restaureBackup};
