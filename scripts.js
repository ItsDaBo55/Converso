// scripts.js
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const privateMessages = document.getElementById('privateMessages');
const globalMessages = document.getElementById('globalMessages');
const userName = document.getElementById('userName');
const userFlag = document.getElementById('userFlag');
const userAvatar = document.getElementById('userAvatar');

let localStream;
let remoteStream;
let peerConnection;
let socket;
let isMuted = false;
let isCameraOff = false;
let isConnected = false;

const config = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
    ]
};

const countries = Object.keys(countriesArray)
const countriesCode = Object.values(countriesArray)

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('*').forEach(el => {
        el.classList.toggle('dark-mode')
        if (el.classList.contains('theme-atom-one-dark')) {
            el.className = 'theme-atom-one-light'
        } else if (el.classList.contains('theme-atom-one-light')) {
            el.className = 'theme-atom-one-dark'
        }
    })

    localStorage.setItem('darkMode', document.querySelector('html').classList.contains('dark-mode'));
    if (localStorage.getItem('darkMode') == 'true') {
        document.getElementById('style').href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/atom-one-dark.min.css'
    } else {
        document.getElementById('style').href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/atom-one-light.min.css'
    }
}

function openSettings() {
    const list = document.getElementById('country')
    list.innerHTML = ''
    for (let i = 0; i < countries.length; i++) {
        const el = document.createElement('option')
        el.value = countriesCode[i]
        el.innerText = countries[i]
        list.appendChild(el)
    }
    list.value = localStorage.getItem('country')
    $('#settingsModal').modal('show');
}

function saveSettings() {
    const username = document.getElementById('username').value;
    const country = document.getElementById('country').value;
    const profilePic = document.getElementById('profilePic').value;

    if (!username || !profilePic || !country) {
        alert("Please enter a username, country and either an avatar URL or select a default avatar.");
        return
    }

    localStorage.setItem('username', username);
    localStorage.setItem('country', country);
    localStorage.setItem('profilePic', profilePic);

    userName.textContent = username;
    userFlag.src = `https://flagcdn.com/w40/${country.toLowerCase()}.png`;
    userAvatar.src = profilePic;

    $('#settingsModal').modal('hide');
}

function toggleMute() {
    isMuted = !isMuted;
    if (localStream) {
        localStream.getAudioTracks()[0].enabled = !isMuted;
    }
    document.getElementById('muteBtn').innerHTML = isMuted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
    if (isConnected) {
        socket.emit('mute', { muted: isMuted });
    }
}

function toggleCamera() {
    isCameraOff = !isCameraOff;
    if (localStream) {
        localStream.getVideoTracks()[0].enabled = !isCameraOff;
    }
    document.getElementById('cameraBtn').textContent = isCameraOff ? 'Turn On Camera' : 'Turn Off Camera';
}

function startChat() {
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('skipBtn').style.display = 'inline-block';
    document.getElementById('stopBtn').style.display = 'inline-block';
    document.getElementById('statusMessage').textContent = 'Searching for user...';
    startVideoStream();
}

function stopChat() {
    if (peerConnection) {
        peerConnection.close();
    }
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    isConnected = false;
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('skipBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'none';
    document.getElementById('statusMessage').innerHTML = 'Click <i class="fa-solid fa-play"></i> to begin';
    socket.emit('leave');
}

function skipUser() {
    stopChat();
    startChat();
}

function sendPrivateMessage() {
    const message = document.getElementById('privateMessageInput').value;
    if (message.trim()) {
        // addMessage('privateMessages', localStorage.getItem('username'), localStorage.getItem('country'), localStorage.getItem('profilePic'), message, new Date().toUTCString(), false);
        document.getElementById('privateMessageInput').value = '';
        if (isConnected) {
            socket.emit('privateMessage', { username: localStorage.getItem('username'), country: localStorage.getItem('country'), profilePic: localStorage.getItem('profilePic'), message, time: new Date().toUTCString(), gif: false });
        }
    }
}

function sendGlobalMessage() {
    const message = document.getElementById('globalMessageInput').value;
    if (message.trim()) {
        // addMessage('globalMessages', localStorage.getItem('username'), localStorage.getItem('country'), localStorage.getItem('profilePic'), message, new Date().toUTCString(), false);
        document.getElementById('globalMessageInput').value = '';
        socket.emit('globalMessage', { username: localStorage.getItem('username'), country: localStorage.getItem('country'), profilePic: localStorage.getItem('profilePic'), message, time: new Date().toUTCString(), gif: false });
    }
}

function addMessage(chatId, username, country, profilePic, message, time, gif = false) {
    const chatElement = document.getElementById(chatId);
    const darkMode = localStorage.getItem('darkMode')
    const newComment = document.createElement('div');
    newComment.className = darkMode == 'true' ? 'comment dark-mode' : 'comment';

    const imgCont = document.createElement('div');
    imgCont.className = 'img-cont';

    const img = document.createElement('img');
    img.src = profilePic;
    img.alt = 'User Avatar';

    imgCont.appendChild(img);

    const commentContent = document.createElement('div');
    commentContent.className = 'comment-content';

    const userNameDiv = document.createElement('div');
    userNameDiv.className = 'username';
    userNameDiv.innerHTML = `@${username} <img class="flag" src="https://flagcdn.com/w40/${country.toLowerCase()}.png" style="height: 10px; width: 10px; margin-right: 0px;">, `;

    const messageDiv = document.createElement(gif ? 'img' : 'div');
    messageDiv.className = 'message';

    // Check if message contains code snippet
    const codeSnippetMatch = message.match(/```(\w+)?\n([\s\S]*?)```/);
    if (codeSnippetMatch) {
        const language = codeSnippetMatch[1] || ''; // Get the language if specified
        const code = codeSnippetMatch[2]; // Get the code snippet
        const pre = document.createElement('pre');
        const codeElement = document.createElement('code');
        codeElement.className = language;
        codeElement.textContent = code;
        pre.className = darkMode == 'true' ? 'theme-atom-one-dark' : 'theme-atom-one-light'
        pre.appendChild(codeElement);
        messageDiv.appendChild(pre);
        hljs.highlightElement(codeElement); // Apply syntax highlighting
    } else {
        gif ? messageDiv.src = message : messageDiv.innerText = message;
    }

    const timeDiv = document.createElement('div');
    var createdTimestamp = time.split(/[, :]+/);
    var createdDate = new Date(Date.UTC(createdTimestamp[3], getMonthNumber(createdTimestamp[2]), createdTimestamp[1], createdTimestamp[4], createdTimestamp[5], createdTimestamp[6]));
    timeDiv.innerText = createdDate.toLocaleString();
    timeDiv.className = 'time';

    function getMonthNumber(monthString) {
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return months.indexOf(monthString);
    }

    commentContent.appendChild(userNameDiv);
    commentContent.appendChild(messageDiv);
    commentContent.appendChild(timeDiv);

    newComment.appendChild(imgCont);
    newComment.appendChild(commentContent);

    chatElement.appendChild(newComment);
    chatElement.scrollTop = chatElement.scrollHeight;
}

function startVideoStream() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            localStream = stream;
            localVideo.srcObject = stream;
            setupPeerConnection();
        })
        .catch(error => {
            console.error('Error accessing media devices.', error);
            stopChat()
            alert('Could not start video source. Please ensure you have a working camera and microphone.');
        });
}

function setupPeerConnection() {
    peerConnection = new RTCPeerConnection(config);

    peerConnection.addStream(localStream);
    peerConnection.onaddstream = event => {
        remoteStream = event.stream;
        remoteVideo.srcObject = remoteStream;
    };

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            socket.emit('candidate', event.candidate);
        }
    };

    socket.emit('join', { username: localStorage.getItem('username'), country: localStorage.getItem('country'), avatar: localStorage.getItem('profilePic')});

    socket.on('offer', async (id, description) => {
        await peerConnection.setRemoteDescription(description);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', id, peerConnection.localDescription);
    });

    socket.on('answer', description => {
        peerConnection.setRemoteDescription(description);
    });

    socket.on('candidate', candidate => {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on('mute', data => {
        // Handle mute notification
    });

    socket.on('skip', () => {
        startVideoStream();
    });

    socket.on('privateMessage', data => {
        addMessage('privateMessages', data.username, data.country, data.profilePic, data.message, data.time, data.gif);
    });

    socket.on('disconnect', () => {
        stopChat();
    });

    isConnected = true;
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        toggleDarkMode();
    }

    let userName , avatar, country = 'US'
    if (localStorage.getItem('username')) {
        userName = localStorage.getItem('username')
        document.getElementById('username').value = userName
        document.getElementById('userName').innerText = userName
    }

    if (localStorage.getItem('profilePic')) {
        document.getElementById('profilePic').value = localStorage.getItem('profilePic');
        document.getElementById('userAvatar').src = localStorage.getItem('profilePic');
        avatar = localStorage.getItem('profilePic')
        userAvatar.src = avatar
    }

    if (localStorage.getItem('country')) {
        document.getElementById('country').value = localStorage.getItem('country');
        country = localStorage.getItem('country')
        userFlag.src = `https://flagcdn.com/w40/${country.toLowerCase()}.png`;
    }

    if (!localStorage.getItem('username') || !localStorage.getItem('profilePic') || !localStorage.getItem('country')) {
        openSettings(true);
    }

    socket = io.connect('http://localhost:3000');

    socket.on('globalMessage', data => {
        addMessage('globalMessages', data.username, data.country, data.profilePic, data.message, data.time, data.gif);
    });

    socket.on('connect', () => {
        console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
        stopChat();
    });
});


function detectDevTools() {
    const devTools = /./;
    devTools.toString = function() {
        debugger;
    };
}
setInterval(detectDevTools, 500);