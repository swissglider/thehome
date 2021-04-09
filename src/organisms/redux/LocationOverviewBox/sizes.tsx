export type T_PresentationMode = 'verticalList' | 'horizontalList' | 'fullBox';
export type T_Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const sizes: any = (
    presentationMode: T_PresentationMode,
    breackpoint: T_Breakpoint,
    boxName: string,
): string => {
    switch (presentationMode) {
        case 'fullBox':
            switch (breackpoint) {
                case 'xs':
                case 'sm':
                    switch (boxName) {
                        case 'switch':
                            return 'small';
                        case 'boolean':
                            return 'xsmall';
                        case 'number1':
                            return 'body';
                        case 'number2':
                            return 'body';
                        case 'title':
                            return 'header';
                        default:
                            return '';
                    }
                case 'md':
                case 'lg':
                case 'xl':
                    switch (boxName) {
                        case 'switch':
                            return 'medium';
                        case 'boolean':
                            return 'small';
                        case 'number1':
                            return 'body1';
                        case 'number2':
                            return 'body1';
                        case 'title':
                            return 'h3_header';
                        default:
                            return '';
                    }
                default:
                    return '';
            }
        case 'verticalList':
            switch (boxName) {
                case 'allboolean':
                    return 'small';
                case 'number1':
                    return 'body';
                case 'title':
                    return 'header';
                default:
                    return '';
            }
        case 'horizontalList':
            switch (boxName) {
                case 'allboolean':
                    return 'xsmall';
                case 'number1':
                    return 'caption';
                case 'title':
                    return 'titel';
                default:
                    return '';
            }
        default:
            return '';
    }
    return '';
};
