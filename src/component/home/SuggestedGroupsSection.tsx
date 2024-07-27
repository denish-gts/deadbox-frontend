import styles from './home.module.scss'
import MegFed from '../../../public/assets/images/megfed.png';
import Speedball from '../../../public/assets/images/speedball.png';
import Airsoft from '../../../public/assets/images/airsoft.png';
import Image from 'next/image';


const SuggestedGroupsSection = () => {
  return (
    <div className={styles.suggestedGroupsSection}>
      <div className={styles.header}>
        <h3>Suggested for you</h3>
        <a href="#" className={styles.viewAll}>VIEW ALL</a>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <div>
          <Image unoptimized height={0} width={0} src={Airsoft} alt="Group 1" />

          </div>
          <div>
          <p>Airsoft</p>
          <span>974 members • United States</span>
          <button className={styles.joinButton}>JOIN GROUP</button>
          </div>
        </div>
        <div className={styles.group}>
          <div>

          <Image unoptimized height={0} width={0} src={MegFed} alt="Group 2" />
          </div>
          <div>

          <p>Mag Fed</p>
          <span>894 members • United States</span>
          <button className={styles.joinButton}>JOIN GROUP</button>
          </div>
        </div>
        <div className={styles.group}>
          <div>

          <Image unoptimized height={0} width={0} src={Speedball} alt="Group 3" />
          </div>
          <div>

          <p>Speedball</p>
          <span>557 members • Egypt</span>
          <button className={styles.joinButton}>JOIN GROUP</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuggestedGroupsSection