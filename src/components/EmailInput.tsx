import React from 'react'
import {data} from '../data'

// console.log(data)

const EmailInput = () => {
	return (
		<div className="emailInput">
			<div className="tag">
				<span>theresa@outlook.com</span>
				<button className="deleteButton">x</button>
			</div>
			<input placeholder="Enter recipients..."></input>
		</div>
	)
}

export default EmailInput
