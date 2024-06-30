import {useTasks} from "../../App.tsx";

function Header() {
    const {tasks, filterTasksByTitle} = useTasks();
    let timeoutId; // Step 1: Declare a variable to hold the timeout ID

    const searchTasks = (e) => {
        const {value } = e.target;
        clearTimeout(timeoutId); // Step 2: Clear the previous timeout
        timeoutId = setTimeout(() => {
            console.log('searchTasks', value)
            filterTasksByTitle(value);
        }, 500); // Step 3: Set a new timeout

    }
    return (
        <header className="flex justify-between items-center p-4">
            <img src="/logo.png" alt="Logo"/>
            <input
                type="text"
                placeholder="Search tasks..."
                className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                onChange={searchTasks}
            />
        </header>
    )
}

export default Header;
