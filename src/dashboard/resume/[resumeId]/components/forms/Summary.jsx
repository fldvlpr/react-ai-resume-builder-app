import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import { AIChatSession } from "../../../../../../service/AIModel";
import { toast } from "sonner";
import { Brain, Loader2 } from "lucide-react";

const Summary = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummaryList, setAIGeneratedSummaryList] = useState();
  const params = useParams();

  useEffect(() => {
    summary && setResumeInfo({ ...resumeInfo, summary: summary });
  }, [summary]);

  const generateSummaryFromAI = async () => {
    setLoading(true);
    const prompt = `Job Title: ${resumeInfo?.jobTitle}, Depends on job title give me list of summary for these 3 levels including Experience level, Mid Level and Fresher level in 3 - 4 lines in array format, With summary and experience_level Field in JSON Format`;
    console.log("prompt: " + prompt);
    const response = await AIChatSession.sendMessage({
      message: prompt,
    });
    console.log("ai response: " + response.text);
    setAIGeneratedSummaryList(JSON.parse([response.text]));
    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      data: {
        summary: summary,
      },
    };
    console.log("summary resumeId: " + params?.resumeId);
    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enableNext(true);
        setLoading(false);
        toast("Personal details updated successfully.");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-[#9f5bff]  border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary For Your Job Title.</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              size="sm"
              variant="outline"
              type="button"
              className="border-[#9f5bff] text-[#9f5bff] flex gap-2"
              disabled={loading}
              onClick={generateSummaryFromAI}
            >
              <Brain className="h-4 w-4" />
              Generate From AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            placeholder="Add Summary"
            required
            defaultValue={summary ? summary : resumeInfo?.summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button disabled={loading} type="submit" className="bg-[#9f5bff]">
              {loading ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList && (
        <div>
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div key={index}>
              <h2 className="font-bold my-1">Level: {item.experience_level}</h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summary;
