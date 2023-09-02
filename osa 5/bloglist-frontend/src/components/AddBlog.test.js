import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddBlog from './AddBlog'
import userEvent from '@testing-library/user-event'

test('<AddBlog /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<AddBlog createBlog={createBlog} />)

  //const input = screen.getByRole('textbox')[0]
  const input = screen.getByPlaceholderText('a new title')
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls[0][0].title);
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
})