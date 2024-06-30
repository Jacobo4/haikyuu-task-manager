import TaskCard from "../../components/TaskCard/TaskCard.component.tsx";
import AddTaskDialog from "../../components/AddTaskDialog/AddTaskDialog.component.tsx";
import {useTasks} from "../../App.tsx";
import styles from './Home.page.module.css';
function Home() {
    const {tasks} = useTasks();

    const pendingTasks = tasks.filter(task => task.status === 'Pending').map((pendingTask, i) => (
        <div key={pendingTask.id}>{<TaskCard initialValues={pendingTask}></TaskCard>}</div>));
    const onGoingTasks = tasks.filter(task => task.status === 'InProgress').map((onGoingTask, i) => (
        <div key={onGoingTask.id}>{<TaskCard initialValues={onGoingTask}></TaskCard>}</div>));
    const completedTasks = tasks.filter(task => task.status === 'Completed').map((completedTask, i) => (
        <div key={completedTask.id}>{<TaskCard initialValues={completedTask}></TaskCard>}</div>));

    // TODO: Search what is the difference between the two ways of calling TaskCard... damn!
    // const tasksElements = tasks.map((task, index) => (<div key={task.id}>{TaskCard({...task, cbDelete: deleteTask(task.id)})}</div>));
    return (
        <main className={styles['home']}>
            <h1>JUMP HIGHER!</h1>
            <div className={styles['status-wrapper']}>
                <div>
                    <h2>Pending</h2>
                    <div className={styles['status-section']}>
                        {pendingTasks.length > 0 && pendingTasks}
                    </div>
                </div>
                <div>
                    <h2>On going</h2>
                    <div className={styles['status-section']}>
                        {onGoingTasks.length > 0 && onGoingTasks}
                    </div>
                </div>
                <div>
                    <h2>Completed</h2>
                    <div className={styles['status-section']}>
                        {completedTasks.length > 0 && completedTasks}
                    </div>
                </div>
            </div>

            <AddTaskDialog/>
        </main>
    )
}

export default Home;