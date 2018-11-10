export const fields = [{
  name: 'field1',
  caption: 'Field',
  operators: [{
    name: '=',
    caption: 'Equals',
  }, {
    name: '<>',
    caption: 'Does not equal',
  }],
}, {
  name: 'field2',
  caption: 'Field',
  operators: [{
    name: '=',
    caption: 'Equals',
  }],
}];

export const groups = [{
  name: 'and',
  caption: 'And',
}, {
  name: 'or',
  caption: 'Or',
}];

export const filterValue = {
  groupName: "and",
  items: [
    {
      key: "1",
      field: "field1",
      operator: "=",
      value: "1"
    },
    {
      key: "2",
      field: "field1",
      operator: "=",
      value: "2"
    },
    {
      key: "3",
      groupName: "or",
      items: [
        {
          key: "3-1",
          field: "field1",
          operator: "<>",
          value: "3"
        },
        {
          key: "3-2",
          field: "field2",
          operator: "=",
          value: "1"
        }
      ]
    }
  ]
};
