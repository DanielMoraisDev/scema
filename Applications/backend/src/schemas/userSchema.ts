import conn from "@/db/postgres";
import { DataTypes, Model } from "sequelize";
import {
  USER_ROLES_OPTIONS,
  UserAttributes,
  UserCreationAttributes,
  UserRoles,
} from "@/types";

export const table_sql = "users";

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public user_id!: string;
  public email!: string;
  public name!: string;
  public password!: string;
  public role!: UserRoles;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...USER_ROLES_OPTIONS),
      allowNull: false,
      defaultValue: USER_ROLES_OPTIONS[0],
    },
  },
  {
    sequelize: conn,
    tableName: table_sql,
    timestamps: true,
  },
);

export default User;
