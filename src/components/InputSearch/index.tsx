import { MagnifyingGlass } from 'phosphor-react'
import { Button } from '../Button'
import './index.css'

interface InputSearchProps {
    placeholder: string
    onChange: (value: string) => any
}

export function InputSearch(props: InputSearchProps) {
    return (
        <div className='searchInput'>
            <MagnifyingGlass size={22} className='icon' />
            <input 
                type="text" 
                placeholder={props.placeholder}
                onChange={event => {props.onChange(event.target.value)}}
            />
        </div>
    )
}