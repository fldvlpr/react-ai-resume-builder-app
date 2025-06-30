import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import { toast } from "sonner";

const Skills = () => {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
  }, []);

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, skills: skillsList });
  }, [skillsList]);

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const addNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const removeSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };

    console.log(skillsList);
    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast("Professional skills updated successfully.");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-[#9f5bff]  border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add Your Top Professional Key Skills.</p>

        <div>
          {skillsList.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border rounded-lg p-3 mb-2"
            >
              <div>
                <label className="text-xs">Name</label>
                <Input
                  className="w-full"
                  defaultValue={item.name}
                  onChange={(e) => {
                    handleChange(index, "name", e.target.value);
                  }}
                />
              </div>
              <Rating
                style={{ maxWidth: 120 }}
                value={item.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between my-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-[#9f5bff]"
              onClick={addNewSkills}
            >
              + Add More Skills
            </Button>
            <Button
              variant="outline"
              className="text-[#9f5bff]"
              onClick={removeSkills}
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

export default Skills;
