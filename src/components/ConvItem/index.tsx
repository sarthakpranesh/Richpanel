import React from 'react';

// importing styles
import './styles.css';

export type ConvItemParam = {
    isSelected: boolean;
    name: string;
    from: string;
    onClick: () => void;
}

const ConvItem = (props: ConvItemParam) => {
    return (
        <div 
            className="mainWrapperConv"
            style={{
                backgroundColor: props.isSelected ? '#E5E5E5' : 'white',
                borderBottom: '#E5E5E5',
                borderBottomWidth: 1,
            }}
            onClick={props.onClick}
        >
            <div className="convInnerContainer">
                <input className="convInnerContainCheck" type="checkbox" defaultChecked={false} onChange={() => console.log('pressed')} />
                <div className="convInnerContainerDetails">
                    <h3>{props.name}</h3>
                    <h5>{props.from}</h5>
                </div>
            </div>
        </div>
    );
};

ConvItem.defaultProps = {
    isSelected: false,
    name: 'Sarthak Pranesh',
    from: 'Facebook DM',
    onClick: () => console.log("ConvItem clicked!"),
};

export default ConvItem;
