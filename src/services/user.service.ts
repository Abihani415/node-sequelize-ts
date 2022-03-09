import User from "../models/user";
import Address from "../models/address";
import UserProfile from "../models/userprofile";

export const getUserByPK = async (
  id: number,
  address?: boolean
): Promise<any> => {
  const include = [];
  include.push({ model: UserProfile, as: "user_profile" });
  if (address) {
    include.push({
      model: Address,
      as: "addresses",
    });
  }
  const user = await User.findByPk(id, {
    include,
  });
  return user;
};

export const getUserByFilter = async (
  key: string,
  value: string
): Promise<any> => {
  return await User.findOne({ where: { [key]: value } });
};
