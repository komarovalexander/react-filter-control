import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DropDownMenu from './DropDownMenu';

configure({ adapter: new Adapter() });

const menuItems = [{
  text: 'And',
}, {
  text: 'Or',
}];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DropDownMenu
    menuItems={menuItems}
    textField="text"
    keyField="text"
    onMenuItemClick={() => {}}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('check button text', () => {
  const dropDownMenu = mount((
    <DropDownMenu
      menuItems={menuItems}
      textField="text"
      keyField="text"
      onMenuItemClick={() => {}}
    />
  ));
  expect(dropDownMenu.find('.fc-dropdownmenu-button').text()).toBe('And');
});

it('onMenuItemClick', () => {
  const spyClick = jest.fn();
  const dropDownMenu = mount((
    <DropDownMenu
      textField="text"
      keyField="text"
      menuItems={menuItems}
      onMenuItemClick={spyClick}
    />
  ));
  dropDownMenu.find('.fc-dropdownmenu-button').last().simulate('click');
  dropDownMenu.find('.fc-dropdownmenu-contextmenu-item').last().simulate('click');
  expect(spyClick).toHaveBeenCalledTimes(1);
  expect(spyClick).toHaveBeenCalledWith('Or');
});
