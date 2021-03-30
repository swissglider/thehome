import { WithProviders } from '../src/App';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
    (Story) => (
        <WithProviders>
            <Story />
        </WithProviders>
    ),
];
