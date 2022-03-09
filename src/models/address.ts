import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "./index";

export interface AddressAttributes {
  id: number;
  user_id: number;
  type: "home" | "office" | "other";
  line_1: string;
  line_2: string;
  city: string;
  state: string;
  country: string;
  pin: string;
  landmark: string;
}

interface AddressCreationAttributes
  extends Optional<AddressAttributes, "id" | "user_id" | "line_2"> {}

class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
  declare id: number;
  declare user_id: number;
  declare type: "home" | "office" | "other";
  declare line_1: string;
  declare line_2: string;
  declare city: string;
  declare state: string;
  declare country: string;
  declare pin: string;
  declare landmark: string;
}
Address.init(
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
        key: "id",
        model: "users",
      },
      onDelete: "casecade",
      onUpdate: "casecade",
    },
    type: {
      type: DataTypes.ENUM,
      values: ["home", "office", "other"],
      defaultValue: "home",
    },
    line_1: DataTypes.STRING,
    line_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    landmark: DataTypes.STRING,
    pin: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Address",
    tableName: "addresses",
    underscored: true,
  }
);

export default Address;
