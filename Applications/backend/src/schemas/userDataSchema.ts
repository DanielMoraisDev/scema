import conn from "@/db/postgres";
import { DataTypes, Model } from "sequelize";
import { UserDataAttributes, UserDataCreationAttributes } from "@/types";
import User from "./userSchema";

export const table_sql = "users_datas";

class UserData
  extends Model<UserDataAttributes, UserDataCreationAttributes>
  implements UserDataAttributes
{
  public user_data_id!: string;
  public user_id!: string;
  public cpf!: string;
  public phone!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserData.init(
  {
    user_data_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
  },
  {
    sequelize: conn,
    tableName: table_sql,
    timestamps: true,
  },
);

UserData.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
User.hasMany(UserData, {
  foreignKey: "user_id",
  as: "users_datas",
});

export default UserData;
