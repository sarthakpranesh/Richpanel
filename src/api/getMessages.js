import firebase from '../components/Firebase';

const db = firebase.database();

const getMessages = (recipient_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resp = await db.ref(`page/${recipient_psid}`).once("value");
            const data = await resp.val();
            const arrData = Object.values(data);
            const sortData = arrData.sort((a, b) => a.timestamp < b.timestamp);
            resolve(sortData);
        } catch (err) {
            console.log(err.message);
            reject(err);
        }
    })
}

export default getMessages;
