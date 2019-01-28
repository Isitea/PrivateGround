"use strict";
import { secureRandom } from './uniqueId.js';

class iEventTarget {
    constructor () {
        Object.defineProperties( this, {
            listeners: { value: {} },
        } );
    }

    addEventListener ( type, listener, { once = false, prior = false, passive = false, expire = 0 } = {} ) {
        if ( !( type in this.listeners ) ) {
            this.listeners[ type ] = [];
        }
        if ( expire ) expire += Date.now();

        let item;
        if ( !( item = this.listeners[ type ].find( item => item.listener === listener ) ) ) {
            item = { listener, once, passive, expire, id: '_' + secureRandom() };
            if ( prior ) this.listeners[ type ].unshift( item );
            else this.listeners[ type ].push( item );
        }
        return item.id;
    }

    removeEventListenerAll ( type ) {
        if ( type in this.listeners ) {
            this.listeners[ type ] = [];
        }

        return this;
    }

    removeEventListener ( type, item ) {
        let { listener, id } = item;
        if ( item instanceof Function ) [ listener, id ] = [ item, false ];

        if ( type in this.listeners ) {
            let finder = item => ( ( listener && item.listener === listener ) || ( id && item.id === id ) );
            let stack = this.listeners[ type ], index;
            if ( ( index = stack.findIndex( finder ) ) > -1 ) stack.splice( index, 1 );
        }

        return this;
    }

    dispatchEvent ( event ) {
        if ( !( event instanceof Event || event instanceof iEvent ) ) throw Error( "TypeError" );
        if ( event.type in this.listeners ) {
            let stack = this.listeners[ event.type ];
            const preventDefault = event.defaultPrevented;
            for ( let item of stack ) {
                if ( item.expire > 0 && item.expire < Date.now() ) {
                    this.removeEventListener( event.type, item );
                    continue;
                }
                
                let listener = item.listener;

                if ( typeof listener === "function" ) listener.call( this, event );
                else if ( typeof listener.handleEvent === "function" ) listener.handleEvent.call( this, event );

                if ( item.passive ) event.defaultPrevented = preventDefault;
                if ( item.once ) this.removeEventListener( event.type, item );

                //Currently, .stopPropagation() and .stopImmediatePropagation() were treated as same action.
                //Difference between them is a stage which effects.
                //.stopPropagation() effects on "bubbling phase", and .stopImmediatePropagation() does on "at target phase".
                //Phase is shown in .eventPhase, which can have 0(NONE), 1(CAPTURING_PHASE), 2(AT_TARGET), 3(BUBBLING_PHASE)
                //Further details on https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase
                if ( event.cancelBubble ) return !event.defaultPrevented;
            }
        }

        return !event.defaultPrevented;
    }
}

class iEvent {
    constructor ( type, { cancelable = true } ) {
        if ( !type ) throw new TypeError( "Insufficient parameter with constructor." );
        Object.defineProperties( this, {
            type: { value: type, enumerable: true },
            timeStamp: { value: performance.now() },
            cancelable: { value: cancelable },
            cancelBubble: { value: false, writable: true },
            defaultPrevented: { value: false, writable: true }
        } );
    }

    preventDefault () {
        if ( this.cancelable ) this.defaultPrevented = true;
    }
    stopPropagation () {
        this.stopImmediatePropagation();
    }
    stopImmediatePropagation () {
        this.cancelBubble = true;
    }
}

export { iEventTarget, iEvent, secureRandom };