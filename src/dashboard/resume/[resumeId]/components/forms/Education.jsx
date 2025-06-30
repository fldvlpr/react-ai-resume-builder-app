import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Education = () => {
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    resumeInfo && setEducationalList(resumeInfo?.education);
  }, []);

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, education: educationalList });
  }, [educationalList]);

  const handleChange = (e, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const addNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest),
      },
    };

    console.log(educationalList);
    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast("Education details updated successfully.");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-[#9f5bff]  border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add Your Educational Details.</p>

        {educationalList.map((education, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label className="text-xs">University Name</label>
                <Input
                  name="universityName"
                  defaultValue={education?.universityName}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label className="text-xs">Degree</label>
                <Input
                  defaultValue={education?.degree}
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label className="text-xs">Major</label>
                <Input
                  defaultValue={education?.major}
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  name="startDate"
                  type="date"
                  defaultValue={education?.startDate}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label className="text-xs">End Date</label>
                <Input
                  name="endDate"
                  type="date"
                  defaultValue={education?.endDate}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div className="col-span-2">
                <label className="text-xs">Description</label>
                <Textarea
                  name="description"
                  defaultValue={education?.description}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between my-3">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-[#9f5bff]"
            onClick={addNewEducation}
          >
            + Add More Education
          </Button>
          <Button
            variant="outline"
            className="text-[#9f5bff]"
            onClick={removeEducation}
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
  );
};

export default Education;
