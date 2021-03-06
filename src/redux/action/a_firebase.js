import * as types from './types'
import * as firebase from "firebase";
firebase.initializeApp({
    apiKey: "AIzaSyCtNtVwb1lTDsSU0EDb-mlmD-_J-qOqkvs",
    authDomain: "match-puzzle-58986.firebaseapp.com",
    databaseURL: "https://match-puzzle-58986.firebaseio.com",
    projectId: "match-puzzle-58986",
    storageBucket: "match-puzzle-58986.appspot.com",
    messagingSenderId: "353547857908"
});

export const updateUserTrophy = (user, callback) => {
    return (dispatch, getState) => {
        let userPath = "/Trophy/" + user.userId 
        callback(firebase.database().ref(userPath).update({
            trophy: user.trophy,
            username: user.username,
            email: user.email
        }))
    }
}

export const getUserData = (id, callback) => {
    return (dispatch, getState) => {
        let userPath = "/Trophy/" + id
        firebase.database().ref(userPath).on('value', (snapshot) => {
            var Data = {}
            if(snapshot.val()){
                Data = snapshot.val()
            }
            callback(Data)
        })
    }
}

export const updateData = (data) => {
    return (dispatch, getState) => {
        let userPath = "/Trophy/" + data.userId
        firebase.database().ref(userPath).update(data)
    }
}

export const deleteAccount = (data, callback) => {
    return (dispatch, getState) => {
        var user = firebase.auth().currentUser;
        user.delete().then(function() {
            // User deleted.
            let userPath = "/Trophy/" + data.userId
            firebase.database().ref(userPath).remove()
            callback('Your account has been deleted successfully')
        }).catch(function(error) {
            // An error happened.
            callback('It has already been deleted.')
        });
    }
}

export const getTopPlayers = (callback) => {
    return (dispatch, getState) => {
        let userPath = "/Trophy"
        firebase.database().ref(userPath).on('value', (snapshot) => {
            var Data = {}
            if(snapshot.val()){
                Data = snapshot.val()
                dispatch(setTopPlayer(sortByTrophy(Data)))
            }
            callback(Object.keys(Data).length)
        })
    }
}

export const sortByTrophy = (Data) => {
    let s_Data = []
    Object.keys(Data).map(function(key, index){
        s_Data.push(Data[key])
    })
    return s_Data.sort(function(a, b) {
        return (a['trophy'] > b['trophy']) ? -1 : ((a['trophy'] < b['trophy']) ? 1 : 0);
    });
}

export const setTopPlayer = (data) => {
    return {
        type: types.TOP_PLAYERS,
        data
    }
}

export const uploadImage = (filename, callback) => {
    return (dispatch, getState) => {
        firebase.storage()
        .ref('images/' + filename)
        .getDownloadURL()
        .then((url) => {
            firebase.storage().refFromURL(url).getDownloadURL().then((url) => {
                callback(url);
            })
        })
    }
}

export const deleteTempFile = (filename) => {
    return (dispatch, getState) => {
        var storageRef = firebase.storage().ref(); 
        // Create a reference to the file to delete
        var desertRef =   storageRef.child('images/' + filename); //i js copied a download-url from my one of the files in the storage

        // Delete the file
        desertRef.delete().then(function() {
        // File deleted successfully
        console.log('done');
        }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log(error);
        });
    }
}

