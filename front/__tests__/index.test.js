import React from 'react'
import { render, fireEvent, getByText } from '@testing-library/react';
import Index from '../pages/index'

it('인덱스 페이지 렌더링', () => {
  const utils = render(<Index />);
  expect(utils.container).toMatchSnapshot();
});