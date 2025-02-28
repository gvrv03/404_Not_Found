import { ID, Permission, Role } from "appwrite";

const { AppwriteDatabase, client, UserAccount } = require("@/config/appwrite");

export const ListCollectionData = async (collectionID, queries) => {
  try {
    const res = await AppwriteDatabase.listDocuments(
      process.env.NEXT_PUBLIC_DATABASEID,
      collectionID,
      queries // [] type
    );
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const UpdateCollectionData = async (collectionID, docID, data) => {
  try {
    const res = await AppwriteDatabase.updateDocument(
      process.env.NEXT_PUBLIC_DATABASEID,
      collectionID,
      docID,
      data
    );
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const AddDataToCollection = async (collectionID, data) => {
  try {
    const SLUGID = ID.unique();
    const res = await AppwriteDatabase.createDocument(
      process.env.NEXT_PUBLIC_DATABASEID,
      collectionID,
      SLUGID,
      data,
      // [
      //   Permission.update(Role.user(SLUGID)),
      //   Permission.delete(Role.user(SLUGID)),
      //   Permission.read(Role.user(SLUGID)),
      //   Permission.read(Role.label(["admin", "viewer"])),
      //   Permission.delete(Role.label(["admin"])),
      //   Permission.update(Role.label(["admin"])),
      // ]
    );
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const GetSingleDocument = async (docid, collectionID, queries) => {
  try {
    const res = await AppwriteDatabase.getDocument(
      process.env.NEXT_PUBLIC_DATABASEID,
      collectionID,
      docid,
      queries
    );
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendOTP = async (phoneNo) => {
  const session = await UserAccount.createPhoneToken(
    ID.unique(),
    `+91${phoneNo}`
  );
  return session;
};

export const verifyOTP = async (user, otp) => {
  await UserAccount.createSession(user.userId, otp);
};

export const updateUser = async (userName) => {
  await UserAccount.updateName(userName);
};
