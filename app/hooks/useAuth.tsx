import {useEffect, useState} from "react";
import {auth, fs} from "../../config/firebaseConfig";
import {collection, getDocs, query, where} from "firebase/firestore";

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
            try {
                const user = auth.currentUser;
                if (user) {
                    const querySnapshot =
                        await getDocs(query(collection(fs, 'users'),
                            where('uid', '==', auth.currentUser.uid)));

                    if (querySnapshot.empty) {
                        console.log('No matching documents.');
                        return;
                    }
                    querySnapshot.forEach((doc) => {
                        setUserData(doc.data());
                    });
                } else {
                    console.log("Usuário não está autenticado.");
                }

            } catch (error) {
                console.error('Error getting documents:', error);
            }
        };

        fetchData();
    }, []);

    return {userData};
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

export {useAuth, User, signOut}