import MainCanvas from "./components/canvas/MainCanvas.tsx";
import GlobalHooks from "./components/GlobalHooks.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import AboutModal from "./components/navigation/modals/AboutModal.tsx";
import TopBar from "./components/navigation/TopBar.tsx";
import LeftSideBar from "./components/navigation/LeftSideBar.tsx";
import RightSideBar from "./components/navigation/RightSideBar.tsx";

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
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                }}
            >
                <TopBar/>
                {/*<BottomBar />*/}
                <LeftSideBar/>
                <RightSideBar/>
            </div>
        </ThemeProvider>
    )
}

export default App
