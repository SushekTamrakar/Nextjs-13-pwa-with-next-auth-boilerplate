import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Backend_URL } from "@/lib/Constants";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    id: string;
  };
};

const ProfilePage = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const response = await fetch(Backend_URL + `/auth/users/me/`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.token.access}`,
      "Content-Type": "application/json",
    },
  });
  // console.log({ response });
  const user: User = await response.json();

  return (
    <div className="m-2 border rounded shadow overflow-hidden">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600 text-center">
        User Profile
      </div>

      <div className="grid grid-cols-2  p-2 gap-2">
        <p className="p-2 text-white">Name:</p>
        <p className="p-2 text-white">
          {user?.data?.first_name} {user?.data?.last_name}
        </p>
        <p className="p-2 text-white">Email:</p>
        <p className="p-2 text-white">{user?.data?.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
