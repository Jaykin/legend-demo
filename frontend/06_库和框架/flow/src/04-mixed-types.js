
        // @flow

        // 单个类型

        function square(x: number) {
            return x * x;
        }


        // 多个可选类型

        function string(val: string | number | boolean) {
            return !!val;
        }

        // 基于其他类型：泛型

        function ident<T>(val: T): T {
            return val;
        }

        // 任意类型

        function mix(val: mixed) {
            if (typeof val === 'string')  return val + '';

            return '';
        }

        // ident('str');
        // ident(3);

        // square('strtr');

        mix('str');

