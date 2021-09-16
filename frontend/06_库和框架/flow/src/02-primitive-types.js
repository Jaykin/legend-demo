


    // @flow

    function literalValue01(x: number, y: string, z: boolean) {
        if (!z) return x + y;
    }

    console.log(literalValue01(2, 'str', false));

    /*--------------------*/
    function literalVal02(x: number, y: string, z: boolean) {
        if (!z) return x + y;
    }

    console.log(Number(2), String(3), Boolean(0));


    // 函数的默认参数

    function method(x?: string = 'default') {
        return 2;
    }

    method();

