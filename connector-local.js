"use strict";
let _Default = {
    iceServers: [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
                "stun:stun3.l.google.com:19302",
                "stun:stun4.l.google.com:19302",
                "stun:stun.stunprotocol.org:3478",
            ]
        }
    ]
};

class PeerCommunicator {
    constructor ( RTCConfig = {} ) {
        this.RTCConfig = Object.assign( _Default, RTCConfig );
        this.peers = [];
    }

    send () {}
}

class Peer {
    constructor ( checkDuplication ) {
        this.id = '_' + Math.random().toString( 36 ).substr( 2 );
        
    }
}

export { PeerCommunicator };