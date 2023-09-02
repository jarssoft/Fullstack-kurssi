import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'BlogTitle',
    author: 'BlogAuthor',
    url: 'BlogURL',
    likes: 5
  }
 
  render(<Blog blog={blog} />)

  const element = screen.getByText('BlogTitle')
  expect(element).toBeDefined()
})