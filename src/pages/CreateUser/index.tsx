import { useState } from "react"
import { Button } from "../../components/Button"
import { InputEmail } from "../../components/InputEmail"
import { InputName } from "../../components/InputName"
import { InputPassword } from "../../components/InputPassword"
import { Title } from "../../components/Title"
import "./index.css"
import axios from "axios"
import { ENV } from "../../variables"
import { MessageModal } from "../../components/MessageModal"
import { Loading } from "../../components/Loading"

export function CreateUser() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState({
        title: "",
        titleBackgroundColor: "",
        description: "",
        method: () => {}
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleNameValue = (name: string) => {
        setName(name)
    }

    const handleEmailValue = (email: string) => {
        setEmail(email)
    }

    const handlePasswordValue = (password: string) => {
        setPassword(password)
    }

    const redirectLoginPage = () => {
        return window.location.href = "/"
    }

    const registerUser = async () => {
        setIsLoading(true)

        const createUser = await axios.post(`${ENV.BASE_URL}/user/create`, {
            name: name,
            email: email,
            password: password
        })

        setIsLoading(false)

        if(!createUser.data.status) {
            setMessage({
                title: "Ops !!",
                titleBackgroundColor: "#D3455B",
                description: createUser.data.message,
                method: () => {setShowMessage(false)}
            })

            setShowMessage(true)

            return
        }

        resetInputs()

        setMessage({
            title: "Sucesso !!",
            titleBackgroundColor: "#1AAE9F",
            description: createUser.data.message,
            method: () => {setShowMessage(false)}
        })

        setShowMessage(true)
    }

    const resetInputs = () => {
        setName("")
        setEmail("")
        setPassword("")
        document.querySelectorAll("input").forEach((item) => {
            if(item) item.value = ""
        })
    }

    return (
        <div className="createUserContainer">
            {
                isLoading ? <Loading /> : null
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
            
            <Title 
                color="rgba(0,0,0,0.8)"
                fontSize={5}
                text="Registrar Usuário"
            />

            <InputName 
                onChange={name => handleNameValue(name)}
            />

            <InputEmail 
                onChange={email => handleEmailValue(email)}
            />

            <InputPassword 
                onChange={password => handlePasswordValue(password)}
            />

            <Button 
                buttonText="Salvar"
                buttonTextColor="white"
                buttonBackground="#1AAE9F"
                buttonWidth={81}
                click={() => registerUser()}
            />

            <Button 
                buttonText="Voltar"
                buttonTextColor="white"
                buttonBackground="#D3455B"
                buttonWidth={81}
                click={() => redirectLoginPage()}
            />
        </div>
    )
}