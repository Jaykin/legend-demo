

    // @flow


    // any

    function addAny(one: any, two: any) {
        return one + two;
    }

    addAny([], {});     // work
    addAny(1, 2);       // work


    function addMixed(one: mixed, two: mixed) {
        return one + two;
    }

    addMixed(1, 2);         // error
    addMixed(1, 'str');     // error
    addMixed([], {});       // error
