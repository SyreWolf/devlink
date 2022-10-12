import Image from 'next/image'
import { useBoardContext } from '../../contexts/board_context'
import { useState } from 'react'
import { headerStyles } from './header.config.js'
import { VscBell, VscGlobe, VscPin } from 'react-icons/vsc'

//This function generates the links of the Navbar Component => receives (styles) => returns the structure
const Header = ({ styles = headerStyles }) => {
  const { search, changeSearchFilter } = useBoardContext();

  const handleSearchText = (event) => changeSearchFilter(event.target.value.toLowerCase());

  //First checks if the current section is a link or a dropdown, then prints it. Repeats with each section
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_inner}>
        <div className={styles.logo_wrapper}>
          <span className={styles.logo}><Image src="/devlink.png" width={120} height={38}/></span>
          <input onChange={handleSearchText} type="search" value={search} placeholder="Looking for task..." className={styles.search_box}/>
        </div>
        <div className={styles.navbar_wrapper}>
          <VscBell className={styles.icon} title={`Aventuras`}/>
          <a className={styles.profile_wrapper}>
            <span className={styles.profile_label}>Hi Michael</span>
            <Image className={styles.profile_image} src="/michael.jpg" width={40} height={40}/>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
