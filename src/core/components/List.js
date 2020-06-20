import React, {useState} from 'react';
const createReactClass = require('create-react-class');
import useCrud from '../database/useCrud';

const InternalList = props => {
  const {children, resource} = props;
  const [state, setState] = useState([]);
  const {fetch, remove} = useCrud(resource);

  const handleFetch = query => {
    fetch(query).then(values => {
      setState(values);
    });
  };

  const handleDelete = async id => {
    await remove(id);
    handleFetch();
  };

  return React.cloneElement(children, {
    ...props,
    resource,
    items: state,
    fetch: handleFetch,
    remove: handleDelete,
  });
};

class List {
  static create(WrappedComponent, {resource}) {
    return createReactClass({
      render() {
        return (
          <InternalList {...this.props} resource={resource}>
            <WrappedComponent />
          </InternalList>
        );
      },
    });
  }
}

export default List;
