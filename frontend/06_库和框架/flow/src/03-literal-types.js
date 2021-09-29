

    /**
     * 字面量类型
     *
     * */

    // @flow


    function method(x?: 'foo' | 'foo2'): string | void {
        return x;
    }

    method('foo');  // work
    method();       // work
    method('foo2'); // work

