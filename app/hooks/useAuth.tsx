import {useEffect, useState} from "react";
import {auth, fs, st} from "../../config/firebaseConfig";
import {doc, getDoc} from "firebase/firestore";
import {getDownloadURL, ref} from "@firebase/storage";

function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return {user}
}

function User() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(fs, "users", user.uid);

                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                    console.log("User data:", docSnap.data());
                } else {
                    console.log("No such user!");
                }
            } else {
                console.log("Usuário não está autenticado.");
            }
        };

        fetchData();
    }, []);

    return {userData};
}

function avatar() {
    const [userAvatar, setUserAvatar] = useState(null);
    useEffect(() => {
        const downloadImage = async (imageName: string) => {
            const storageRef = getDownloadURL(ref(st, imageName))
                .then((url) => {
                    setUserAvatar(url);
                }).catch((error) => {
                    console.log(error);
                });
        }
        downloadImage('avatars/'+auth.currentUser.uid+'.jpeg').then(r => {});
    }, []);

    return {userAvatar};
}

function signOut(navigation) {
    return async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                await auth.signOut();
                navigation.navigate('Login' as never);
            } else {
                console.log("Usuário não está autenticado.");
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        }
    };
}

export {useAuth, User, signOut, avatar}