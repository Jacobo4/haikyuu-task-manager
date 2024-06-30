import TaskCard from "../../components/TaskCard/TaskCard.component.tsx";
import AddTaskDialog from "../../components/AddTaskDialog/AddTaskDialog.component.tsx";
import {useTasks} from "../../App.tsx";
import styles from './Home.page.module.css';
import BgSVG from "@assets/images/hinataBg.svg?react"
function Home() {
    const {tasks} = useTasks();


    const pendingTasks = tasks.filter(task => task.status === 'Pending').map((pendingTask, i) => (
        <div key={pendingTask.id}>{<TaskCard initialValues={pendingTask}></TaskCard>}</div>));
    const inProgressTasks = tasks.filter(task => task.status === 'InProgress').map((inProgressTask, i) => (
        <div key={inProgressTask.id}>{<TaskCard initialValues={inProgressTask}></TaskCard>}</div>));
    const completedTasks = tasks.filter(task => task.status === 'Completed').map((completedTask, i) => (
        <div key={completedTask.id}>{<TaskCard initialValues={completedTask}></TaskCard>}</div>));

    // TODO: Search what is the difference between the two ways of calling TaskCard... damn!
    // const tasksElements = tasks.map((task, index) => (<div key={task.id}>{TaskCard({...task, cbDelete: deleteTask(task.id)})}</div>));
    return (
        <main className={styles['home']}>
           <BgSVG className={styles['bg']}/>
            <h1>でも・・・まだ負けてないよ？</h1>
            <div className={styles['status-wrapper']}>
                <div>
                    <h2 className={'title'}>Pending</h2>
                    <div className={styles['status-section']}>
                        {pendingTasks.length > 0 ? pendingTasks: <span>No tasks pending 🥸</span>}
                    </div>
                </div>
                <div>
                    <h2>In progress</h2>
                    <div className={styles['status-section']}>
                        {inProgressTasks.length > 0 ? inProgressTasks: <span>Nothing to do? 🤨</span>}
                    </div>
                </div>
                <div>
                    <h2>Completed</h2>
                    <div className={styles['status-section']}>
                        {completedTasks.length > 0 ? completedTasks: <span>頑張って 🫡</span>}
                    </div>
                </div>
            </div>

            <AddTaskDialog/>
        </main>
    )
}

export default Home;