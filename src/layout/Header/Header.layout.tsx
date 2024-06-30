// Hooks
import {useTasks} from "@root/App.tsx";
// Styles
import styles from './Header.layout.module.css';

function Header() {
    const {filterTasksByTitle} = useTasks();

    // Way to prevent the search from being triggered on every keystroke, but only after the user has stopped typing (500ms)
    let timeoutId; // Step 1: Declare a variable to hold the timeout ID
    const searchTasks = (e):void => {
        const {value} = e.target;
        clearTimeout(timeoutId); // Step 2: Clear the previous timeout
        timeoutId = setTimeout(() => {
            filterTasksByTitle(value);
        }, 500); // Step 3: Set a new timeout
    }
    return (
        <header className={styles['header']}>

            <div className={styles['logo']}>
                <a href="https://haikyu.jp/comics/">ハイキュー！！</a>
            </div>

            <div className={styles['search']}>
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
