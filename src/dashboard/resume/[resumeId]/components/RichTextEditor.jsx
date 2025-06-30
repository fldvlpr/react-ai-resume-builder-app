import { Button } from "@/components/ui/button";
import { Brain, Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Editor, {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  Separator,
  Toolbar,
  EditorProvider,
} from "react-simple-wysiwyg";
import { AIChatSession } from "../../../../../service/AIModel";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";

const RichTextEditor = ({ index, onRichTextEditorChange, value }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [localValue, setLocalValue] = useState(value || "");

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const generateSummeryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast("Please Add Position Title");
      return;
    }
    setLoading(true);
    const prompt = `Based on the position title: ${resumeInfo?.experience[index]?.title}, give me 5-7 bullet points for my resume. Return the result strictly as a JSON object with a single key 'text' containing the entire HTML list string in <ul> and <li> tags. Do not return an array, do not include any extra text or explanation, only the JSON object.`;
    const result = await AIChatSession.sendMessage({
      message: prompt,
    });

    let htmlValue = "";

    try {
      const parsed = JSON.parse(result.text);
      console.log("parsed.text before processing:", parsed.text);

      if (parsed.text !== undefined) {
        htmlValue = parsed.text;
      } else {
        htmlValue = result.text;
      }
    } catch (err) {
      htmlValue = result.text;
    }

    if (Array.isArray(htmlValue)) {
      console.log("Joining htmlValue array to string...");
      htmlValue = htmlValue.join("");
    }

    console.log("Final htmlValue:", htmlValue);
    setLocalValue(htmlValue);
    onRichTextEditorChange({ target: { value: htmlValue } });
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-end my-2">
        <label className="text-xs">Summary</label>
        <Button
          size="sm"
          variant="outline"
          type="button"
          disabled={loading}
          onClick={generateSummeryFromAI}
          className="border-[#9f5bff] text-[#9f5bff] flex gap-2"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate From AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={localValue}
          onChange={(e) => {
            setLocalValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
