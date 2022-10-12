import { sidebarStyles } from './sidebar.config.js'
import { VscCallOutgoing, VscMenu, VscGithubAlt, VscComment, VscCalendar, VscExtensions, VscFolder, VscMail, VscTools, VscCloudDownload } from 'react-icons/vsc'

//This function generates the links of the Navbar Component => receives (styles) => returns the structure
const Sidebar = ({ styles = sidebarStyles }) => {
  //First checks if the current section is a link or a dropdown, then prints it. Repeats with each section
  return (
    <div className={styles.wrapper}>
      <VscMenu className={styles.icon} title={`Aventuras`}/>
      <VscCallOutgoing className={styles.icon} title={`Mi perfil`}/>
      <VscComment className={styles.icon} title={`Log Out`}/>
      <VscCalendar className={styles.icon} title={`Mi perfil`}/>
      <VscMail className={styles.icon} title={`Log Out`}/>
      <VscFolder className={styles.icon} title={`Log Out`}/>
      <VscGithubAlt className={styles.icon} title={`Aventuras`}/>
      <VscExtensions className={styles.icon} title={`Log Out`}/>
      <VscTools className={styles.icon} title={`Log Out`}/>
      <VscCloudDownload className={`${styles.icon} mt-auto`} title={`Log Out`}/>
    </div>
  );
}

export default Sidebar;
