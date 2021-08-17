import React from 'react'
import { screen, render } from '@testing-library/react'
import EmailInput from './EmailInput'

test('Renders input', () => {
	render(<EmailInput />)
	expect(screen.getByPlaceholderText('Enter recipients...')).toBeInTheDocument()
})