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
import registerUser from '../../api/registerUser';

const Home = (props) => {
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
                return pageDetails;
            })
            .then((pageDetails) => registerUser(props.userId, pageDetails.id, pageDetails.accessToken))
            .catch((err) => console.log(err.message))
    }, [props.userId]);

    // call get messages
    useEffect(() => {
        if (pageDetails.id === null) {
            return;
        }

        const ref = firebase.database().ref(`page/${pageDetails.id}/chats/`)

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

    const currentChat = messages.length !== 0 ? messages[current] : {messages: [], profile: {
        first_name: "",
        last_name: "",
        profile_pic: ""
    }};

    return (
        <div className="mainWrapperHome">
            <Nav />
            <div className="homeConversationsTab">
                <div className="homeConversationsTabHeader">
                    <Menu style={{marginLeft: 10}} />
                    <h2>Conversations</h2>
                    <div className="homeConversationsTabHeaderRefresh" onClick={() => window.document.location.reload()}>
                        <Refresh style={{marginRight: 10}} />
                    </div>
                </div>
                {
                    messages.map((item, index) => {
                        return <ConvItem
                            isSelected={index === current}
                            name={`${item.profile.first_name} ${item.profile.last_name}`}
                            from={item.type}
                            onClick={() => setCurrent(index)}
                        />
                    })
                }
            </div>
            <div className="homeCurrentConversation">
                <div className="homeCurrentConversationHeader">
                    <h3>{currentChat.profile.first_name + " " + currentChat.profile.last_name}</h3>
                </div>
                <div className="homeCurrentConversationContainer">
                    {
                        currentChat.messages.map((item) => {
                            return <Message
                                key={item.mid}
                                message={item.text}
                                align={item.isCustomer ? "left" : "right"}
                                icon={currentChat.profile.profile_pic}
                            />
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
                    <div className="homeCurrentConversationNewMessageSend">
                        <Send
                            onClick={() => {
                                if (newMsg === "") {
                                    return alert('You forgot to type a message!');
                                }
                                const recipId = currentChat.sender;
                                const sendId = currentChat.recipient;
                                const pageToken = pageDetails.accessToken
                                sendMessage(recipId, sendId, newMsg, pageToken)
                                    .then(() => setNewMsg(""))
                                    .then(() => setCurrent(0))
                                    .catch((err) => console.log(err.message))
                                }}
                        />
                    </div>
                </div>
            </div>
            <div className="homeCurrentUser">
                <div className="homeCurrentUserProfile">
                    <img
                        src="https://picsum.photos/200/200"
                        className="homeCurrentUserProfileImage"
                        alt="user-profile"
                    />
                    <h3 style={{margin: 0, marginTop: 20,}}>{currentChat.profile.first_name + " " + currentChat.profile.last_name}</h3>
                    <h5 style={{margin: 0,}}>Online</h5>
                </div>
                <div className="homeCurrentUserProfileDetails">
                    <h3 style={{margin: 0, marginBottom: 20,}}>Customer Details</h3>
                    <div className="homeCurrentUserProfileDetailsItem">
                        <h4 style={{margin: 0, opacity: 0.6, marginBottom: 10}}>Email</h4>
                        <h4 style={{margin: 0}}>someone@gmail.com</h4>
                    </div>
                    <div className="homeCurrentUserProfileDetailsItem">
                        <h4 style={{margin: 0, opacity: 0.6, marginBottom: 10}}>First Name</h4>
                        <h4 style={{margin: 0}}>{currentChat.profile.first_name}</h4>
                    </div>
                    <div className="homeCurrentUserProfileDetailsItem">
                        <h4 style={{margin: 0, opacity: 0.6, marginBottom: 10}}>Last Name</h4>
                        <h4 style={{margin: 0}}>{currentChat.profile.last_name}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
