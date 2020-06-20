import React from 'react';
import * as yup from 'yup';
import {
  Edit,
  InputForm,
  EditForm,
  InputMaskForm,
  GenderForm,
  TextAreaForm,
} from '../../core/components';
import {ToastAndroid} from 'react-native';
import {formartOnlyNumber} from '../../core/utils';

const initialValues = {
  roles: [],
  gender: 'male',
};

const validationClientSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório.'),
  federalTaxIdentificationNumber: yup
    .string()
    .min(11, 'CPF inválido.')
    .max(14, 'CPF inválido.')
    .required('CPF é obrigatório.'),
  email: yup
    .string()
    .nullable()
    .email('E-mail inválido.'),
  gender: yup.string().required('Sexo é obrigatório'),
});

const ClientEdit = props => {
  return (
    <EditForm {...props}>
      <GenderForm name="gender" />
      <InputMaskForm
        type="cpf"
        name="federalTaxIdentificationNumber"
        label="CPF"
        maxLength={14}
      />
      <InputForm name="name" label="Nome" form={props.form} />
      <InputForm name="fantasyName" label="Apelido" />
      <InputMaskForm
        type="cel-phone"
        name="cellPhone"
        label="Celular"
        maxLength={15}
      />
      <InputMaskForm
        type="cel-phone"
        name="telephone"
        label="Telefone"
        maxLength={15}
      />
      <InputForm name="email" label="Email" />
      <InputForm name="address" label="Endereço" />
      <TextAreaForm name="note" label="Observações" />
    </EditForm>
  );
};

const onBeforeSubmit = submitData => {
  submitData.federalTaxIdentificationNumber = formartOnlyNumber(
    submitData.federalTaxIdentificationNumber,
  );

  return submitData;
};

const onAfterCreateOrUpdate = ({action, navigation}) => {
  ToastAndroid.showWithGravityAndOffset(
    action === 'create' ? 'Cadastrado com sucesso' : 'Salvo com sucesso',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    10,
    10,
  );

  if (navigation) {
    navigation.goBack();
  }
};

const onErrorCreateOrUpdate = ({error}) => {
  ToastAndroid.showWithGravityAndOffset(
    error.message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    10,
    10,
  );
};

export default Edit.create(ClientEdit, {
  resource: 'people',
  initialValues,
  validationSchema: validationClientSchema,
  onBeforeSubmit,
  onAfterCreateOrUpdate,
  onErrorCreateOrUpdate,
});
