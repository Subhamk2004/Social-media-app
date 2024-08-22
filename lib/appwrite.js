import { ID, Account, Client, Avatars, Databases, Query } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.skr.aora",
    projectId: "66bc1b1700267d8d8897",
    databaseId: "66bc1dd30011719985a8",
    userCollectionId: "66bc1df30003e5032a51",
    videoCollectionId: "66bc1e36003693bc8789",
    storageId: "66bdc98100368ddcd8c9"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
    ;
const account = new Account(client);
let avatar = new Avatars(client);
// The Avatars class in Appwrite is used to generate and manipulate avatar images. 
const databases = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
    try {
        let newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;
        let avatarUrl = avatar.getInitials(username)

        await signIn(email, password);

        let newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
        console.log(newUser);
        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        console.log(session);
        return session;

    } catch (error) {
        throw new Error(error);
    }
}

export async function logout() {
    try {
        const session  = await account.deleteSession("current");
        return session;
    } catch (error) {
        throw new Error(error)
    }
}
 
export const getCurrentUser = async () => {
    try {
        let currentUser = await account.get();

        if(!currentUser) throw Error;

        const loggedUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentUser.$id)]
        )

        if(!loggedUser) throw Error;
        return loggedUser.documents[0];
    } catch (error) {
        console.log("Error in getCurrentUser is: ",error);
    }
}

export const getAllPosts = async() => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async() => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
            // check out appwrite dosc for more queries on how to get modified data or a particular data
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const searchPosts = async(query) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search('title', query)]
            // check out appwrite dosc for more queries on how to get modified data or a particular data
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserPosts = async(userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal('creator', userId)]
            // check out appwrite dosc for more queries on how to get modified data or a particular data
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}