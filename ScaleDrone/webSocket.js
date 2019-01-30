"use strict";
class SocketIO {
    constructor ( channelId ) {
        Object.defineProperties( this, {
            port : {
                value: new Promise( ( resolve, reject ) => {
                    const $drone = new Scaledrone( channelId );
                    $drone.on( 'open', () => resolve( $drone ) );
                    $drone.on( 'error', reject );
                } ),
                configurable: true
            }
        } );
    }

    initialize () {
        let port = Promise( ( resolve, reject ) => {
            const $drone = new Scaledrone( 'JRaMq4XI65Wxk6uq' );
            $drone.on( 'open', () => resolve( $drone ) );
            $drone.on( 'error', reject );
        } );
        port.then( port => Object.defineProperties( this, { port: { value: port } } ) );

        return port;
    }
}

new SocketIO( 'JRaMq4XI65Wxk6uq' )