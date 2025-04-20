import { currentUser } from "@clerk/nextjs/server";
import JobFormController from "./JobFormController";

const JobFormPage = async () => {
  const user = await currentUser();

  return <JobFormController user={user} />;
};

export default JobFormPage;
