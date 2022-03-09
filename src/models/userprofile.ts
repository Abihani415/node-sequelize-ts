import { DataTypes, Optional, Model } from "sequelize";
import sequelize from "./index";

interface UserProfileAttributes {
  id: number;
  user_id: number;
  age?: number;
  gender?: "male" | "female";
  role?: "user" | "admin";
}

interface UserProfileCreationAttributes
  extends Optional<UserProfileAttributes, "id" | "user_id"> {}

class UserProfile
  extends Model<UserProfileAttributes, UserProfileCreationAttributes>
  implements UserProfileAttributes
{
  declare id: number;
  declare user_id: number;
  declare age: number;
  declare gender?: "male" | "female" | undefined;
  declare role: "user" | "admin";
}
UserProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    age: DataTypes.INTEGER,
    gender: {
      type: DataTypes.ENUM,
      values: ["male", "female"],
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin"],
      defaultValue: "user",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserProfile",
    tableName: "user_profiles",
    underscored: true,
  }
);

export default UserProfile;
