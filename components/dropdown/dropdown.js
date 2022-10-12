import { SingleSelect } from "../select/select"
import { VscAdd, VscChromeClose } from "react-icons/vsc"
//Import of Dropdown Component styles storage
import { DropdownStyles } from "./dropdown.config";

//This function generates the info of the Member Card Component => receives (styles and render values) => returns the structure
const Dropdown = ({ active, title, values, submit, change, toggle, styles = DropdownStyles }) => {
  //Returns the structure
  return (
    <div className={`${active ? 'opacity-100 right-0 visible' : 'opacity-0 right-[-200px] invisible pointer-events-none'} ${styles.wrapper}`}>
      <div className={styles.title}>{title}</div>
      <div className={styles.elements_wrapper}>
        {values.map(block => {

          if(block.type === 'color'){
            return <input onChange={(event) => change(event, block.change)} type="color" className={`${styles.input} h-10`} value={block.value}/>; 
          }

          if(block.type === 'text'){
            return <input onChange={(event) => change(event, block.change)} type="text" className={styles.input} value={block.value} placeholder={block.placeholder}/>; 
          }

          if(block.type === 'add_text'){
            return (
              <div className={styles.add_block_wrapper}>
                <input onChange={(event) => change(event, block.change)} type="text" className={styles.input} value={block.value} placeholder={block.placeholder}/>
                <span onClick={() => submit(block.submit)} className={styles.add_button}><VscAdd/></span>
              </div>
            ); 
          }

          if(block.type === 'add_select'){
            return (
              <div className={styles.add_block_wrapper}>
                <SingleSelect changeFunc={(event) => change(event, block.change)} value={block.value} data={block.data} />
                <span onClick={() => submit(block.submit)} className={styles.add_button}><VscAdd/></span>
              </div>
            ); 
          }

          if(block.type === 'delete_list'){
            return (
              Object.keys(block.data).length > 0 && (
                <ul className={styles.list_wrapper}>
                  {Object.keys(block.data).map((elem, index) => {
                    return (
                      <li key={index} className={styles.list_elem}>
                        <span onClick={() => submit(block.submit, block.data[elem].id)} className={styles.delete_button}>
                          <VscChromeClose className={`pointer-events-none`}/>
                        </span>
                        <span className={styles.list_elem_name}>{block.data[elem].name}</span>
                      </li>
                    );
                  })}
                </ul>
              )
            ); 
          }

          if(block.type === 'buttons'){
            return (
              <div className={styles.buttons_wrapper}>
                <button onClick={() => submit(block.submit)} className={styles.button}>Confirm</button>
                <button onClick={() => toggle(block.toggle)} className={styles.button}>Cancel</button>
              </div>
            ); 
          }

        })}
      </div>
    </div>
  );
}

export default Dropdown;