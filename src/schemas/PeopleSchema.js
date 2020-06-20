class PersonSchema {
  static schema = {
    name: 'people',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', indexed: true},
      federalTaxIdentificationNumber: {type: 'string?', indexed: true},
      employerIdentificationNumber: {type: 'string?', indexed: true},
      name: {type: 'string', indexed: true},
      fantasyName: {type: 'string?', indexed: true},
      gender: 'string',
      cellPhone: 'string?',
      telephone: 'string?',
      email: 'string?',
      address: 'string?',
      note: 'string?',
      roles: 'string[]',
    },
  };
}

export default PersonSchema;
