import initData from '../components/init_data/init_data'
import initUsers from '../components/init_data/init_users'
import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';

function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const BoardContext = createContext();

const BoardContextProvider = (props) => {
  const [data, setData] = useState(initData);
  const [users, setUsers] = useState(initUsers);
  const [search, setSearch] = useState('');

  const reorderColumns = (result) => {
    const { destination, source, draggableId, type } = result;

    if(!destination){
      return
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ){
      return
    }

    if(type === "column"){
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData({
        ...data, 
        columnOrder: newColumnOrder
      });

      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if(startColumn === finishColumn){
      const newTaskIds = Array.from(data.columns[source.droppableId].taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn= {
        ...data.columns[source.droppableId],
        taskIds: newTaskIds,
      };

      setData({
        ...data, 
        columns: {
          ...data.columns, 
          [newColumn.id]: newColumn 
        }
      });

      return;
    }

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStartColumn= {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinishColumn= {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    setData({
      ...data, 
      columns: {
        ...data.columns, 
        [newStartColumn.id]: newStartColumn, 
        [newFinishColumn.id]: newFinishColumn 
      }
    });
    
  }

  const addNewColumn = (columnTitle) => {
    if(columnTitle === ''){
      toast(`Please, add a valid column title`);
      return; 
    }

    let newId = createGuidId();
    let newColumnOrder = Array.from(data.columnOrder);
    newColumnOrder.splice(data.columnOrder.length, 0, newId);

    setData({
      ...data, 
      columnOrder: newColumnOrder,  
      columns: {
        ...data.columns,
        [newId]: {
          id: newId,
          title: columnTitle,
          taskIds: []
        }
      }
    });

    toast(`Column "${columnTitle}" added last`);
  };

  const addNewTag = (newTagName, newTagColor) => {
    if(newTagName.trim().length === 0){
      toast(`Please, add a valid tag title`);
      return; 
    }

    if(newTagColor.trim().length === 0){
      toast(`Please, add a valid tag color`);
      return; 
    }

    if(Object.keys(data.tags).length === 7){
      toast(`Sorry, you can't have more than 7 tags active. Delete a tag to add a new one.`);
      return; 
    }

    let newId = createGuidId();

    setData({
      ...data, 
      tags: {
        ...data.tags,
        [newId]: {
          id: newId,
          name: newTagName,
          color: newTagColor
        }
      }
    });

    toast(`Tag "${newTagName}" created`);
  };

  const deleteTag = (tagId) => {
    let newTasks = {...data.tasks};
    Object.keys(newTasks).map(task => {
      newTasks[task].tags.splice(newTasks[task].tags.indexOf(tagId), 1)
    })

    let newTags = {...data.tags};
    delete newTags[tagId];

    toast(`Tag "${data.tags[tagId].name}" deleted`);

    setData({
      ...data, 
      tasks: newTasks,
      tags: newTags
    });
  };

  const deleteColumn = (columnId) => {
    const newColumnOrder = Array.from(data.columnOrder);
    newColumnOrder.splice(data.columnOrder.indexOf(columnId), 1);

    let newColumns = {...data.columns};
    delete newColumns[columnId];

    toast(`Column "${data.columns[columnId].title}" deleted`);

    setData({
      ...data, 
      columnOrder: newColumnOrder,  
      columns: newColumns
    });
  };

  const changeSearchFilter = (searchText) => setSearch(searchText);

  const addBoardMember = (member) => {
    if(member !== null){

      setData({
        ...data, 
        users: {
          ...data.users,
          [member.value]: {
            ...users[member.value]
          }
        }
      });

      toast(`User "${member.label}" added to the board`);
    }
  };

  const deleteBoardMember = (memberId) => {
    const newUsers = {...data.users};
    const newTasks = {...data.tasks};

    delete newUsers[memberId];
      
    Object.keys(data.tasks).map(taskId => {
      newTasks[taskId].members.splice(newTasks[taskId].members.indexOf(memberId), 1);
    });

    setData({
      ...data, 
      users: newUsers,
      tasks: newTasks
    });

    toast(`User "${users[memberId].name}" deleted from the board`);
  };

  const addTask = (taskValues) => {
    let newId = createGuidId();
    const newDestinationPos = taskValues.destination.value.split('#');
    const newDestinationTaskIds = Array.from(data.columns[newDestinationPos[0]].taskIds);
    newDestinationTaskIds.splice(newDestinationPos[1], 0, newId);
    

    setData({
      ...data, 
      tasks: {
        ...data.tasks, 
        [newId]: {
          id: newId,
          content: taskValues.content,
          description: taskValues.description, 
          finished: false, 
          tags: taskValues.tags.map((tag) => { return tag.value}),
          members: taskValues.members.map((member) => { return member.value}), 
          requirements: taskValues.requirements, 
          deadline: taskValues.deadline 
        }
      },
      columns: {
        ...data.columns, 
        [data.columns[newDestinationPos[0]].id]: {
          ...data.columns[newDestinationPos[0]], 
          taskIds: newDestinationTaskIds
        }
      }
    });
      
    toast(`New task added`);
  };

  const editTask = (taskValues, taskId, columnId) => {
    const newDestinationPos = taskValues.destination === null ? 
      taskValues.source.value.split('#')
    :
      taskValues.destination.value.split('#')

    const newSourceTaskIds = Array.from(data.columns[columnId].taskIds);
    const newDestinationTaskIds = Array.from(data.columns[newDestinationPos[0]].taskIds);
    
    
    if(newDestinationPos[0] === columnId){
      newSourceTaskIds.splice(newSourceTaskIds.indexOf(taskId), 1);
      newSourceTaskIds.splice(newDestinationPos[1], 0, taskId);
      
      setData({
        ...data, 
        tasks: {
          ...data.tasks, 
          [data.tasks[taskId].id]: {
            ...data.tasks[taskId],
            content: taskValues.content,
            description: taskValues.description,  
            tags: taskValues.tags.length <= 0 ? [] : taskValues.tags.map((tag) => { return tag.value}), 
            members: taskValues.members.length <= 0 ? [] : taskValues.members.map((member) => { return member.value}), 
            requirements: taskValues.requirements
          }
        },
        columns: {
          ...data.columns, 
          [data.columns[columnId].id]: {
            ...data.columns[columnId], 
            taskIds: newSourceTaskIds
          }
        }
      });

      toast(`Task updated`);

    }else{
      newSourceTaskIds.splice(newSourceTaskIds.indexOf(taskId), 1);
      newDestinationTaskIds.splice(newDestinationPos[1], 0, taskId);

      setData({
        ...data, 
        tasks: {
          ...data.tasks, 
          [data.tasks[taskId].id]: {
            ...data.tasks[taskId],
            content: taskValues.content,
            description: taskValues.description,  
            members: taskValues.members.length <= 0 ? [] : taskValues.members.map((member) => { return member.value}), 
            requirements: taskValues.requirements,
          }
        },
        columns: {
          ...data.columns, 
          [data.columns[columnId].id]: {
            ...data.columns[columnId], 
            taskIds: newSourceTaskIds
          },
          [data.columns[newDestinationPos[0]].id]: {
            ...data.columns[newDestinationPos[0]], 
            taskIds: newDestinationTaskIds
          }
        }
      });

      toast(`Task updated`);

    }
    
  };

  const deleteTask = (taskId, columnId) => {
    let newTasks = {...data.tasks};
    delete newTasks[taskId];

    let newTaskIdsList = [...data.columns[columnId].taskIds];
    newTaskIdsList.splice(newTaskIdsList.indexOf(taskId), 1);

    setData({
      ...data, 
      tasks: newTasks,
      columns: {
        ...data.columns, 
        [data.columns[columnId].id]: {
          ...data.columns[columnId], 
          taskIds: newTaskIdsList
        }
      }
    });
        
    toast(`Task deleted`);
  };

  const finishTask = (taskId) => {

    setData({
      ...data, 
      tasks: {
        ...data.tasks, 
        [data.tasks[taskId].id]: {
          ...data.tasks[taskId],
          finished: !data.tasks[taskId].finished,
        }
      }
    });
        
    toast(`Task ${data.tasks[taskId].finished === true ? 'in progress' : 'completed'}`);
  };

  return (
    <BoardContext.Provider value={{data, users, search, addBoardMember, deleteBoardMember, addTask, editTask, deleteTask, finishTask, reorderColumns, addNewColumn, deleteColumn, changeSearchFilter, addNewTag, deleteTag}}>
      {props.children}
    </BoardContext.Provider>
  );
}

export const useBoardContext = () => useContext(BoardContext);

export default BoardContextProvider;