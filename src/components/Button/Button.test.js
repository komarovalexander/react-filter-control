import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('structures', () => {
  const testRenderer = TestRenderer.create(
    <Button text="Test" />,
  );
  expect(testRenderer.toJSON()).toMatchSnapshot();
});

it('onClick', () => {
  const spyClick = jest.fn();
  const button = shallow((
    <Button onClick={spyClick} />
  ));
  button.find('button').simulate('click');
  expect(spyClick).toHaveBeenCalledTimes(1);
});
