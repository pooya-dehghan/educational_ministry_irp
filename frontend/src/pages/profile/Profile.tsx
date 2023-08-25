import React from "react";
import styles from "./profile.module.css";
import Dashboard from "../Dashboard/Dashboard";

interface UserProfile {
  name: string;
  age: number;
  bio: string;
  profilePictureUrl: string;
}

interface ProfilePageProps {
  user: UserProfile;
}

const Profile: React.FC = () => {
  return (
    <>
      <Dashboard>
        <div className={styles.profile}>
          <img
            src="https://s8.uupload.ir/files/signupbg_bdw.jpg"
            className={styles.profilePicture}
          />
          <div className={styles.profileDetails}>
            <h1 className={styles.profileName}>علی</h1>
            <p className={styles.profileAge}>Age: 20</p>
            <p className={styles.profileBio}>Bio: علی یک پسر خوب است</p>
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default Profile;
