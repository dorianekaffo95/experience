import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const AdminUserLoginType = new ObjectType({
  name: 'adminUserLogin',
  fields: {
    email: { type: StringType },
    password: { type: StringType },
    status: { type: StringType },
  },
});

export default AdminUserLoginType;
