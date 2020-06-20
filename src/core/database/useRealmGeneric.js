import {getInstanceRealm} from './realm';
import uuidv4 from '../utils/uuidv4';

const useRealmGeneric = () => {
  const instanceRealm = getInstanceRealm();
  const fetch = ({query, resource}) =>
    new Promise((resolve, reject) => {
      instanceRealm.then(realm => {
        const items = query
          ? resolve(realm.objects(resource).filtered(query))
          : resolve(realm.objects(resource));

        resolve(items);
      });
    });

  const remove = ({id, resource}) =>
    new Promise((resolve, reject) => {
      instanceRealm.then(realm => {
        realm.write(() => {
          let records = realm.objects(resource).filtered(`id = "${id}"`);
          realm.delete(records);
          resolve();
        });
      });
    });

  const inactivate = ({id, resource}) =>
    new Promise((resolve, reject) => {
      instanceRealm.then(realm => {
        realm.write(() => {
          let record = realm.objectForPrimaryKey(resource, id);
          record.active = false;
          resolve();
        });
      });
    });

  const create = ({record, resource}) =>
    new Promise((resolve, reject) => {
      instanceRealm.then(realm => {
        realm.write(() => {
          if (!record.id) {
            record = {
              ...record,
              id: uuidv4(),
            };
          }

          try {
            realm.create(resource, record);
            resolve(record);
          } catch (error) {
            reject(error);
          }
        });
      });
    });

  const update = ({modifiedRecord, resource}) =>
    new Promise((resolve, reject) => {
      instanceRealm.then(realm => {
        realm.write(() => {
          realm.create(resource, modifiedRecord, true);
          resolve();
        });
      });
    });

  const get = ({id, resource}) =>
    new Promise((resolve, reject) => {
      instanceRealm.then(realm => {
        const result = realm.objectForPrimaryKey(resource, id);

        var object = {};
        for (var property of Object.keys(result.objectSchema().properties)) {
          object[property] = result[property];
        }

        resolve(object);
      });
    });

  return {
    fetch,
    remove,
    create,
    get,
    update,
    inactivate,
  };
};

export default useRealmGeneric;
