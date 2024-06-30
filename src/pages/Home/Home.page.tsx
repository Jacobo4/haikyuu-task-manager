import TaskCard from "../../components/TaskCard/TaskCard.component.tsx";
import AddTaskDialog from "../../components/AddTaskDialog/AddTaskDialog.component.tsx";
import {useTasks} from "../../App.tsx";

function Home() {
    const {tasks, deleteTask} = useTasks();

    const tasksElements = tasks.map((task, index) => (<div key={index}>{TaskCard({...task, cbDelete: deleteTask})}</div>));
    return (
        <main>
            <h1>Home</h1>
            {tasksElements}
            < AddTaskDialog/>
        </main>
    )
}

export default Home;