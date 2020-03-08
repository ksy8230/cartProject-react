import React from 'react'
import { render } from '@testing-library/react'
import Index from '../pages/index'

test('renders index link', () => {
  const { getByText } = render(<Index />)
  const linkElement = getByText(
    /상품리스트/
  )
  expect(linkElement).toBeInTheDocument();
});