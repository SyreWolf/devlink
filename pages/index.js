import { useBoardContext } from '../contexts/board_context'
import TaskDetails from '../components/task_details/task_details'
import TaskForm from '../components/task_form/task_form'
import TagFilter from '../components/tag_filter/tag_filter'
import BoardHeader from '../components/board_header/board_header'
import Board from '../components/board/board'
import { useState } from 'react'


const Devlink = (props) => {
  const { data, users, search, addBoardMember, deleteBoardMember, reorderColumns, addNewColumn, addNewTag, deleteTag } = useBoardContext();

  const [dropdownState, setDropdownState] = useState({ users: false, column: false, tags: false });
  const [dropdownValues, setDropdownValues] = useState({ user: null, column: '', tag_name: '', tag_color: '#ffffff' });

  const [modal, setModal] = useState({state: '', taskId: '', columnId: ''});
  const [selectedTag, setSelectedTag] = useState('');


  const onDragEnd = (result) => reorderColumns(result);

  const handleDropdownToggle = (field) => {
    const newState = {...dropdownState};
    Object.keys(newState).map(state => {
      if(state === field){
        newState[state] = !newState[state];
      }else{
        newState[state] = false;
      }
    })
    setDropdownState({...newState});
    setDropdownValues({ user: null, column: '', tag_name: '', tag_color: '#ffffff' });
  };

  const handleDropdownChange = (event, field) => {
    if(field === 'user'){
      setDropdownValues({...dropdownValues, [field]: event });
      return ;
    }

    setDropdownValues({...dropdownValues, [field]: event.target.value });
  };

  const handleDropdownSubmit = (field, value) => {
    if(field === 'tags'){
      addNewTag(dropdownValues.tag_name, dropdownValues.tag_color);
      setDropdownValues({ ...dropdownValues, tag_name: '', tag_color: '#ffffff' });
    }

    if(field === 'delete_tag'){
      deleteTag(value);
    }

    if(field === 'column'){
      addNewColumn(dropdownValues.column);
      handleDropdownToggle(field);
    }

    if(field === 'user'){
      addBoardMember(dropdownValues.user);
      setDropdownValues({ ...dropdownValues, user: null });
    }

    if(field === 'delete_user'){
      deleteBoardMember(value);
    }
  };


  const toggleModal = (state, taskId = '', columnId = '') => setModal({state: state, taskId: taskId, columnId: columnId});

  const handleTagChange = (tag) => {
    if(selectedTag === tag){
      setSelectedTag('')
      return;
    }
    
    setSelectedTag(tag);
  };

  return (
    <>
      {Object.keys(data.tags).length > 0 && (
        <TagFilter 
          tags={data.tags}
          tasks={data.tasks}
          selected={selectedTag}
          handleTagChange={handleTagChange}
        />
      )}
      <div className={`${Object.keys(data.tags).length > 0 ? 'w-[calc(100%-240px)]' : 'w-full'} h-full mt-8`}>
        <BoardHeader 
          data={data}
          users={users}
          toggle={handleDropdownToggle}
          change={handleDropdownChange}
          submit={handleDropdownSubmit}
          state={dropdownState}
          values={dropdownValues}
        />
        <Board 
          data={data}
          onDragEnd={onDragEnd}
          selectedTag={selectedTag}
          search={search}
          toggleModal={toggleModal}
        />
      </div>
      {(modal.state === 'edit' || modal.state === 'add') &&
        <TaskForm 
          action={modal.state}
          toggleModal={toggleModal}  
          taskId={modal.taskId} 
          columnId={modal.columnId}
          task={modal.state === 'edit' ? {...data.tasks[modal.taskId]} : null}
        />
      }
      {modal.state === 'view' &&
        <TaskDetails 
          toggleModal={toggleModal} 
          taskId={modal.taskId} 
          columnId={modal.columnId}
          task={{...data.tasks[modal.taskId]}}
        />
      }
    </>
  );
}

export default Devlink;
