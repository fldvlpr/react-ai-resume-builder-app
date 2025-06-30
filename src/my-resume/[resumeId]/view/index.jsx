import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/[resumeId]/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const handleDownload = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resumeInfo?.firstName}_${resumeInfo?.lastName}_resume`,
          text: "Hello Everyone, This is my resume. Please open the URL to view it.",
          url:
            import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
        });
        console.log("Resume shared successfully!");
      } catch (error) {
        console.error("Error sharing resume", error);
      }
    }
  };

  const getResumeInfo = () => {
    GlobalApi.getResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your ultimate AI generated resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and can share unique
            resume url with your friends and family.
          </p>

          <div className="flex justify-between px-44 my-10">
            <Button onClick={handleDownload} className="bg-[#9f5bff]">
              Download
            </Button>
            <Button onClick={handleShare} className="bg-[#9f5bff]">
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
