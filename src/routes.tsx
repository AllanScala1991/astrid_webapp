import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import { Login } from "./pages/Login";
import { CreateUser } from "./pages/CreateUser";
import { BoardPage } from "./pages/Board";
import { Stage } from "./pages/Stage";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/create" element={<CreateUser />}/>
                <Route path="/board" element={<BoardPage />}/>
                <Route path="/stage/:id/:boardName" element={<Stage />}/>
            </Routes>
        </BrowserRouter>
    )
}