import Task from '../task/task'
import { useBoardContext } from '../../contexts/board_context'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'
import { VscEllipsis } from "react-icons/vsc"
//Import of Column Details Component styles storage
import { ColumnStyles } from "./column.config";

const Column = ({ column, i, tasks, toggleModal, styles=ColumnStyles }) => {
	const { deleteColumn } = useBoardContext();
	const [options, setOptions] = useState(false);

	const handleOptionsClick = () => setOptions(!options);
	const handleDeleteClick = () => deleteColumn(column.id);

	return (
		<Draggable draggableId={column.id} index={i}>
			{(provided) => (
				<div {...provided.draggableProps} ref={provided.innerRef} className={`${styles.wrapper} ${styles.spacer}`}>
					<div className={styles.title_wrapper}>
						<h3 {...provided.dragHandleProps} className={styles.title}>{column.title}</h3>
						<VscEllipsis onClick={handleOptionsClick} className={`${options ? 'rotate-0' : 'rotate-90'} ${styles.options_icon}`}/>
						<div className={`${options ? 'opacity-100 top-10 visible' : 'opacity-0 top-[-200px] invisible pointer-events-none'} ${styles.options_wrapper}`}>
							<div className={styles.options_title}>Column Options</div>
							<div className={styles.options_inner_wrapper}>
	              <span onClick={() => { toggleModal('add', '', column.id); setOptions(!options); }} className={styles.option}>Add Task</span>
	              <span onClick={handleDeleteClick} className={styles.option}>Delete Column</span>
              </div>
            </div>
					</div>
					<Droppable droppableId={column.id} type="task">
						{(provided, snapshot) => (
							<div {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver} className={styles.inner_wrapper}>
								{tasks.length > 0 && tasks.map((task, index) => {
						      return (
						        <Task key={`${column.id}_${task.id}`} id={task.id} task={task} index={index} column={column.id} toggleModal={toggleModal}/>
						      );
						    })}
						    {provided.placeholder}
						  </div>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	);
};

export default Column; 