import Image from 'next/image'
import { useBoardContext } from '../../contexts/board_context'
import { VscAccount, VscPlay, VscPass } from "react-icons/vsc"
import { Draggable } from "react-beautiful-dnd";
//Import of Task Component styles storage
import { TaskStyles } from "./task.config";

const Task = ({ id, task, index, column, toggleModal, styles=TaskStyles }) => {
	const { data, finishTask } = useBoardContext();

	const inTime = () => {
		let today = new Date();
		let deadline = new Date(task.deadline);
		let todayFormat = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		let currentDate = new Date(todayFormat);

		return deadline > currentDate; 
	}

	const dateCheck = inTime();

	const handleClick = () => toggleModal('view', id, column);
	const handleDateClick = (event) => {
		finishTask(id);
		event.stopPropagation();
	};

	return (
		<Draggable index={index} draggableId={id} key={id}>
			{(provided, snapshot) => (
				<div ref={provided.innerRef} isDragging={snapshot.isDragging} key={`${id}_${index}`} {...provided.draggableProps} {...provided.dragHandleProps} className={styles.wrapper}>
					<div onClick={handleClick} className={styles.card_wrapper}>
						{task.tags.length > 0 &&
							<div className={styles.tags_wrapper}>
								{task.tags.map((tag, index)=>{
									return <div key={`task_${id}_tag_${index}`} style={{ backgroundColor: data.tags[tag].color }} className={styles.tag}/>;
								})}
							</div>
						}
						<div className={styles.title}>{task.content}</div>
						<div className={styles.description}>{task.description}</div>
						{task.deadline.length > 0 &&
							<div onClick={handleDateClick} className={`${styles.date} ${task.finished ? styles.date_finished : dateCheck ? styles.date_in_progress : styles.date_out_of_time}`}>
								<VscPlay className={styles.clock}/>
								<span>{task.deadline}</span>
							</div>
						}
						{task.requirements.length > 0 &&
							<div className={styles.requirements}>
								<VscPass className={styles.big_icon}/>
								<span>{task.requirements.length}</span>
							</div>
						}
						{task.members.length > 0 &&
							<div className={styles.members}>
								{task.members.filter((item, i) => i < 3).map((member, index) => {
									return (
										<span key={`task_${task.id}_member_${index}`} className={styles.member}>
											<Image src={data.users[member].img} width={30} height={30} className={styles.member_image}/>
										</span>
									);
								})}
								{task.members.length > 3 && 
									<span className={styles.extra_member_text}>{`${task.members.length-3} More`}</span>
								}
							</div>
						}
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Task; 