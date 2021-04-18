import { WithProviders, LoadStateManagementData } from '../src/App';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
    (Story) => (
        <WithProviders>
            <LoadStateManagementData>
                <Story />
            </LoadStateManagementData>
        </WithProviders>
    ),
];
