// Core
import {createContext, useContext} from "react";
// Hooks
import {useProvideTasks} from "./hooks/useProvideTasks.hook.tsx";
// Styles
import '@globalStyles/styles.css';
// Pages and layout
import Layout from "./layout/layout.tsx";
import Home from "./pages/Home/Home.page.tsx";

const tasksContext = createContext();
export const useTasks = () => {
    return useContext(tasksContext);
}

function App() {
    const tasks = useProvideTasks();
    return (
            <tasksContext.Provider value={tasks}>
                <Layout>
                    <Home/>
                </Layout>
            </tasksContext.Provider>
    )
}

export default App
