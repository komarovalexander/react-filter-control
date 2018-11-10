import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ContextMenu from './ContextMenu';

configure({ adapter: new Adapter() });

const contextMenuItems = [{
  id: '1',
  text: 'And',
}, {
  id: '2',
  text: 'Or',
}];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContextMenu
    items={contextMenuItems}
    keyField="id"
    textField="text"
    onItemClick={() => {}}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('visible = false', () => {
  const contextMenu = shallow((
    <ContextMenu
      items={contextMenuItems}
      keyField="id"
      textField="text"
      onItemClick={() => {}}
      visible={false}
    />
  ));
  expect(contextMenu.find('.fc-hidden').length).toBe(1);
});

it('visible = true', () => {
  const contextMenu = shallow((
    <ContextMenu
      keyField="id"
      textField="text"
      items={contextMenuItems}
      onItemClick={() => {}}
      visible
    />
  ));
  expect(contextMenu.find('.fc-contextmenu.fc-hidden').length).toBe(0);
  expect(contextMenu.find('.fc-contextmenu').length).toBe(1);
});

it('check text', () => {
  const spyOnItemClick = jest.fn();
  const contextMenu = shallow((
    <ContextMenu
      keyField="id"
      textField="text"
      items={contextMenuItems}
      onItemClick={spyOnItemClick}
      visible
    />
  ));
  expect(contextMenu.find('.fc-contextmenu-item').first().text()).toBe('And');
  expect(contextMenu.find('.fc-contextmenu-item').last().text()).toBe('Or');
});

it('onItemClick', () => {
  const spyOnItemClick = jest.fn();
  const contextMenu = shallow((
    <ContextMenu
      keyField="id"
      textField="text"
      items={contextMenuItems}
      onItemClick={spyOnItemClick}
      visible
    />
  ));
  contextMenu.find('.fc-contextmenu-item').last().simulate('click');
  expect(spyOnItemClick).toHaveBeenCalledTimes(1);
  expect(spyOnItemClick).toHaveBeenCalledWith(1);
});
