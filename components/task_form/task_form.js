import { SingleSelectLabeled, MultiSelect } from "../select/select"
import { useBoardContext } from '../../contexts/board_context'
import { useState } from 'react'
import { FaTimes, FaPlus } from "react-icons/fa"
import { toast } from 'react-toastify';
//Import of Task Form Component styles storage
import { TaskFormStyles } from "./task_form.config";


function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


const TaskForm = ({ action, toggleModal, taskId, columnId, task, styles=TaskFormStyles }) => {
	const { data, addTask, editTask } = useBoardContext();

	const [taskForm, setTaskForm] = useState(
		{
			content: task === null ? '' : task.content,
			description: task === null ? '' : task.description,
			tags: [],
			members: task === null ? [] : 
				Object.keys(data.users).map((member) => {
			  	if(task.members.includes(member)){
			  		return { value: member, label: data.users[member].name }
			  	}
			  }).filter(member => member !== undefined),
			tags: task === null ? [] : 
				Object.keys(data.tags).map((tag) => {
			  	if(task.tags.includes(tag)){
			  		return { value: tag, label: data.tags[tag].name }
			  	}
			  }).filter(tag => tag !== undefined),
			source: task === null ? null : { 
				value: `${columnId}#${data.columns[columnId].taskIds.indexOf(taskId)}`, 
				label: `${data.columns[columnId].title} - ${data.columns[columnId].taskIds.indexOf(taskId)+1}º` 
			}, 
			destination: task === null ? { 
				value: `${columnId}#${data.columns[columnId].taskIds.length}`, 
				label: `${data.columns[columnId].title} - ${data.columns[columnId].taskIds.length+1}º` 
			} : null, 
			requirements: task === null ? [] : task.requirements,
			new_requirement: '',
			deadline: task === null ? '' : task.deadline,
		}
	);

  const getColumnPositions = (column, i) => {
  	let newPositions = [];

  	if(data.columns[column].taskIds.length <= 0)
      newPositions.push({ value: `${column}#0`, label: `${data.columns[column].title} - 1º` });

    data.columns[column].taskIds.map((task, index) => { 
    	if(task !== taskId)
      	newPositions.push({ value: `${column}#${index}`, label: `${data.columns[column].title} - ${(index+1).toString()}º` });

      if(data.columns[column].taskIds.length-1 === index && column !== columnId)
     		newPositions.push({ value: `${column}#${index+1}`, label: `${data.columns[column].title} - ${(index+2).toString()}º` });
    })

    return newPositions;
  }

  const deleteRequirement = (index) => { 
  	const newRequirements = [...taskForm.requirements];
  	newRequirements.splice(index, 1);
  	setTaskForm(taskForm => ({...taskForm, requirements: newRequirements})); 
  };

  const addRequirement = () => { 
  	if(taskForm.new_requirement.length > 0)
  		setTaskForm(taskForm => ({...taskForm, requirements: [...taskForm.requirements, { id: createGuidId(), name: taskForm.new_requirement }], new_requirement: '' })); 
  };
  

  const handleChange = (event, data_type = 'default') => { 
  	if(data_type === 'members' || data_type === 'destination' || data_type === 'tags'){
  	  setTaskForm(taskForm => ({...taskForm, [data_type]: event})); 
  	  return;
  	}

  	setTaskForm(taskForm => ({...taskForm, [event.target.id]: event.target.value})); 
  };

  const handleCancel = (event) => {
  	if(action === 'add'){
  		toggleModal('');
  		setTaskForm({}); 
  		return;
  	} 

  	toggleModal('view', taskId, columnId);
  	setTaskForm({}); 
  };

  const handleExceptions = (action) => { 
  	if(taskForm.content.length <= 0){
  	  toast(`Error de creación. La misión necesita tener un nombre.`);
  	  return false;
  	}
  	
  	if(action === 'edit' && taskForm.source == null){
  		toast(`Error de creación. La misión necesita una posición y columna.`);
  		return false;
  	}
  	
  	if(action === 'add' && taskForm.destination == null){
  		toast(`Error de creación. La misión necesita una posición y columna.`);
  		return false;
  	}
  	
  	return true;
  };

  const handleSubmit = () => { 
  	if(!handleExceptions(action)){
  		return;
  	}

  	toggleModal('');

  	if(action === 'add'){
  		addTask(taskForm);
  		setTaskForm({}); 
  		return;
  	}

  	editTask(taskForm, taskId, columnId);
  	setTaskForm({}); 
  };

	return (
		<div className={styles.modal}>
      <div className={styles.modal_wrapper}>
        <div className={styles.info_block}>
	        <div className={styles.info_section_block}>
	          <div className={styles.col_12}>
	            <label title="Title" className={styles.label}>Title*</label>
	            <input id="content" type="text" placeholder="Task title..." autoComplete="off" className={styles.input_text} onChange={handleChange} value={taskForm.content}/>
	          </div>
	          <div className={styles.col_12}>
	            <label title="Description" className={styles.label}>Description</label>
	            <textarea id="description" placeholder="Task description..." autoComplete="off" className={`${styles.input_text} h-[50px] resize-none`} onChange={handleChange} value={taskForm.description}/>
	          </div>
	          <div className={styles.requirements_block}>
		          <span className={`w-full`}>
		          	<div className={styles.label} title="Requirements">Requirements</div>
		          	<div className={`flex flex-row gap-x-2`}>
		          		<input id="new_requirement" type="text" onChange={handleChange} value={taskForm.new_requirement} placeholder="New requirement..." autoComplete="off" className={`${styles.input_text} w-[95%] mr-5`}/>
		          		<span onClick={addRequirement} className={styles.new_requirement_icon}><FaPlus/></span>
		          	</div>
		          </span>
		          <ul className={styles.requirements_wrapper}>
		            {taskForm.requirements.map((requirement, index) => {
		              return (
		                <li key={index} className={styles.requirement}>
		                  <span onClick={() => deleteRequirement(index)} id={requirement.id} className={styles.delete_requirement_icon}><FaTimes className={`pointer-events-none`}/></span>
		                  <span className={styles.requirement_text}>{requirement.name}</span>
		                </li>
		              );
		            })}
		          </ul>
		        </div>
	        </div>
	        <div className={styles.date_select_wrapper}>
	          {action !== 'add' && (
	          	<div>
				      	<label title="Deadline" className={styles.label}>
				        	Column and position*
				        </label>
		          	<SingleSelectLabeled 
			          	changeFunc={(event) => handleChange(event, 'destination')} 
			          	value={taskForm.destination === null ? taskForm.source : taskForm.destination} 
			          	id={`destination`} 
			          	data={data.columnOrder.map((column, i) => {
			          				return {
			          						label: data.columns[column].title, 
			          						value: data.columns[column].id,
			          						options: getColumnPositions(column, i)
			          				};
			          		})} 
		          	/>
		          </div>
		        )}
			      <div className={`relative`}>
			        <label title="Deadline" className={styles.label}>
			        	Deadline
			        </label>
							<input id={`deadline`} title={`Deadline`} className={styles.date_input} type="date" onChange={handleChange} value={taskForm.deadline}/>
			      </div>
			      <div>
			      	<label title="Deadline" className={styles.label}>
			        	Members
			        </label>
		          <MultiSelect 
								changeFunc={(event) => handleChange(event, 'members')} 
								value={taskForm.members} 
								id={`members`} 
								data={Object.keys(data.users).map((member) => { return {value: member, label: data.users[member].name} })} 
							/>
						</div>
						<div>
							<label title="Deadline" className={styles.label}>
			        	Tags
			        </label>
							<MultiSelect 
								changeFunc={(event) => handleChange(event, 'tags')} 
								value={taskForm.tags} 
								id={`tags`} 
								data={Object.keys(data.tags).map((tag) => { return {value: tag, label: data.tags[tag].name} })} 
							/>
						</div>
					</div>
        </div>
        <div className={styles.buttons_wrapper}>
		      <button onClick={handleSubmit} className={styles.button}>
		      	{action === 'add' ? 'Add Task' : 'Apply Changes'}
		      </button>
		      <button onClick={handleCancel} className={styles.button}>
		      	Cancel
		      </button>
		    </div>
      </div>
    </div>
	);
};

export default TaskForm; 