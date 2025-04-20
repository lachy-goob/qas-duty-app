import { currentUser } from "@clerk/nextjs/server";
import JobFormController from "./JobFormController";

const JobFormPage = async () => {
  const user = await currentUser();
  const userData = user ? { id: user.id } : null; // Extract only the `id` field

  return <JobFormController user={userData} />;
};

export default JobFormPage;
