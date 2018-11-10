import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilterGroup from './FilterGroup';

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
  ReactDOM.render(<FilterGroup
    fields={testData.fields}
    groups={testData.groups}
    filterValue={testData.filterValue}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('removeCondition', () => {
  const spy = jest.fn();
  const filterGroup = mount((
    <FilterGroup
      fields={testData.fields}
      groups={testData.groups}
      filterValue={testData.filterValue}
      onFilterValueChanged={spy}
    />
  ));
  filterGroup.find('.fc-button-remove').last().simulate('click');
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith({
    groupName: 'and',
    items: [{
      field: 'field1', key: 1, operator: '=', value: '123',
    }],
  });
  filterGroup.setProps({ filterValue: spy.mock.calls[0][0] });
  filterGroup.find('.fc-button-remove').first().simulate('click');
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenCalledWith({ groupName: 'and', items: [] });
});
