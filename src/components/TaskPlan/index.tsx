import { Pencil, Trash } from 'phosphor-react'
import './index.css'

interface TaskPlanProps {
    title: string
    taskTotal: string
    tasks: Tasks[]
    deleteClick: any
    createTaskClick: any
    stageId: any
    openTask: (task: any) => any
    editTask: (stageId: any) => any
}

interface Tasks {
    stageId: string
    name: string
    id: string
}

export function TaskPlan(props: TaskPlanProps) {
    return (
        <div className="plan">
            <div className="planHeader">
                <div className="titlePlan">
                    <span className="title">{props.title}</span>
                </div>

                <div className="deleteButtonContainer">
                    <Pencil 
                        size={22} 
                        color="white" 
                        cursor={"pointer"} 
                        weight="fill"
                        className='taskPlanIcons'
                        onClick={() => props.editTask(props.stageId)}
                    />

                    <Trash 
                        size={22} 
                        color="#D3455B" 
                        cursor={"pointer"} 
                        weight="fill"
                        className='taskPlanIcons'
                        onClick={() => props.deleteClick()}
                    />
                </div>

                <div className="totalPlan">
                    <span className="total">{props.taskTotal ? props.taskTotal :  "0"}</span>
                </div>
            </div>

            <div className="planBody">
                <>
                    {
                        props.tasks != undefined ?
                            props.tasks.map(task => {
                                return <div key={task.id} onClick={() => props.openTask(task)} className="tasks">{task.name}</div>
                            })
                        :
                            null
                    }
                </>
                
            </div>

            <button 
                className="planButtonAdd"
                onClick={() => props.createTaskClick()}
            >+ Adicionar Tarefa</button>
        </div>
    )
}