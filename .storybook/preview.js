import { WithProviders } from '../src/App';
import LoadIOBDataToRedux from '../src/21_utils/LoadIOBDataToRedux';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
    (Story) => (
        <WithProviders>
            <LoadIOBDataToRedux>
                <Story />
            </LoadIOBDataToRedux>
        </WithProviders>
    ),
];
