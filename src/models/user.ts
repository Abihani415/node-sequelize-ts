/**
 * Keep this file in sync with the code in the "Usage" section in typescript.md
 */
import {
  DataTypes,
  Model,
  Optional,
  Association,
  HasOneGetAssociationMixin,
  HasOneCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasMany,
} from "sequelize";
import sequelize from "./index";
import UserProfile from "./userprofile";
import Address from "./address";

interface UserAttributes {
  id: number;
  user_name: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  password: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "first_name" | "last_name" | "phone" | "email"
  > {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare user_name: string;
  declare first_name: string | null;
  declare last_name: string | null;
  declare email: string | null;
  declare phone: string | null;
  declare password: string;

  // declare readonly created_at: Date;
  // declare readonly updated_at: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.

  // https://github.com/sequelize/sequelize/blob/f5fcf1644669bcd18bbc206d70279b8eb2307640/lib/associations/has-one.js#L66
  // Mixing name will be decide by
  // get, set, create + user_profile(relationship name)
  // Get singular name, trying to uppercase the first letter, unless the model forbids it
  declare getUser_profile: HasOneGetAssociationMixin<UserProfile>; // Note the null assertions!
  declare createUser_profile: HasOneCreateAssociationMixin<UserProfile>;

  declare getAddresses: HasManyGetAssociationsMixin<Address>;
  declare createAddresses: HasManyCreateAssociationMixin<Address>;

  declare static associations: {
    user_profile: Association<User, UserProfile>;
    addresses: Association<User, Address>;
  };
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: DataTypes.STRING(255),
    last_name: DataTypes.STRING(255),
    user_name: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    phone: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    // created_at: DataTypes.DATE,
    // updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
    underscored: true,
  }
);

User.hasOne(UserProfile, {
  sourceKey: "id",
  as: "user_profile",
  foreignKey: "user_id",
});

User.hasMany(Address, {
  sourceKey: "id",
  as: "addresses",
  foreignKey: "user_id",
});

export default User;
