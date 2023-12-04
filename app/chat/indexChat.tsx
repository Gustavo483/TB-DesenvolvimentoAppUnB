import React, {useState, useCallback, useEffect} from 'react'
import {GiftedChat} from 'react-native-gifted-chat'
import {collection, addDoc, onSnapshot, query, orderBy} from "firebase/firestore";
import {fs, auth} from "../../config/firebaseConfig";

export default function IndexChat() {
    const [messages, setMessages] = useState([]);
    const name = auth.currentUser?.uid;

    useEffect(() => {
        async function getMessages() {
            const values = query(collection(fs, 'chats'), orderBy('createdAt', 'desc'));

            onSnapshot(values, (snapshot) => setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                }))
            ));
        }

        getMessages();
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        );

        const {_id, createdAt, text, user} = messages[0];

        addDoc(collection(fs,"chats"),{
            _id,
            createdAt,
            text,
            user,
        });
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: name,
            }}
        />
    )
}