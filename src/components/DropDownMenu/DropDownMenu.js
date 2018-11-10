import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Consumer from '../../context';

class DropDownMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleButtonClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMenuItemClick(index) {
    const { menuItems, keyField, onMenuItemClick } = this.props;
    const selected = menuItems[index];
    onMenuItemClick(keyField ? selected[keyField] : selected);
    this.setState({ anchorEl: null });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  renderButton(children) {
    return React.Children.map(children, child => React.cloneElement(child, {
      onClick: this.handleButtonClick,
    }));
  }

  render() {
    const {
      activeIndex, color, menuItems, textField, keyField, children,
    } = this.props;
    const { anchorEl } = this.state;

    return (
      <span className="fc-dropdownmenu">
        {
        children ? this.renderButton(children) : (
          <Consumer>
            { value => (
              <value.Button
                text={textField ? menuItems[activeIndex][textField] : menuItems[activeIndex]}
                color={color}
                onClick={this.handleButtonClick}
              />
            )}
          </Consumer>
        )
      }
        <Consumer>
          { value => (
            <value.Menu
              handleMenuItemClick={this.handleMenuItemClick}
              handleClose={this.handleClose}
              visible={anchorEl != null}
              menuItems={menuItems}
              textField={textField}
              keyField={keyField}
              activeIndex={activeIndex}
            />
          )}
        </Consumer>
      </span>
    );
  }
}

DropDownMenu.propTypes = {
  activeIndex: PropTypes.number,
  color: PropTypes.string,
  menuItems: PropTypes.arrayOf(PropTypes.any).isRequired,
  onMenuItemClick: PropTypes.func.isRequired,
  textField: PropTypes.string,
  keyField: PropTypes.string,
  children: PropTypes.node,
};

DropDownMenu.defaultProps = {
  activeIndex: 0,
  color: '',
  textField: '',
  keyField: '',
  children: undefined,
};


export default DropDownMenu;
