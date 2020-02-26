/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import messages from './messages';
import ProductList from '../../components/ProductList';
import Cart from '../../components/Cart';

const Title = styled.div`
  font-size: 2.5em;
  text-align: left;
  color: #ff3e6c;
  padding: 20px;
  background: #e0e0e0;
  margin-bottom: 30px;
`;

const MainWrapper = styled.div`
  position: relative;
`;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Title>
          <div className="header">
            <FormattedMessage {...messages.header} />
          </div>
        </Title>
        <MainWrapper className="container-fluid">
          <div className="row">
            <div className="col-md-8 col-lg-9">
              <ProductList />
            </div>
            <div className="col-md-4  col-lg-3">
              <Cart />
            </div>
          </div>
        </MainWrapper>
      </div>
    );
  }
}
