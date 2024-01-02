import { ID } from "appwrite";

import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { Url } from "url";

export async function createUserAccount(user: INewUser) {
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if(!newAccount) throw new Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId : newAccount.$id,
            email : newAccount.email,
            name : newAccount.name,
            userName : user.username,
            imageUrl : avatarUrl
        })

        return newUser;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

export async function saveUserToDB(user : {
    accountId : string,
    email : string,
    name : string,
    imageUrl : URL,
    userName?  : string,
}) {
    try{
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        )
        return newUser;
    }
    catch(error){
        console.log(error);
    }
}