import { getUsers } from "@/lib/users";
import Users from "./Users";

export default async function page() {
  const users = await getUsers();
  return <Users users={users} />;
}
