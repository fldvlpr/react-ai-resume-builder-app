import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import GlobalApi from "./../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItem from "./components/ResumeCardItem";

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && getResumesList();
  }, [user]);

  const getResumesList = () => {
    console.log(user?.primaryEmailAddress?.emailAddress);
    GlobalApi.getUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (resp) => {
        setResumeList(resp.data.data);
      }
    );
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI Resume for your next Job Role.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
        <AddResume />

        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCardItem
              resume={resume}
              key={index}
              refreshData={getResumesList}
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
