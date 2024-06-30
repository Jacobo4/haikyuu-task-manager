import {Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react'
import {useState} from 'react'
import styles from './AddTaskDialog.component.module.css'
import {useTasks} from "../../App.tsx";
import BallSVG from "@assets/images/volleyball.svg?react";
import {motion} from "framer-motion";

function AddTaskDialog() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {addTask} = useTasks();
    const handleSubmit = (e) => {
        e.preventDefault();
        const values = Object.fromEntries(new FormData(e.target));
        addTask({
            id: Math.random().toString(36).substr(2, 9),
            ...values,
            status: 'Pending',
            isVisible: true
        });
        setIsOpen(false);
    }
    return (
        <>
            <motion.button
                className={styles['open-button']}
                onClick={() => setIsOpen(true)}
                animate={{
                    scale: [1, 2, 1],
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                }}
            >
                <span>飛べ</span>
                <BallSVG/>
            </motion.button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles['addTaskDialog']}>
                <DialogBackdrop className={styles['backdrop']}/>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.3}}>
                    <DialogPanel className={styles['dialog']}>
                        <h3>New task</h3>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" placeholder={"Write and awesome title..."}/>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" placeholder={"Write an awesome description..."}
                                      name="description"/>
                            <button type={"submit"}>Add</button>
                        </form>
                    </DialogPanel>
                </motion.div>
            </Dialog>
        </>
    )
}

export default AddTaskDialog;