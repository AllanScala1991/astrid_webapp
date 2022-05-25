import { Plus } from 'phosphor-react'
import './index.css'

interface AddBoardButtonProps {
    click: any
}

export function AddBoardButton(props: AddBoardButtonProps) {
    return (
        <div className="addBoardContainer" onClick={() => {props.click()}}>
            <Plus size={64} />
        </div>
    )
}