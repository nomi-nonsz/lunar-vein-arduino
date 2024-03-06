import { BoardControllerProvider } from "./contexts/BoardController";
import MainPage from "./pages/MainPage";
import "bootstrap-icons/font/bootstrap-icons.min.css";

function App () {
    return (
        <BoardControllerProvider>
            <MainPage />
        </BoardControllerProvider>
    )
}

export default App;