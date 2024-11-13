import MainCanvas from "./components/canvas/MainCanvas.tsx";
import GlobalHooks from "./components/GlobalHooks.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import AboutModal from "./components/navigation/modals/AboutModal.tsx";
import TopBar from "./components/navigation/TopBar.tsx";
import LeftSideBar from "./components/navigation/LeftSideBar.tsx";

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalHooks/>
            <MainCanvas/>
            <AboutModal/>
            <LeftSideBar/>
            <TopBar/>
        </ThemeProvider>
    )
}

export default App
