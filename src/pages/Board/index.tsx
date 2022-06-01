import { useEffect, useState } from "react"
import { AddBoardButton } from "../../components/AddBoardButton"
import { Board } from "../../components/Board"
import { CreateModal } from "../../components/CreateModal"
import { InputSearch } from "../../components/InputSearch"
import { LeftMenu } from "../../components/LeftMenu"
import { Title } from "../../components/Title"
import "./index.css"
import axios from "axios"
import { ENV } from "../../variables"
import { MessageModal } from "../../components/MessageModal"
import { Loading } from "../../components/Loading"

export function BoardPage() {
    const [createBoard, setCreateBoard] = useState(false)
    const [boards, setBoards] = useState([])
    const [boardUpdate, setBoardUpdate] = useState(false)
    const [boardName, setBoardName] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState({
        title: "",
        titleBackgroundColor: "",
        description: "",
        method: () => {}
    })
    const [searchValue, setSearchValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function createNewBoard(name: string) {
        try {
            setIsLoading(true)

            const userId = window.localStorage.getItem("userId")
            const token = window.localStorage.getItem("token")

            const create = await axios({
                method: 'post',
                url: `${ENV.BASE_URL}/create/board`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    name: name,
                    userId: userId 
                }
            })

            setIsLoading(false)

            setShowMessage(true)
            setCreateBoard(false)

            create.data.status ?
                setMessage({
                    title: "Sucesso !!",
                    titleBackgroundColor: "#1AAE9F",
                    description: create.data.message,
                    method: () => {setShowMessage(false)}
                })
            :
                setMessage({
                    title: "Ops !!",
                    titleBackgroundColor: "#D3455B",
                    description: create.data.message,
                    method: () => {setShowMessage(false)}
                })
            
            setBoardName("")
            setBoardUpdate(true)

        } catch (error) {
            setMessage({
                title: "Ops !!",
                titleBackgroundColor: "#D3455B",
                description: error as string,
                method: () => {setShowMessage(false)}
            })
        }
    }

    function authenticated(search: any) {
        if(!search.data.status) {
            setShowMessage(true)
            setMessage({
                title: "Ops !!",
                titleBackgroundColor: "#D3455B",
                description: search.data.message,
                method: () => {setShowMessage(false); window.location.href = "/"}
            })
            window.localStorage.clear()
            return
        }
    }

    async function openBoard(boardId: string, boardName: string) {
        window.location.href = `/stage/${boardId}/${boardName}`
        return 
    }

    useEffect(() => {
        try {
            setIsLoading(true)

            const fetchData = async () => {
                const userId = window.localStorage.getItem("userId")
                const token = window.localStorage.getItem("token")
                const getBoards = await axios({
                    method: "get",
                    url: `${ENV.BASE_URL}/find/board/${userId}`,
                    headers : {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setIsLoading(false)

                authenticated(getBoards)
                setBoardUpdate(false)
                setBoards(getBoards.data.data)
            }

            fetchData()

        } catch (error) {
            console.log(error)
        }
    }, [boardUpdate])

    useEffect(() => {
        try {
            setIsLoading(true)

            const userId = window.localStorage.getItem("userId")
            const token = window.localStorage.getItem("token")

            const fetchData = async () => {
                 const search =  await axios({
                    method: "get",
                    url: `${ENV.BASE_URL}/find/board/name/${searchValue != "" ? searchValue : "all"}/${userId}`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setIsLoading(false)

                authenticated(search)
                setBoards([])
                setBoards(search.data.data)

                
            }
            fetchData()
        } catch (error) {
            setShowMessage(true)
            setMessage({
                title: "Ops !!",
                titleBackgroundColor: "#D3455B",
                description: error as string,
                method: () => {setShowMessage(false)}
            })
        }
    }, [searchValue])

    return (
        <div className="boardContainer">
            {
                isLoading ? <Loading /> : null
            }

            {
                createBoard ?
                    <CreateModal 
                        title="Criar Novo Board"
                        inputTitle="Board"
                        inputPlaceholder="Digite o nome do board"
                        buttonText="Criar"
                        inputNameOnChange={(name: string) => setBoardName(name)}
                        createMethod={() => {createNewBoard(boardName)}}
                        closeModalMethod={() => {setCreateBoard(false)}}
                    />
                :
                    null

            }

            {
                showMessage ?
                <MessageModal 
                    title= {message.title}
                    titleBackgroundColor={message.titleBackgroundColor}
                    description={message.description}
                    method={message.method}
                />
            :
                null
            }

            <LeftMenu />
            <div className="rightMenu">
                <div className="header">
                    <div className="box" style={{justifyContent: 'left', paddingLeft: '2vh'}}>
                        <Title 
                            text="Boards"
                            fontSize={4}
                            color={"rgb(50,50,50)"}
                        />
                    </div>

                    <div className="box" style={{justifyContent: 'right', paddingRight: '10vh'}}>
                        <InputSearch 
                            placeholder="Digite o nome do board"
                            onChange={search => {setSearchValue(search)}}
                        />
                    </div>
                    
                </div>
                
                <div className="content">
                    <>
                        <AddBoardButton 
                            click={() => {setCreateBoard(true)}}
                        />
                        {   boards != undefined ?
                                boards.map((board: any) => {
                                    return <Board 
                                        backgroundColor="#1AAE9F"
                                        boardName={board.name}
                                        method={() => {openBoard(board.id, board.name)}}
                                        key={board.id}
                                    />
                                })
                            :
                                null
                        }
                    </>
                </div>
            </div>
        </div>
    )
}
