import React, { useState } from 'react'
import {data} from '../data'
import './EmailInput.css'

// console.log(data)


const EmailInput = () => {
	const [tags, setTags] = useState(["theresa@outlook.com", "erictaylor"]);

	const removeTag = (tagI: number) => {
		setTags(prevTags => prevTags.filter((tag, i) => i !== tagI))
	}


	return (
		<div className="emailInput">
			{tags.map((tag, tagI) => {
				return (
				<div className="tag">
					<span>{tag}</span>
					<button 
					className="deleteButton"
					onClick={() => removeTag(tagI)}
					>x</button>
				</div>
				)
			})}
			<input placeholder="Enter recipients..."></input>
		</div>
	)
}

export default EmailInput
