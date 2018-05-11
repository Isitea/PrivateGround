"use strict";
class PeerConnector {
    constructor ( { apiKey, RTCConfig } ) {
        this.RTCConfig = RTCConfig;
        let drone = new Scaledrone( apiKey );
        let state = new Promise( ( resolve, reject ) => {
            drone.on( "open", resolve );
            drone.on( "error", reject );
        } )
        .then( () => {
            console.log( "connected" );
            let market = drone.subscribe( "PeerMarket" );
            market.on( "data", ( { listener, description } ) => {
                console.log( "data", description );
                if ( description.type === "offer" ) {
                    this.response( description );
                }
            } );
        } );
        drone.on( "close", error => { console.log( "close", error ) } );
        drone.on( "disconnect", error => {} );
        drone.on( "reconnect", error => {} );

        this.send = function ( message ) {
            state = state.then( () => drone.publish( { room: "PeerMarket", message } ) );
        };
    }

    response( description ) {
        let RTC = new RTCPeerConnection( this.RTCConfig );
        RTC.setRemoteDescription( description );
        RTC.createAnswer()
            .then( answer => {
                RTC.setLocalDescription( offer );
                console.log( answer );
            } )
    }

    contact ( user = "" ) {
        let RTC = new RTCPeerConnection( this.RTCConfig );
        console.log( RTC );
        let DataChannel = RTC.createDataChannel( "DataChannel" );
        DataChannel.addEventListener( "open", event => console.log( "OPEN", event ) );
        DataChannel.addEventListener( "message", event => console.log( event ) );
        RTC.createOffer()
            .then( offer => {
                RTC.setLocalDescription( offer );
                this.send( { listener: user, description: offer } );
            } );
    }
}
export { PeerConnector };
