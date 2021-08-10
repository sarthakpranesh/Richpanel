import React from 'react';

// importing components
import Nav from '../../components/Nav';
import { Menu, Refresh, Send } from '../../components/Icons/'
import ConvItem from '../../components/ConvItem';
import Message from '../../components/Message';

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
                    conversations.map((item) => {
                        return <ConvItem isSelected={item.isSelected} name={item.name} from={item.from} />
                    })
                }
            </div>
            <div className="homeCurrentConversation">
                <div className="homeCurrentConversationHeader">
                    <h3>Sarthak Pranesh</h3>
                </div>
                <div className="homeCurrentConversationContainer">
                    {
                        currentConversation.map((item) => {
                            return <Message message={item.message} align={item.isCustomer ? "left" : "right"} icon={item.icon} />
                        })
                    }
                </div>
                <div className="homeCurrentConversationNewMessage">
                    <input type="text" className="homeCurrentConversationNewMessageInput" />
                    <Send onClick={() => console.log('pressed')} />
                </div>
            </div>
        </div>
    );
};

export default Home;
