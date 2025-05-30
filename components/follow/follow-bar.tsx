import { getAllOtherUsers, getAuthUser } from "@/prisma/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FollowButton } from "./follow-button";

export const FollowBar = async () => {
  const [users, currentUser] = await Promise.all([
    getAllOtherUsers(),
    getAuthUser(),
  ]);

  return (
    <div className="hidden lg:block w-full">
      <div className="rounded-xl p-4 bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4">Who to follow</h2>
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-row gap-4 justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={user.image ?? "/default-avatar.png"}
                    alt={user.name ?? ""}
                  />
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-gray-700 font-semibold text-sm">
                    {user.name}
                  </p>
                  <p className="text-gray-500 text-sm">@{user.username}</p>
                </div>
              </div>
              <FollowButton user={user} currentUser={currentUser} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
