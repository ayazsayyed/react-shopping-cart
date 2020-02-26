import React, { Component, memo } from 'react';
import styled, { keyframes } from 'styled-components';
import { firestoreConnect } from 'react-redux-firebase';

import { connect } from 'react-redux';
import { compose } from 'redux';
import '../style.css';

const CartWrapper = styled.div`
  height: auto;
  // position: fixed;
  background: #e0e0e0;
  right: 0;
  bottom: 50px;
  animation: ${activeAnim} 0.5s linear;
`;

const activeAnim = keyframes`
    0%   {
        background-color: transparent;
    }
    50%  {
        background-color: #fff;
    }
    100%  {
        background-color: transparent;
    }
`;

const ImageWidth = styled.div`
  width: 60px;
  margin: auto;
  border: 2px solid #000;
  @media (max-width: 1300px) {
    width: 40px;
  }
`;
const IncrementBtn = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin: 0 10px;
  color: #ff3e6c;
  cursor: pointer;
`;
const DecrementBtn = styled(IncrementBtn)``;
const QuantityField = styled.span`
  background: #fff;
  padding: 3px 7px;
  font-size: 15px;
  color: #ff3e6c;
`;

class Cart extends Component {
  constructor(props) {
    super(props);
    this.incrementQty = this.incrementQty.bind(this);
    this.decrementQty = this.decrementQty.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateCartTotal = this.updateCartTotal.bind(this);

    this.state = {
      active: false,
      total: 0,
      aa: 'as',
    };
  }

  render() {
    return (
      <CartWrapper active className={this.props.showCart ? 'active' : null}>
        {
          // this.props.addedItems.length > 0 &&
          <div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h5 className="text-center my-3">ORDER</h5>
                  <hr className="my-3" />
                </div>
                {this.updateCart()}
              </div>
              <div className="row">
                <div className="col-md-12">{this.updateCartTotal()}</div>
              </div>
            </div>
          </div>
        }
      </CartWrapper>
    );
  }

  updateCartTotal() {
    if (this.props.addedItems) {
      return (
        <h5 className="text-center my-3">
          Total :{' '}
          {this.props.addedItems.reduce((a, b) => a + b.price * b.quantity, 0)}
        </h5>
      );
    }
  }

  updateCart() {
    if (this.props.addedItems) {
      return this.props.addedItems.map((item, key) => (
        <div className="col-md-12 mb-0" key={key}>
          <ul className="cartItemWrapper">
            <li className="productImage">
              <img src={item.image} className="img-fluid" alt="" />
            </li>
            <li className="productName">
              <p>{item.name}</p>
            </li>
            <li className="productQuantityWrapper">
              <DecrementBtn
                onClick={() => item.quantity > 0 && this.decrementQty(item)}
              >
                <span className="increment">-</span>
              </DecrementBtn>
              <QuantityField>
                <span className="quantity">{item.quantity} </span>
              </QuantityField>
              <IncrementBtn onClick={() => this.incrementQty(item)}>
                <span className="increment">+</span>
              </IncrementBtn>
            </li>
            <li className="productPrice">
              <p>{item.price}</p>
            </li>
            <li className="productDelete">
              <i
                className="fa fa-trash-o"
                aria-hidden="true"
                onClick={() => {
                  this.deleteItem(item.id);
                }}
              />
            </li>
          </ul>
          <hr className="my-2" />
        </div>
      ));
    }
  }

  deleteItem(id) {
    this.props.addedItems.filter(item => {
      if (item.id === id) {
        this.props.firestore.delete({ collection: 'cart', doc: id });
      }
    });
  }

  incrementQty(product) {
    this.props.firestore.set(
      { collection: 'cart', doc: product.id },
      { ...product, quantity: product.quantity + 1 },
    );
  }

  decrementQty(product) {
    this.props.firestore.set(
      { collection: 'cart', doc: product.id },
      { ...product, quantity: product.quantity - 1 },
    );
  }
}

const mapStateToProps = state => ({
  addedItems: state.firestore.ordered.cart,
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
  firestoreConnect([{ collection: 'products' }, { collection: 'cart' }]),
)(Cart);
