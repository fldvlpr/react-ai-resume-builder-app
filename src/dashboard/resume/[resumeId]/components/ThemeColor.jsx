import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ThemeColor = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState("#FF5733");
  const { resumeId } = useParams();
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
  ];

  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfo({ ...resumeInfo, themeColor: color });
    const payload = {
      themeColor: color,
      firstName: resumeInfo?.firstName,
      lastName: resumeInfo?.lastName,
      jobTitle: resumeInfo?.jobTitle,
      address: resumeInfo?.address,
      phone: resumeInfo?.phone,
      email: resumeInfo?.email,
      summary: resumeInfo?.summary,
    };

    const data = {
      data: payload,
    };
    GlobalApi.UpdateResumeDetails(resumeId, data).then(
      (resp) => {
        console.log(resp);
        toast("Theme color updated successfully.");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid />
          Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(color)}
              style={{ backgroundColor: color }}
              className={`w-6 h-6 rounded-full cursor-pointer hover:border-black border ${
                selectedColor === color && "border-black"
              }`}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColor;
