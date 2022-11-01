import { DragDropContext, Droppable, resetServerContext } from 'react-beautiful-dnd'
import Column from '../column/column'

const Board = ({ data, onDragEnd, selectedTag, search, toggleModal }) => {
	return (
		<DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-row justify-start items-start overflow-x-auto scroll-smooth mx-8 animate__animated animate__bounce animate__fadeIn delay-2"
          >
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const tempTasks = column.taskIds.map(taskId => data.tasks[taskId]);
              const taggedTasks = selectedTag !== '' ? tempTasks.filter(task => task.tags.includes(selectedTag)) : tempTasks;
              const tasks = search !== '' ? taggedTasks.filter(task => task.content.toLowerCase().includes(search)) : taggedTasks;

              return (
                <Column 
                  key={column.id} 
                  column={column} 
                  i={index} 
                  tasks={tasks}
                  toggleModal={toggleModal}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
	);
};

export default Board; 