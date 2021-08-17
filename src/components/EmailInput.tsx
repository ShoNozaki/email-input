import { constants } from 'os';
import React, { useEffect, useState } from 'react'
import {data} from '../data'
import './EmailInput.css'

// console.log(data)


const EmailInput = () => {
	const [emails, setEmails] = useState<string[]>([]);
	const [suggestions, setSuggestions] = useState<string[]>([])
	const [tags, setTags] = useState(["theresa@outlook.com", "erictaylor"]);
	const [input, setInput] = useState("");

	useEffect(() => {
		//fetching on home for mock api call
		fetch('/')
			.then(() => {
				setEmails(data)
				setSuggestions(data)
			})
	}, [])

	const filterSuggestions = (value: string) => {
		let newSuggestions = emails.filter(email => email.includes(value))
		setSuggestions(newSuggestions)
		console.log(suggestions)
	}

	const renderSuggestions = () => {
		return (
			<ul className="suggestions">
				{suggestions.map((suggestion, i) => {
					return(
					<li>{suggestion}</li>
					)
				})}
			</ul>
		)	
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target 
		const trimmed = value.trim()
		setInput(trimmed)
		filterSuggestions(value)
	}

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { key } = e
		if(key === "Enter" || key === "Tab"){
			addTag()
		}
	}

	const addTag = () => {
		if(input){
			setTags([...tags, input])
			setInput("")
		}

	}

	const removeTag = (tagI: number) => {
		setTags(prevTags => prevTags.filter((tag, i) => i !== tagI))
	}
  

	return (
		<div className="emailInput">
			{tags.map((tag, tagI) => {
				return (
				<div className="tag" key={tagI}>
					<span>{tag}</span>
					<button 
					className="deleteButton"
					onClick={() => removeTag(tagI)}
					>x</button>
				</div>
				)
			})}
			<input 
			placeholder="Enter recipients..."
			value={input}
			onChange={onChange}
			onKeyDown={onKeyDown}
			/>
			{input.length?renderSuggestions():""}
		</div>
	)
}

export default EmailInput
