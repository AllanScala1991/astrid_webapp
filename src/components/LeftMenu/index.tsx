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
            <div className="icons">
                <HouseLine size={32} color="#1AAE9F" onClick={() => {redirectPage("/board")}}/>Home
            </div>
            
            <div className="icons">
                <Archive size={32} color="#1AAE9F" onClick={() => {redirectPage("/archived")}}/>Arquivos
            </div>

            <div className="icons">
                <Star size={32} color="#1AAE9F" onClick={() => {redirectPage("/favorites")}}/>Favoritos
            </div>

            <div className="icons">
                <IdentificationBadge size={32} color="#1AAE9F" onClick={() => {redirectPage("/user")}}/>Perfil
            </div>

            <div className="icons">
                <SignOut size={32} color="#1AAE9F" onClick={() => {logout()}}/>Deslogar
            </div>
        </div>
    )
}