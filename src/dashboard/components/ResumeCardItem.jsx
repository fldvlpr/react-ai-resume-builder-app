import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, MoreVertical } from "lucide-react";
import GlobalApi from "../../../service/GlobalApi";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const ResumeCardItem = ({ resume, refreshData }) => {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("documentID: " + resume.documentId);
    console.log("id: " + resume.id);
  }, [resume]);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.deleteResume(resume.documentId).then(
      (resp) => {
        console.log(resp);
        toast("Resume deleted successfully.");
        refreshData();
        setOpenAlert(false);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="">
      <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
        <div
          className="p-14  h-[300px] bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200 border border-[#9f5bff] rounded-t-lg border-t-4"
          style={{
            borderColor: resume?.themeColor,
          }}
        >
          <div
            className="flex 
        items-center justify-center h-[180px] "
          >
            <img src="/cv.png" width={80} height={80} />
          </div>
        </div>
      </Link>

      <div
        className="border p-3 flex justify-between  text-white rounded-b-lg shadow-lg"
        style={{
          background: resume?.themeColor,
        }}
      >
        <h2 className="text-center my-2 text-black">{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation("/dashboard/resume/" + resume.documentId + "/edit")
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ResumeCardItem;
