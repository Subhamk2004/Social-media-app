import { ID, Account, Client, Avatars, Databases, Query, Storage } from 'react-native-appwrite';


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

const storage = new Storage(client);

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
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt')]
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
            [Query.equal('creator', userId), Query.orderDesc('$createdAt')],
            // check out appwrite dosc for more queries on how to get modified data or a particular data
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getFilePreview = async(fileId, type) => {
    let fileUrl;

    try {
        if(type === 'video') {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId)
        }
        else if(type === 'image') {
            fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100)
        }
        else {
            throw new Error('Inavlid file type')
        }

        if(!fileUrl) throw Error;

        console.log('fileUrl in filePreview is ',fileUrl);
        
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export const uploadFile = async (file, type) => {
    console.log('entered upload file');
    if(!file) return;
    const {mimeType, ...rest} = file;
    const asset = {type:mimeType, ...rest}
    console.log('updated asset is ',asset);
    

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );

        console.log('uploaded file is ',uploadedFile);
        
        const fileUrl = await getFilePreview(uploadedFile.$id, type)

        console.log('fileUrl is ',fileUrl);
        
        return fileUrl;
    } catch (error) {
        throw new Error(error)
    }
}

export const createVideo = async (form) => {
    try {
        console.log('entering upload file');
        
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ])
        console.log('thumbnaiUrl in create video is ', thumbnailUrl, 'videoUrl in create video is ', videoUrl);

        const newPost  = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title:form.title,
                thumbnail:thumbnailUrl,
                video:videoUrl,
                prompt:form.prompt,
                creator:form.userId
            }
        )

        console.log('newly created post is ', newPost);
        
        return newPost;
        
    } catch (error) {
        throw new Error('error inside createVideo is ',error);
    }
}