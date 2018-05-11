"use strict";
import { PeerConnector } from './connector-scaledrone.js';
let TEST = new PeerConnector( {
    apiKey: '6yBVsza2pgGfP28N',
    RTCConfig: {
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
    },
} );
window.TEST = TEST;
TEST.contact();