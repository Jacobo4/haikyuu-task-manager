import {useTasks} from "../../App.tsx";
import styles from './Header.layout.module.css';

function Header() {
    const {tasks, filterTasksByTitle} = useTasks();
    let timeoutId; // Step 1: Declare a variable to hold the timeout ID

    const searchTasks = (e) => {
        const {value} = e.target;
        clearTimeout(timeoutId); // Step 2: Clear the previous timeout
        timeoutId = setTimeout(() => {
            console.log('searchTasks', value)
            filterTasksByTitle(value);
        }, 500); // Step 3: Set a new timeout

    }
    return (
        <header className={styles['Header']}>
            <div className={styles['Logo']}>
                <a href="https://haikyu.jp/comics/">ハイキュー！！</a>
            </div>

            <div className={styles['Search']}>
                <input
                    type="text"
                    placeholder="Search tasks..."
                    onChange={searchTasks}
                />
            </div>
        </header>
    )
}

export default Header;
