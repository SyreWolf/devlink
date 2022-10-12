import Image from 'next/image'
import { useBoardContext } from '../../contexts/board_context'
import { useState } from 'react'
import { FaSpinner, FaPen, FaCheck, FaTimes, FaUser, FaTrash } from "react-icons/fa"
//Import of Task Details Component styles storage
import { TaskDetailsStyles } from "./task_details.config";

const TaskDetails = ({ toggleModal, taskId, columnId, task, styles=TaskDetailsStyles }) => {
	const { data, deleteTask, finishTask, checkRequirement } = useBoardContext();

  const handleFinishTask = () => {
    toggleModal('');
    finishTask(taskId, columnId, task.state);
  };

	const handleDeleteTask = () => {
    toggleModal('');
    deleteTask(taskId, columnId);
  };

  const handleCheckRequirement = (event) => checkRequirement(taskId, index, !event.target.checked);

	return (
		<div className={styles.modal}>
      <div className={styles.modal_wrapper}>
        <div className={styles.info_block}>
          <div className={styles.main_info_wrapper}>
            {task.tags.length > 0 &&
              <div className={styles.tags_wrapper}>
                {task.tags.map((tag, index)=>{
                  return <div key={`task_${task.id}_tag_${index}`} style={{ backgroundColor: data.tags[tag].color }} className={styles.tag}/>;
                })}
              </div>
            }
            <h3 className={`${styles.text_title} ${styles.text_gray}`}>{task.content}</h3>
            <div className={styles.details_wrapper}>
              <span className={`${styles.text_basis} ${styles.text_darkgray}`}>
                in column "{data.columns[columnId].title}"
              </span>
              {task.deadline !== '' && <div className={styles.date_wrapper}>
                <div className={styles.date_inner_wrapper}>
                  <span className={`${styles.text_basis} ${styles.text_darkgray}`}>
                    Deadline: {`${task.deadline.split('-')[2]}/${task.deadline.split('-')[1]}/${task.deadline.split('-')[0]}`}
                  </span>
                </div>
              </div>}
            </div>
          </div>
          {task.members.length > 0 &&
            <div className={styles.members}>
              {task.members.map((member, index) => {
                return (
                  <span key={`task_${task.id}_member_${index}`} className={styles.member}>
                    <Image src={data.users[member].img} width={30} height={30} className={styles.member_image}/>
                  </span>
                );
              })}
            </div>
          }
          <div className={styles.info_section_block}>
            <div className={styles.info_section_wrapper}>
              <span className={styles.text_subtitle}>
                Description
              </span>
              <span className={`${styles.text_darkgray} ${styles.text_normal}`}>
                {task.description === '' ? 'No descripción for the moment' : task.description}
              </span>
            </div>
            <div className={styles.info_section_wrapper}>
              <span className={styles.text_subtitle}>
                Requirements
              </span>
              <ul className={styles.requirements_wrapper}>
                {task.requirements.map((requirement, index) => {
                  return (
                    <li key={index} className={styles.requirement}>
                      <label>{requirement.name}</label>
                    </li>
                  );
                })}
                {task.requirements.length <= 0 ? <span className={`${styles.requirement} ml-[-1rem]`}>No requirements for the moment</span> : null}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.actions_wrapper}>
          <FaTimes onClick={() => toggleModal('')} className={`${styles.text_gray} ${styles.cross_basis}`}/>
          <div className={styles.buttons_wrapper}>
            <div onClick={() => toggleModal('edit', taskId, columnId)} className={styles.button}>Edit task</div>
            <div onClick={handleDeleteTask} className={styles.button}>Delete task</div>
          </div>
        </div>
      </div>
    </div>
	);
};

export default TaskDetails; 