import React, { Component, memo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
const ProductName = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin: 10px 0;
`;

const CartButton = styled.button`
  font-weight: 500;
  font-size: 0.7rem;
  text-transform: uppercase;
  border-radius: 2px;
  background-color: #ff3e6c;
  color: #fff;
  letter-spacing: 0.3px;
  cursor: pointer;
  padding: 8px 12px;
  border: none;
`;




class ProductList extends Component {
  constructor(props) {
    super(props);
    this.handleCartBtnClick = this.handleCartBtnClick.bind(this)
  }

  handleCartBtnClick = product => {
      this.props.firestore.set({ collection: 'cart', doc: product.id }, { ...product, quantity: 1 });
  }
  render() {
      return (
      <div>
        <div className="container-fluid">
            <div className="row">
              {this.fetch_Data()}

            </div>
        </div>
        </div>
      )
  }

  fetch_Data() {
    if (this.props.productsList) {
        return (
          this.props.productsList.map((product, key) => (
            <div className="col-sm-6 col-md-4 col-xl-3" key={key} data-id={product.id}>
              <div className="card shadow-sm p-2 mb-4" style={{ position: 'relative' }}>
                <img src={product.image} alt="..." className="img-thumbnail" />
                <ProductName>{product.name}</ProductName>
                <ProductName className="m-0" key={product._id}>${product.price}</ProductName>
                <CartButton onClick={() => this.handleCartBtnClick(product)}> Add to bag</CartButton>
              </div>
            </div>
          )
          )
        )
      }
  }
}

const mapStateToProps = state => ({
  productsList: state.firestore.ordered.products,
  addedItems: state.firestore.ordered.cart,
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
  firestoreConnect([
    { collection: 'products' },
    { collection: 'cart' },
  ])
)(ProductList);
