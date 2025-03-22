"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const goToTasks = () => {
    router.push("/tasks");
  };
  return (
    <>
      <Button onClick={goToTasks}>Go to Tasks</Button>
    </>
  );
}
