"use strict";
import { iEventTarget, secureRandom } from './customEvent.js';

class LocalMessaging extends iEventTarget {
    constructor ( target = window ) {
        super();

        function listener ( { data: event } ) {
            if ( !( event instanceof Object ) || event.sender === this.id ) return;
            let message = new Event( event.type );
            message.data = event;
            console.log( this.id, message );
            this.dispatchEvent( message );
        }

        this.id = '_' + secureRandom();
        this.target = target;
        this.target.addEventListener( "message", listener );
        this.close = function () {
            this.target.removeEventListener( "message", listener );
            this.removeEventListenerAll( "signal" );
        };
    }

    signal ( ms = 1000 ) {
        let peers = [];
        let handleSignal = event => {
            if ( event.data.sender && event.data.type === "response" ) peers.push( event.data.id );
        };
        this.addEventListener( "signal", handleSignal, { prior: true, expire: 1000 } );
        this.send( { type: "signal", sender: this.id } );

        return new Promise( resolve => { setTimeout( () => { resolve( peers ); }, ms ); } );
    }

    send ( message = {}, listener ) {
        if ( listener ) this.target.postMessage( { message, listener, sender: this.id }, "*" );
        else this.target.postMessage( message, "*" );
    }
}

export { LocalMessaging };
