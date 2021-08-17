import React from 'react'
import { screen, render } from '@testing-library/react'
import EmailInput from './EmailInput'

test('Renders input and tags', async () => {
	render(<EmailInput />)
	expect(screen.getByPlaceholderText('Enter recipients...')).toBeInTheDocument()
	expect( await screen.findByText('theresa@outlook.com')).toBeInTheDocument()
})