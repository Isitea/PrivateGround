"use strict";
import { iEventTarget } from './customEvent.js';
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

class PeerConnector extends iEventTarget {
    constructor () {
        super();
    }
}

class PeerCommunicator {
    constructor ( RTCConfig = {} ) {
        this.RTCConfig = Object.assign( _Default, RTCConfig );
        this.connections = {};
    }

    send ( content, target = Object.keys( this.connections ) ) {
        if ( content ) {
            for ( const id of target ) {
                this.connections[id].send( content );
            }
        }
    }

    listen () {
        
    }
}

class Connection {
    constructor ( RTCConfig ) {
        this.id = '_' + Math.random().toString( 36 ).substr( 2 );
        this.peer = new RTCPeerConnection( RTCConfig );
    }

    send ( content ) {

    }
}

export { PeerCommunicator };