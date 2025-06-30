import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";
import GlobalApi from "../../../../../../service/GlobalApi";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

const Experience = ({ enableNext }) => {
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    resumeInfo?.experience.length > 0 &&
      setExperienceList(resumeInfo?.experience);
  }, []);

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, experience: experienceList });
  }, [experienceList]);

  const handleChange = (e, index) => {
    const newEntries = experienceList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  const addNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummary: "",
      },
    ]);
  };

  const removeExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };

    console.log(experienceList);
    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast("Experience details updated successfully.");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-[#9f5bff]  border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your Previous Job Experiences.</p>

        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    defaultValue={item?.title}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    defaultValue={item?.companyName}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div>
                  <label className="text-xs">City</label>

                  <Input
                    defaultValue={item?.city}
                    name="city"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    defaultValue={item?.state}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    name="startDate"
                    type="date"
                    defaultValue={item?.startDate}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    name="endDate"
                    type="date"
                    defaultValue={item?.endDate}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    value={item?.workSummary}
                    onRichTextEditorChange={(e) =>
                      handleRichTextEditor(e, "workSummary", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-[#9f5bff]"
              onClick={addNewExperience}
            >
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              className="text-[#9f5bff]"
              onClick={removeExperience}
            >
              - Remove
            </Button>
          </div>
          <Button
            className="bg-[#9f5bff]"
            disabled={loading}
            onClick={() => onSave()}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
