//Import of Tag Filter Component styles storage
import { TagFilterStyles } from "./tag_filter.config";

const TagFilter = ({ tags, tasks, selected, handleTagChange, styles = TagFilterStyles }) => {

	const getTaskWithTag = (tag) => {
    let counter = 0;
    Object.keys(tasks).map((task) => {
      if(tasks[task].tags.includes(tag)){
        counter++;
      }
    })
    return counter;
  }

	return (
		<div className={styles.wrapper}>
      <div className={styles.filters_block}>
        {Object.keys(tags).map((tag, index) => {
          return (
            <div key={`tag_${index}`} onClick={() => handleTagChange(tag)} className={`${selected === tag ? 'border-[#404144]' : 'border-transparent'} ${styles.filter}`}>
              <div style={{ backgroundColor: tags[tag].color }} className={styles.color_identifier}/>
              <span className={styles.filter_text_block}>
                <div className={styles.filter_label}>{tags[tag].name}</div>
                <div className={styles.filter_cards_info}>
                  {`${getTaskWithTag(tag)} active cards`}
                </div>
              </span>
            </div>
          );
        })}
      </div>
    </div>
	);
};

export default TagFilter; 