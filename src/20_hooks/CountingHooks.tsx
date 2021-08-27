export const CountMethods = ['av', 'max', 'min', 'first'] as const;
export type T_CountMethod = typeof CountMethods[number];

export const useGetCountedValue = (
    values: any[],
    countMethod: T_CountMethod,
    type?: string,
): boolean | number | string => {
    if (values === undefined || values === null) return false;
    const _select = type ?? typeof values[0];
    switch (countMethod) {
        case 'av':
            return _select === 'number'
                ? Math.round(((values as number[]).reduce((a, b) => a + b, 0) / values.length) * 10) / 10
                : _select === 'boolean'
                ? Math.round(
                      ((values.map((e) => (e ? 1 : 0)) as number[]).reduce((a, b) => a + b, 0) / values.length) * 10,
                  ) / 10
                : false;
        case 'max':
            return _select === 'number'
                ? Math.round(10 * Math.max(...values)) / 10
                : _select === 'boolean'
                ? values.some((e) => e === true)
                    ? 1
                    : 0
                : false;
        case 'min':
            return _select === 'number'
                ? Math.round(10 * Math.min(...values)) / 10
                : _select === 'boolean'
                ? values.some((e) => e === false)
                    ? 0
                    : 1
                : false;
        case 'first':
            return values[0] ?? false;
        default:
            return values[0] ?? false;
    }
};
