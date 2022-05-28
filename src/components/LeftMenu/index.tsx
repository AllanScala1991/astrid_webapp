import { Archive, HouseLine, IdentificationBadge, SignOut, Star } from "phosphor-react"
import "./index.css"

export function LeftMenu() {
    function redirectPage(url: string) {
        return window.location.href = url
    }

    function logout() {
        let isLogout = confirm("Deseja realmente sair do sistema ?")
        if(isLogout) {
            window.localStorage.clear()
            redirectPage("/")
        }
        
    }
    return (
        <div className="leftMenuContainer">
            <HouseLine size={32} color="#1AAE9F" className="icons" onClick={() => {redirectPage("/board")}}/>
            <Archive size={32} color="#1AAE9F" className="icons" onClick={() => {redirectPage("/archived")}}/>
            <Star size={32} color="#1AAE9F" className="icons" onClick={() => {redirectPage("/favorites")}}/>
            <IdentificationBadge size={32} color="#1AAE9F" className="icons" onClick={() => {redirectPage("/user")}}/>
            <SignOut size={32} color="#1AAE9F" className="icons" onClick={() => {logout()}}/>
        </div>
    )
}