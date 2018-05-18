"use strict";
import { LocalMessaging as Communicator } from './connector-local.js';
import { iEventTarget } from './customEvent.js';

let DefaultConfig = {
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
    constructor ( InitConfig, ConnectorConfig ) {
        //super();
        let RTCConfig = Object.assign( {}, DefaultConfig, InitConfig );
        Object.defineProperties( this, {
            birth: { value: new Event( "" ).timeStamp },            
        } );
    }

    open () {
        Object.defineProperties( this, {
            connector: { value: new PeerConnector( ConnectorConfig ), configurable: true },
        } );
    }

    close () {
        delete this.connector;
    }
}

class PeerConnector {
    constructor ( InitConfig ) {
        //super();
        let messanger = new Communicator();
        let requestChannel = function ( event ) {
            event.data
        };
        this.openChannel = function () {
            messanger.signal();
        };
        this.close = function () {};
        messanger.addEventListener( "signal", requestChannel );
    }
}

class PeerCommunicator0 {
    constructor ( init ) {
        this.connections = {};
        
        switch ( init.type ) {
            case "ascendant":
                this.responseConnection();
                break;
            case "descendant":
                this.requestConnection( init.ascendants );
                break;
        }

    }

    requestConnection ( list ) {
        for ( const peer of list ) {
            this.push( new Connection( RTCConfig, { id: peer.id, description: peer.description } ) );
        }
    }

    send ( content, target = Object.keys( this.connections ) ) {
        if ( content ) {
            for ( const id of target ) {
                this.connections[id].send( content );
            }
        }
    }

    listen ( sender, content ) {
        
    }
}

class Connection {
    constructor ( request ) {
        this.id = '_' + Math.random().toString( 36 ).substr( 2 );
        let channel = new RTCPeerConnection( RTCConfig );
        this.channel = channel;
        if ( request.description ) {
            channel.setRemoteDescription( request.description );
            channel.createAnswer().then( description => {
                channel.setLocalDescription( description );
                connector.answer( { id: this.id, description } );
            } );
        }
    }

    send ( content ) {

    }
}

export { PeerConnector };