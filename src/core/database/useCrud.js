import useRealmGeneric from './useRealmGeneric';
import {useCallback} from 'react';

const useCrud = resource => {
  const {get, fetch, update, remove, create} = useRealmGeneric();

  return {
    fetch: useCallback(query => fetch({resource, query}), [fetch, resource]),
    remove: useCallback(id => remove({resource, id}), [remove, resource]),
    create: useCallback(record => create({resource, record}), [
      create,
      resource,
    ]),
    get: useCallback(id => get({resource, id}), [get, resource]),
    update: useCallback(modifiedRecord => update({resource, modifiedRecord}), [
      resource,
      update,
    ]),
  };
};

export default useCrud;
