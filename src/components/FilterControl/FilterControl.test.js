import React from 'react';
import ReactDOM from 'react-dom';
import FilterControl from './FilterControl';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilterControl
    fields={[{ name: 'field', operators: [{ name: '=' }] }]}
    groups={[{ name: 'and', caption: 'And' }]}
    filterValue={{
      groupName: 'and',
      items: [{
        key: '1', field: 'field', operator: '=', value: '1',
      }],
    }}
    onFilterValueChanged={() => {}}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
