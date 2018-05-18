"use strict";
import { PeerConnector } from './WebRTC.js';
let Peer1 = new PeerConnector();
Peer1.openChannel();
let Peer2 = new PeerConnector();
Peer2.openChannel();
