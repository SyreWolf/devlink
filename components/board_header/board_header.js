import UsersDisplay from '../users_display/users_display';
import Dropdown from '../dropdown/dropdown'
import { SingleSelect } from "../select/select"
import { VscTag, VscAdd } from "react-icons/vsc"
//Import of Board Header Component styles storage
import { BoardHeaderStyles, tagDropdownValues, columnDropdownValues, usersDropdownValues } from "./board_header.config";

const BoardHeader = ({ data, users, toggle, change, submit, state, values, styles = BoardHeaderStyles }) => {

  let userData = Object.keys(users).filter(user => !Object.keys(data.users).includes(user)).map(user => {
    return { label: users[user].name, value: users[user].id };
  })

  //This constant stores the styles of all the elements of the Dropdown Component
  let tagDropdownValues = [
    { type: 'color', change: 'tag_color', value: values.tag_color },
    { type: 'add_text', change: 'tag_name', value: values.tag_name, placeholder: 'Name new tag...', submit: 'tags' },
    { type: 'delete_list', data: data.tags, submit: 'delete_tag' }
  ]

  //This constant stores the styles of all the elements of the Dropdown Component
  let columnDropdownValues = [
    { type: 'text', change: 'column', value: values.column, placeholder: 'Name your column...' },
    { type: 'buttons', submit: 'column', toggle: 'column' }
  ]

  //This constant stores the styles of all the elements of the Dropdown Component
  let usersDropdownValues = [
    { type: 'add_select', change: 'user', value: values.user, data: userData, submit: 'user' },
    { type: 'delete_list', data: data.users, submit: 'delete_user' }
  ]

	return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{data.name}</h1>
      <div className={styles.actions_block}>
        <div className="relative">
          <div onClick={() => toggle('tags')} className="flex flex-row justify-center items-center gap-x-2 cursor-pointer gap-x-2 text-[#edecf1] hover:drop-shadow-[0_0_2px_#edecf1] tracking-wider transition-all duration-300 ease-in-out">
            <VscTag className="text-md"/>
            <span className="text-sm font-normal">Manage tags</span>
          </div>
          <Dropdown active={state.tags} title={`Manage Tags`} values={tagDropdownValues} submit={submit} change={change} toggle={toggle}/>
        </div>
        <div className="relative"> 
          <div onClick={() => toggle('column')} className="flex flex-row justify-center items-center gap-x-2 cursor-pointer gap-x-2 text-[#edecf1] hover:drop-shadow-[0_0_2px_#edecf1] tracking-wider transition-all duration-300 ease-in-out">
            <VscAdd className="text-md"/>
            <span className="text-sm font-normal">Add column</span>
          </div>
          <Dropdown active={state.column} title={`New Column`} values={columnDropdownValues} submit={submit} change={change} toggle={toggle}/>
        </div>
        <div className="relative">
          <span onClick={() => toggle('users')} className="text-sm font-medium cursor-pointer text-[#edecf1] bg-transparent hover:bg-[#ffffff]/10 hover:border-[#edecf1] tracking-wider py-2 px-4 border-2 border-[#404144] rounded-md transition-all duration-300 ease-in-out relative">Share Board</span>
          <Dropdown active={state.users} title={`Change Users`} values={usersDropdownValues} submit={submit} change={change} toggle={toggle}/>
        </div>
      </div>
      <UsersDisplay users={data.users} limit={3}/>
    </div>
	);
};

export default BoardHeader; 