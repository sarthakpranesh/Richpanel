import React, { useEffect, useState } from 'react';

// importing components
import Nav from '../../components/Nav';
import { Menu, Refresh, Send } from '../../components/Icons'
import ConvItem from '../../components/ConvItem';
import Message from '../../components/Message';
import { facebookGetPageAccessToken } from '../../components/FacebookSDK';
import firebase from '../../components/Firebase';

// importing api
import sendMessage from '../../api/sendMessage';

// importing styles
import './styles.css';

// sample data
const conversations = [
    {
        name: "Sarthak Pranesh",
        from: "Facebook DM",
        isSelected: true,
    },
    {
        name: "Megha Pranesh",
        from: "Facebook post",
        isSelected: false,
    },
    {
        name: "Jayanti Pranesh",
        from: "Facebook post",
        isSelected: false,
    }
];
const currentConversation = [
    {
        message: "Hello, is this free",
        icon: "https://picsum.photos/200/200",
        isCustomer: true,
    },
    {
        message: "Nothing is Free!!!",
        icon: "https://picsum.photos/200/300",
        isCustomer: false,
    },
    {
        message: "But I want it free with my Audi!",
        icon: "https://picsum.photos/200/200",
        isCustomer: true,
    },
    {
        message: "Sir we request you to read the terms and conditions of buying stuff online. Thank you!",
        icon: "https://picsum.photos/200/200",
        isCustomer: false,
    },
]

const Home = () => {
    const [pageDetails, setPageDetails] = useState({
        accessToken: null,
        id: null,
    });
    const [messages, setMessages] = useState([]);
    const [current, setCurrent] = useState(0);
    const [newMsg, setNewMsg] = useState("");

    // get page access
    useEffect(() => {
        facebookGetPageAccessToken()
            .then((pageDetails) => {
                setPageDetails(pageDetails);
            })
            .catch((err) => console.log(err.message))
    }, []);

    // call get messages
    useEffect(() => {
        if (pageDetails.id === null) {
            return;
        }

        const ref = firebase.database().ref(`page/${pageDetails.id}`)

        const getMessages = () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const resp = await ref.once("value");
                    const data = await resp.val();
                    const arrData = Object.values(data);
                    const sortData = arrData.sort((a, b) => a.timestamp < b.timestamp);
                    resolve(sortData);
                } catch (err) {
                    reject(err);
                }
            })
        }

        getMessages()
            .then((data) => setMessages(data))
            .catch((err) => console.log(err.message));

        ref.on("child_changed", async () => {
            getMessages()
                .then((data) => setMessages(data))
                .catch((err) => console.log(err.message));
        })        
    }, [pageDetails])

    const currentChat = messages.length !== 0 ? messages[current] : {messages: []};

    return (
        <div className="mainWrapperHome">
            <Nav />
            <div className="homeConversationsTab">
                <div className="homeConversationsTabHeader">
                    <Menu style={{marginLeft: 10}} />
                    <h2>Conversations</h2>
                    <Refresh style={{marginRight: 10}} />
                </div>
                {
                    messages.map((item, index) => {
                        return <ConvItem
                            isSelected={index === current}
                            name={item.sender}
                            from={item.type}
                            onClick={() => setCurrent(index)}
                        />
                    })
                }
            </div>
            <div className="homeCurrentConversation">
                <div className="homeCurrentConversationHeader">
                    <h3>Sarthak Pranesh</h3>
                </div>
                <div className="homeCurrentConversationContainer">
                    {
                        currentChat.messages.map((item: any) => {
                            return <Message key={item.mid} message={item.text} align={item.isCustomer ? "left" : "right"} icon="https://picsum.photos/200/200" />
                        })
                    }
                </div>
                <div className="homeCurrentConversationNewMessage">
                    <input
                        type="text"
                        className="homeCurrentConversationNewMessageInput"
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                    />
                    <Send onClick={() => {
                        const recipId = currentChat.sender;
                        const sendId = currentChat.recipient;
                        const pageToken = pageDetails.accessToken
                        sendMessage(recipId, sendId, newMsg, pageToken)
                            .then(() => setNewMsg(""))
                            .catch((err) => console.log(err.message))
                    }} />
                </div>
            </div>
            <div className="homeCurrentUser">
                <div className="homeCurrentUserProfile">
                    <img src="https://picsum.photos/200/200" className="homeCurrentUserProfileImage" alt="user-profile" />
                    <h3 style={{margin: 0, marginTop: 20,}}>Sarthak Pranesh</h3>
                    <h5 style={{margin: 0,}}>Online</h5>
                </div>
                <div className="homeCurrentUserProfileDetails">
                    <h3 style={{margin: 0, marginBottom: 20,}}>Customer Details</h3>
                    <div className="homeCurrentUserProfileDetailsItem">
                        <h4 style={{margin: 0, opacity: 0.6, marginBottom: 10}}>Email</h4>
                        <h4 style={{margin: 0}}>sarthakpranesh08@gmail.com</h4>
                    </div>
                    <div className="homeCurrentUserProfileDetailsItem">
                        <h4 style={{margin: 0, opacity: 0.6, marginBottom: 10}}>First Name</h4>
                        <h4 style={{margin: 0}}>Sarthak</h4>
                    </div>
                    <div className="homeCurrentUserProfileDetailsItem">
                        <h4 style={{margin: 0, opacity: 0.6, marginBottom: 10}}>Last Name</h4>
                        <h4 style={{margin: 0}}>Pranesh</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
