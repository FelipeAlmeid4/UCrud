/* eslint-disable eslint-comments/no-unlimited-disable */
import React, {useEffect, useState} from 'react';
const createReactClass = require('create-react-class');
import useCrud from '../database/useCrud';
import {useFormik} from 'formik';
import KeyboardShift from './KeyboardShift';
import {ToastAndroid} from 'react-native';

const InternalEdit = props => {
  const {
    children,
    resource,
    route,
    getTitle,
    navigation,
    initialValues,
    validationSchema,
    onBeforeSubmit,
    onAfterCreateOrUpdate,
    onErrorCreateOrUpdate,
  } = props;
  const {params = {}} = route;
  const {create, get, update} = useCrud(resource);
  const [loading, setLoading] = useState(false);

  const action = params.id ? 'update' : 'create';
  const title = getTitle(action);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  const form = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validationSchema: validationSchema,
    onSubmit: async values => {
      setLoading(true);

      try {
        if (onBeforeSubmit) {
          values = onBeforeSubmit(values);
        }

        if (action === 'update') {
          await update({...values, id: params.id});
        } else {
          await create({...values});
        }

        if (onAfterCreateOrUpdate) {
          onAfterCreateOrUpdate({action, navigation});
        }
      } catch (error) {
        if (!onErrorCreateOrUpdate) {
          ToastAndroid.showWithGravityAndOffset(
            error.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            10,
            10,
          );
          return;
        } else {
          onErrorCreateOrUpdate({action, error});
        }
      }

      setLoading(false);
    },
  });

  useEffect(() => {
    if (params.id) {
      get(params.id).then(record => {
        form.setValues(record);
      });
    }

    // eslint-disable-next-line
  }, [params.id]);

  return (
    <KeyboardShift>
      {React.cloneElement(children, {
        ...props,
        resource: resource,
        title,
        action,
        form,
        loading,
      })}
    </KeyboardShift>
  );
};

class Edit {
  static create(
    WrappedComponent,
    {
      getTitle = action => (action === 'create' ? 'Novo' : 'Editar'),
      resource,
      initialValues,
      validationSchema,
      onBeforeSubmit,
      onAfterCreateOrUpdate,
      onErrorCreateOrUpdate,
    },
  ) {
    return createReactClass({
      render() {
        return (
          <InternalEdit
            {...this.props}
            resource={resource}
            getTitle={getTitle}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onBeforeSubmit={onBeforeSubmit}
            onErrorCreateOrUpdate={onErrorCreateOrUpdate}
            onAfterCreateOrUpdate={onAfterCreateOrUpdate}>
            <WrappedComponent />
          </InternalEdit>
        );
      },
    });
  }
}

export default Edit;
