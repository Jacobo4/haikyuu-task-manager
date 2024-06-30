import {  Dialog, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import styles from './AddTaskDialog.component.module.css'
import {useTasks} from "../../App.tsx";
function AddTaskDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const {addTask} = useTasks();
  // console.log(tasks)
  const add = () => {
    addTask({
      id: Math.random().toString(36).substr(2, 9),
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
      status: 'Pending',
      isVisible: true
    });
    setIsOpen(false);
  }
  // TODO: Implement form logic to add a task
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles['AddTaskDialog']}>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel>
            <h3>Add task</h3>
            <div>
              <button onClick={()=> add()}>Add task</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default AddTaskDialog;