import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'BlogTitle',
  author: 'BlogAuthor',
  user: {name :'Username'},
  url: 'BlogURL',
  likes: 5
}

test('renders content', () => {
 
  render(<Blog blog={blog} />)

  const element = screen.getByText('BlogTitle')
  expect(element).toBeDefined()
})

test('lisätiedot näytetään, kun nappia on painettu ', async () => {

  render(
    <Blog blog={blog} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('Näytä')
  await user.click(button)

  const element = screen.getByText('Username')
})