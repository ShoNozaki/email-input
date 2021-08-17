import React from 'react'
import { screen, render } from '@testing-library/react'
import EmailInput from './EmailInput'

test('Renders input and tags', () => {
	render(<EmailInput />)
	expect(screen.getByPlaceholderText('Enter recipients...')).toBeInTheDocument()
	expect(screen.getByText('theresa@outlook.com')).toBeInTheDocument()
	expect(screen.getByRole('button')).toHaveTextContent('x')
})