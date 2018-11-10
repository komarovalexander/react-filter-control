import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Condition from './Condition';

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
  ReactDOM.render(<Condition
    key={1}
    value={testData.filterValue.items[0]}
    fields={testData.fields}
    onConditionValueChanged={() => {}}
    removeClick={() => {}}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('set a default operation and clear value after change a field', () => {
  const spy = jest.fn();
  const condition = mount((
    <Condition
      key={1}
      value={testData.filterValue.items[0]}
      fields={testData.fields}
      removeClick={() => {}}
      onConditionValueChanged={spy}
    />
  ));
  condition.find('.fc-dropdownmenu-button').first().simulate('click');
  condition.find('.fc-dropdownmenu-contextmenu-item').last().simulate('click');
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith({
    field: 'field2', key: 1, operator: '=', value: '',
  });
});
