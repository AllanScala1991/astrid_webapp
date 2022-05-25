import axios from "axios"
import "./index.css"
import wallpaper from "../../../assets/kanban.jpeg"
import { Title } from "../../components/Title"
import { InputEmail } from "../../components/InputEmail"
import { InputPassword } from "../../components/InputPassword"
import { Button } from "../../components/Button"
import { Link } from "../../components/Link"
import { ENV } from "../../variables"
import { useEffect, useState } from "react"
import { MessageModal } from "../../components/MessageModal"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState({
        title: "",
        titleBackgroundColor: "",
        description: "",
        method: () => {}
    })

    const UserLogin = async () => {
        try {
            const login = await axios.post(`${ENV.BASE_URL}/login`, {
                email: email,
                password: password
            })

            if(!login.data.status) {
                setShowMessage(true)
                return setMessage({
                    title: "Ops !!",
                    titleBackgroundColor: "#D3455B",
                    description: login.data.message,
                    method: () => {setShowMessage(false)}
                })
            }

            const payload = login.data.token.split('.')[1]
            const userId = JSON.parse(window.atob(payload))

            window.localStorage.setItem("token", login.data.token)
            window.localStorage.setItem("userId", userId.id)
            window.localStorage.setItem("isLogged", "true")

            return window.location.href = "/board"

        } catch (error) {
            setShowMessage(true)
            setMessage({
                title: "Ops !!",
                titleBackgroundColor: "#D3455B",
                description: error as string,
                method: () => {setShowMessage(false)}
            })
        }
    }

    const handleEmailValue = (email: string) => {
        setEmail(email)
    }

    const handlePasswordValue = (password: string) => {
        setPassword(password)
    }

    const redirectCreateUserPage = () => {
        return window.location.href = "/create"
    }

    useEffect(() => {
        const isLogged = window.localStorage.getItem("isLogged")

        if(isLogged == "false" || isLogged == null) return

        window.location.href = "/board"
    }, [])

    return (
        <div className="loginContainer">

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

            <img src={wallpaper} alt="login wallpaper" className="loginWallpaper"/>

            <div className="loginInfoContainer">
                <Title text="Astrid" fontSize={8} color="rgba(0,0,0,0.8)"/>
                <InputEmail onChange={email => handleEmailValue(email)}/>
                <InputPassword onChange={password => handlePasswordValue(password)}/>
                <Button 
                    buttonText="Acessar" 
                    buttonTextColor="white"
                    buttonBackground="#1AAE9F"
                    buttonWidth={82}
                    click= {() => UserLogin()}
                />
                <Button 
                    buttonText="Registrar" 
                    buttonTextColor="white"
                    buttonBackground="#D3455B"
                    buttonWidth={82}
                    click= {() => {redirectCreateUserPage()}}
                />
                <Link text="Esqueceu sua senha?" linkText="Clique aqui" linkUrl="#"/>
            </div>
        </div>
    )
}