import Image from 'next/image'
//Import of Users Display Component styles storage
import { UsersDisplayStyles } from "./users_display.config";

const UsersDisplay = ({ users, limit = 3, styles = UsersDisplayStyles }) => {

	return ( 
    <div className={styles.wrapper}>
      {Object.keys(users).length === 0 && <span className={styles.no_users_text}>No members at the moment</span>}
      {Object.keys(users).filter((item, i) => i < limit).map((user, index) => {
        return (
          <span key={`user_${index}`} className={styles.user}>
            <Image src={users[user].img} width={30} height={30} className="rounded-full"/>
          </span>
        );
      })}
      {Object.keys(users).length > limit && 
        <span className={styles.extra_users_text}>
          {`${Object.keys(users).length - limit} More`}
        </span>
      }
    </div>
	);
};

export default UsersDisplay; 