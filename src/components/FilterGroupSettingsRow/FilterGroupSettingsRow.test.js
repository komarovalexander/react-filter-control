import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilterGroupSettingsRow from './FilterGroupSettingsRow';

configure({ adapter: new Adapter() });

const testData = {
  fields: [{
    name: 'field1',
    caption: 'Field',
    operators: [{
      name: '=',
      caption: 'Equals',
      valueInput: 'text',
    }, {
      name: '>',
      caption: 'More than',
      valueInput: 'text',
    }],
    defaultValue: '',
    canApplyFilter: () => true,
    customizeConditionValue: condition => condition,
  }, {
    name: 'field2',
    caption: 'Field',
    operators: [{
      name: '=',
      caption: 'Equals',
      valueInput: 'text',
    }],
    defaultValue: '',
    canApplyFilter: () => true,
    customizeConditionValue: condition => condition,
  }],
  groups: [{
    name: 'and',
    caption: 'And',
  }, {
    name: 'or',
    caption: 'Or',
  }],
  filterValue: {
    groupName: 'and',
    items: [{
      key: 1,
      field: 'field1',
      operator: '=',
      value: '123',
    }, {
      key: 2,
      field: 'field1',
      operator: '=',
      value: '123',
    }],
  },
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilterGroupSettingsRow
    onFilterValueChanged={() => {}}
    removeClick={() => {}}
    groups={testData.groups}
    fields={testData.fields}
    filterValue={testData.filterValue}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('addCondition', () => {
  const spy = jest.fn();
  const filterGroupSettingsRow = mount((
    <FilterGroupSettingsRow
      onFilterValueChanged={spy}
      removeClick={() => {}}
      groups={testData.groups}
      fields={testData.fields}
      filterValue={testData.filterValue}
    />
  ));
  filterGroupSettingsRow.find('.fc-button-add').first().simulate('click');
  filterGroupSettingsRow.find('.fc-dropdownmenu-contextmenu-item').first().simulate('click');
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith({
    groupName: 'and',
    items: [
      {
        field: 'field1', key: 1, operator: '=', value: '123',
      },
      {
        field: 'field1', key: 2, operator: '=', value: '123',
      },
      {
        field: 'field1', key: 3, operator: '=', value: '',
      },
    ],
  });
});
