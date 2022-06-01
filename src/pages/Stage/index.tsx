import axios from 'axios'
import { Pencil, Trash } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CreateModal } from '../../components/CreateModal'
import { CreateTaskModal } from '../../components/CreateTaskModal'
import { LeftMenu } from '../../components/LeftMenu'
import { Loading } from '../../components/Loading'
import { MessageModal } from '../../components/MessageModal'
import { TaskModal } from '../../components/TaskModal'
import { TaskPlan } from '../../components/TaskPlan'
import { Title } from '../../components/Title'
import { ENV } from '../../variables'
import './index.css'


export function Stage() {
    const boardId = useParams().id
    const boardName = useParams().boardName
    const [stages, setStages] = useState([])
    const [createVisible, setCreateVisible] = useState(false)
    const [stageName, setStageName] = useState("")
    const [stageId, setStageId] = useState("")
    const [createTaskVisible, setCreateTaskVisible] = useState(false)
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [taskPriority, setTaskPriority] = useState("")
    const [taskCurrentStage, setTaskCurrentStage] = useState("")
    const [taskAllInfo, setTaskAllInfo] = useState({
        id: "",
        name: "",
        description: "",
        urgency: "",
        stages: [],
        currentStage: ""
    })
    const [visibleTaskInfo, setVisibleTaskInfo] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState({
        title: "",
        titleBackgroundColor: "",
        description: "",
        method: () => {}
    })
    const [isLoading, setIsLoading] = useState(false)
    const [updateBoardModal, setUpdateBoardModal] = useState(false)
    const [newBoardName, setNewBoardName] = useState("")
    const [updateStageModal, setUpdateStageModal] = useState({status: false, stageId: ""})
    const [newStageName, setNewStageName] = useState("")

    const createStage = async (name: string) => {        
        setIsLoading(true)

        const token = window.localStorage.getItem('token')

        setCreateVisible(false)

        const boardCreate = await axios({
            method: "post",
            url: `${ENV.BASE_URL}/create/stage`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                name: name,
                boardId: boardId
            }
        })

        setIsLoading(false)

        setShowMessage(true)

        boardCreate.data.status ?
            setMessage({
                title: "Sucesso !!",
                titleBackgroundColor: "#1AAE9F",
                description: boardCreate.data.message,
                method: () => {setShowMessage(false)}
            })
        :
            setMessage({
                title: "Ops !!",
                titleBackgroundColor: "#D3455B",
                description: boardCreate.data.message,
                method: () => {setShowMessage(false)}
            })

        setStageName("")
        mountStages()
    }

    const deleteStage = async (stageId: string) => {
        setIsLoading(true)

        const token = window.localStorage.getItem("token")

        await axios({
            method: 'delete',
            url: `${ENV.BASE_URL}/delete/task/stage/${stageId}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        mountStages()
        
        const stageDelete = await axios({
            method: 'delete',
            url: `${ENV.BASE_URL}/delete/stage/${stageId}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        setIsLoading(false)

        setShowMessage(true)

        if(!stageDelete.status) {
            setMessage({
                title: "Ops !!",
                titleBackgroundColor: "#D3455B",
                description: stageDelete.data.message,
                method: () => {setShowMessage(false)}
            })

            return
        }

        setMessage({
            title: "Sucesso !!",
            titleBackgroundColor: "#1AAE9F",
            description: stageDelete.data.message,
            method: () => {setShowMessage(false)}
        })

        setStageName("")
        mountStages()
    }

    const deleteBoard = async () => {
        setIsLoading(true)

        const token = window.localStorage.getItem("token")

        const stages = await axios({
            method: 'get',
            url: `${ENV.BASE_URL}/find/stage/${boardId}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        for(let stage of stages.data.data) {
            await deleteStage(stage.id)
        }

        mountStages()

        await axios({
            method: 'delete',
            url: `${ENV.BASE_URL}/delete/board/${boardId}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        setIsLoading(false)

        return window.location.href = "/board"
    }

    const createNewTask = async (stageId: string) => {
        setIsLoading(true)

        const token = window.localStorage.getItem("token")

        const newTaskCreate = await axios({
            method: 'post',
            url: `${ENV.BASE_URL}/create/task`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                name: taskTitle,
                stageId: stageId,
                description: taskDescription,
                urgency: taskPriority
            }
        })

        setIsLoading(false)

        setShowMessage(true)

        if(newTaskCreate.data.status) {
            setMessage({
                title: "Sucesso !!",
                titleBackgroundColor: "#1AAE9F",
                description: newTaskCreate.data.message,
                method: () => {setShowMessage(false)}
            })

            setCreateTaskVisible(false)
            setTaskTitle("")
            setTaskDescription("")
            setTaskPriority("low")
            mountStages()
        } else {
            setMessage({
                title: "Ops !!",
                titleBackgroundColor: "#D3455B",
                description: newTaskCreate.data.message,
                method: () => {setShowMessage(false); setCreateTaskVisible(true)}
            })
        }
    }

    const deleteTask = async (taskId: string) => {
        setIsLoading(true)

        const token = window.localStorage.getItem("token")

        const taskDelete = await axios({
            method: 'delete',
            url: `${ENV.BASE_URL}/delete/task/${taskId}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        setIsLoading(false)

        setShowMessage(true)

        taskDelete.data.status ?
            setMessage({
                title: "Sucesso !!",
                titleBackgroundColor: "#1AAE9F",
                description: taskDelete.data.message,
                method: () => {setShowMessage(false)}
            })
        :
            setMessage({
                title: "Ops !!",
                titleBackgroundColor: "#D3455B",
                description: taskDelete.data.message,
                method: () => {setShowMessage(false)}
            })

        setVisibleTaskInfo(false)
        mountStages()
    }

    const updateTask = async (taskId: string) => {
        setIsLoading(true)

        const token = window.localStorage.getItem("token")

        const updateTaskCreate = await axios({
            method: 'put',
            url: `${ENV.BASE_URL}/update/task`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                name: taskTitle,
                taskId: taskId,
                description: taskDescription,
                urgency: taskPriority,
                currentStage: taskCurrentStage
            }
        })

        setIsLoading(false)

        setShowMessage(true)

        updateTaskCreate.data.status ?
            setMessage({
                title: "Sucesso !!",
                titleBackgroundColor: "#1AAE9F",
                description: updateTaskCreate.data.message,
                method: () => {setShowMessage(false)}
            })
        :
            setMessage({
                title: "Ops !!",
                titleBackgroundColor: "#D3455B",
                description: updateTaskCreate.data.message,
                method: () => {setShowMessage(false)}
            }) 
        
        setTaskTitle("")
        setTaskDescription("")
        setTaskPriority("")
        setTaskCurrentStage("")
        setVisibleTaskInfo(false)
        mountStages()
    }

    const mountStages = async () => {     
        const token = window.localStorage.getItem("token")
        if(token != null || boardId != null) {
            setIsLoading(true) 

            const allStages = await axios({
                method: "get",
                url: `${ENV.BASE_URL}/find/stage/${boardId}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            for(let stage of allStages.data.data) {
                const tasks = await axios({
                    method: "get",
                    url: `${ENV.BASE_URL}/find/task/stage/${stage.id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                stage.tasks = tasks.data.data
                stage.tasksTotal = `${tasks.data.data.length}`
            }
            
            setIsLoading(false)

            setStages(allStages.data.data)   
            return
        }
    }

    const openTask = async (task: any) => {
        setIsLoading(true)

        const token = window.localStorage.getItem("token")

        const allStages = await axios({
            method: "get",
            url: `${ENV.BASE_URL}/find/stage/${boardId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        let stagesNames: any = []

        for(let stage of allStages.data.data) {
            stagesNames.push(stage)
        }

        setIsLoading(false)

        setTaskAllInfo({
            id: task.id,
            name: task.name,
            description: task.description,
            urgency: task.urgency,
            stages: stagesNames,
            currentStage: task.stageId
        })
        setVisibleTaskInfo(true)
    }

    const boardNameUpdate = async (newName: string) => {
        setIsLoading(true)

        const token = window.localStorage.getItem("token")

        const isUpdateBoard = await axios({
            method: 'put',
            url: `${ENV.BASE_URL}/update/board`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                boardId: boardId,
                name: newName
            }
        })

        setIsLoading(false)

        if(isUpdateBoard.data.status) {
            return window.location.href = `/stage/${boardId}/${newName}`
        }else {
            setMessage({
                title: "Ops !!",
                titleBackgroundColor: "#D3455B",
                description: isUpdateBoard.data.message,
                method: () => {setShowMessage(false)}
            })

            setShowMessage(true)
        }
    }

    const stageNameUpdate = async (newName: string, stageId: string) => {
        setIsLoading(true)

        const token = window.localStorage.getItem("token")

        const isUpdateStage = await axios({
            method: 'put',
            url: `${ENV.BASE_URL}/update/stage`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                stageId: stageId,
                name: newName
            }
        })

        setIsLoading(false)

        if(isUpdateStage.data.status) {
            setIsLoading(true)
            await mountStages()
            setIsLoading(false)
            setUpdateStageModal({status: false, stageId: ""})
            setNewStageName("")
        }else {
            setUpdateStageModal({status: false, stageId: ""})
            setMessage({
                title: "Ops !!",
                titleBackgroundColor: "#D3455B",
                description: isUpdateStage.data.message,
                method: () => {setShowMessage(false)}
            })

            setShowMessage(true)
        }
    }

    useEffect(() => {
        mountStages()
    }, [])
    
    return (
        <div className="boardContainer">    
            {
                isLoading ? <Loading /> : null
            }

            {
                updateBoardModal ? 
                    <CreateModal 
                        title="Alterar Nome do Board"
                        inputTitle="Board"
                        inputPlaceholder="Digite o novo nome do board"
                        buttonText='Atualizar'
                        inputNameOnChange={(name: string) => setNewBoardName(name)}
                        createMethod={() => {boardNameUpdate(newBoardName)}}
                        closeModalMethod={() => {setUpdateBoardModal(false)}}
                    />
                : 
                    null
            }

            {
                updateStageModal.status ? 
                    <CreateModal 
                        title="Alterar Nome do Quadro"
                        inputTitle="Quadro"
                        inputPlaceholder="Digite o novo nome do quadro"
                        buttonText='Atualizar'
                        inputNameOnChange={(name: string) => setNewStageName(name)}
                        createMethod={() => {stageNameUpdate(newStageName, updateStageModal.stageId)}}
                        closeModalMethod={() => {setUpdateStageModal({status: false, stageId: ""})}}
                    />
                : 
                    null
            }

            {
                createVisible ? 
                    <CreateModal 
                        title='Criar Novo Quadro'
                        inputTitle='Nome'
                        inputPlaceholder='Digite o nome do quadro'
                        buttonText='Criar'
                        closeModalMethod={() => {setCreateVisible(false)}}
                        createMethod={() => {createStage(stageName)}}
                        inputNameOnChange={(name: string) => {setStageName(name)}}
                    />
                :
                    null
            }

            {
                showMessage ?
                    <MessageModal 
                        title={message.title}
                        description={message.description}
                        method={message.method}
                        titleBackgroundColor={message.titleBackgroundColor}   
                    />
                :
                    null
            }

            {
                createTaskVisible ?
                    <CreateTaskModal 
                        titleOnChange={(title: string) => setTaskTitle(title)}
                        descriptionOnChange={(description: string) => setTaskDescription(description)}
                        priorityOnChange={(priority: string) => setTaskPriority(priority)}
                        closeOnChange={() => setCreateTaskVisible(false)}
                        saveOnChange={() => {createNewTask(stageId)}}
                    />
                :
                    null

            }

            {
                visibleTaskInfo ?
                    <TaskModal 
                        title={taskAllInfo.name}
                        description={taskAllInfo.description}
                        urgency={taskAllInfo.urgency}
                        stage={taskAllInfo.stages}
                        currentStage={taskAllInfo.currentStage}
                        saveModifications={() => {updateTask(taskAllInfo.id)}}
                        deleteTask={() => {
                            const isDeleteTask = confirm("Deseja realmente excluir a tarefa ?")
                            if(isDeleteTask) deleteTask(taskAllInfo.id)
                        }}
                        closeModal={() => setVisibleTaskInfo(false)}
                        titleOnChange={(title: string) => setTaskTitle(title)}
                        descriptionOnChange={(description: string) => setTaskDescription(description)}
                        priorityOnChange={(priority: string) => setTaskPriority(priority)}
                        currentStageOnChange={(stage: string) => setTaskCurrentStage(stage)}
                    />
                :
                    null
            }

            <LeftMenu />

            <div className="rightMenu">

                <div className="header">
                    <Title 
                        text={boardName as string}
                        fontSize={4}
                        color={"rgb(50,50,50)"}
                    />
                    
                    <Pencil 
                        size={22} 
                        color="#1AAE9F" 
                        cursor={"pointer"} 
                        weight="fill"
                        className='stageDelete'
                        onClick={() => setUpdateBoardModal(true)}
                    />

                    <Trash 
                        size={22} 
                        color="#D3455B" 
                        cursor={"pointer"} 
                        weight="fill"
                        className='stageDelete'
                        onClick={() => {
                            const isDelete = confirm("Deseja realmente excluir o board ?")
                            if(isDelete) deleteBoard()
                        }}
                    />

                </div>

                <div className="planContainer">
                    <>
                        {
                            stages != undefined ?
                                stages.map((stage: any) => {
                                    return <TaskPlan 
                                        title={stage.name}
                                        taskTotal={stage.tasksTotal}
                                        tasks={stage.tasks}
                                        stageId={stage.id}
                                        editTask={(stageId: string) => {setUpdateStageModal({status: true, stageId: stageId})}}
                                        deleteClick={() => {
                                            const isDeleteStage = confirm("Deseja realmente excluir o quadro de tarefas ?")
                                            if(isDeleteStage)deleteStage(stage.id)
                                        }}
                                        createTaskClick={() => {setCreateTaskVisible(true); setStageId(stage.id)}}
                                        openTask={(task) => openTask(task)}
                                        key= {stage.id}
                                    />
                                })
                            :
                                null
                        }
                    </>

                    <button 
                        className="AddPlanButton"
                        onClick={() => {setCreateVisible(true)}}
                    >+ Adicionar Quadro</button>
                    
                </div>

            </div>
           
        </div>
    )
}