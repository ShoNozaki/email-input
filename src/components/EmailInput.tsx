import { constants } from 'os';
import React, { useEffect, useRef, useState } from 'react'
import {data} from '../data'
import './EmailInput.css'

const EmailInput = () => {
	const [emails, setEmails] = useState<string[]>([]);
	const [suggestions, setSuggestions] = useState<string[]>([])
	const [suggestionChosen, setSuggestionChosen] = useState(false)
	const [tags, setTags] = useState<string[]>([]);
	const [input, setInput] = useState("");

	//reference to easily set focus after events
	const inputRef = useRef<HTMLInputElement>(null)


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
		setInput(suggestion)
		setSuggestionChosen(true)
		inputRef.current?.focus()
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

	const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { key } = e
		if(key === "Enter" || key === "Tab"){
			addTag()
		}
	}

	const addTag = () => {
		if(input){
			setTags([...tags, input])
			setInput("")
			inputRef.current?.focus()
		}
	}
	const editTag = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, tagI: number) => {
		const tag = e.target as HTMLElement
		const text = tag.innerText
		setInput(text)
		removeTag(e, tagI)
	}

	const removeTag = ( e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>, tagI: number) => {
		e.stopPropagation()
		setTags(prevTags => prevTags.filter((tag, i) => i !== tagI))
		inputRef.current?.focus()
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
				<div 
				className={isValid?"tag": "tag invalid"} 
				key={tagI}
				onClick={(e) => editTag(e, tagI)}
				>
					<span>{tag}</span>
					<button 
					className="deleteButton"
					onClick={(e) => removeTag(e,tagI)}
					>x</button>
				</div>
				)
			})}
			<input 
			placeholder="Enter recipients..."
			value={input}
			onChange={onChange}
			onKeyUp={onKeyUp}
			ref={inputRef}
			/>
			{input.length && !suggestionChosen?renderSuggestions():""}
		</div>
	)
}

export default EmailInput
