import { constants } from 'os';
import React, { useEffect, useState } from 'react'
import {data} from '../data'
import './EmailInput.css'

// console.log(data)


const EmailInput = () => {
	const [emails, setEmails] = useState<string[]>([]);
	const [suggestions, setSuggestions] = useState<string[]>([])
	const [suggestionChosen, setSuggestionChosen] = useState(false)
	const [tags, setTags] = useState<string[]>([]);
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
	}

	const handleSuggestionClick = (e:React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		const li = e.target as HTMLElement
		const suggestion = li.innerText
		console.log(suggestion)
		setInput(suggestion)
		setSuggestionChosen(true)
	}

	const renderSuggestions = () => {
		return (
			<ul className="suggestions">
				{suggestions.length?suggestions.map((suggestion, i) => {
					return(
					<li
						onClick={handleSuggestionClick}
					>{suggestion}</li>
					)
				}):(<li>Email not found.</li>)
			}
			</ul>
		)	
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target 
		const trimmed = value.trim()
		setInput(trimmed)
		filterSuggestions(value)
		setSuggestionChosen(false)
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

	//used regex for validation from stackoverflow but would implement custom solution with backend check as well if in production.
	const validateEmail = (email: string): boolean => {
		const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
    return re.test(String(email).toLowerCase());
	}

	return (
		<div className="emailInput">
			{tags.map((tag, tagI) => {
				const isValid = validateEmail(tag)
				return (
				<div className={isValid?"tag": "tag invalid"} key={tagI}>
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
			{input.length && !suggestionChosen?renderSuggestions():""}
		</div>
	)
}

export default EmailInput
