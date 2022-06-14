import React, {FC} from 'react';
import styles from './UserProfile.module.css';
import {store} from "../../store/store";

interface UserProfileProps{
    avatar: string,
    name: string,
    rating: number
    timer: string,
}

const UserProfile:FC<UserProfileProps> = ({avatar, name, rating, timer}) => {
    return (
        <div className={styles.profile_container}>
            <div className={styles.user_data_container}>
                <img  className={styles.icon} src={avatar}  />
                <p className={styles.user_info}>{`${name} (${rating})`}</p>
            </div>
            {
                store.game.withTimers &&  <p className={styles.timer}>{timer}</p>
            }
        </div>
    );
};

export default UserProfile;
