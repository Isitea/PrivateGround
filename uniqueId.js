"use strict";
let seed = new Uint8Array( 12 );

function secureRandom () {
    let randomValue = 0;
    for ( let i = 0; i < 5; i++ ) {
        crypto.getRandomValues( seed );
        randomValue += Number( seed.join( "" ) ) / Number( seed.reverse().join( "" ) );
    }
    
    return randomValue.toString( 32 ).substr( 2 );
}

export { secureRandom };