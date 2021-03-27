import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { PropsWithChildren, useMemo } from 'react';
import Hex2rgbaConverter from '../../../utils/Hex2rgbaConverter';
import { Trans } from '@lingui/macro';
import { useDispatch, useSelector } from 'react-redux';
import { selector_getStateByID } from '../../../features/ioBrokerStates/selectors';
import { I_Type_Params } from '../../../features/servConn/slice';
import { selector_getFunctionTypeByID } from '../../../features/servConn/selectors';
import { getFunctionType, useHomeContainer } from '../../PlaceOverview/hooks/PlaceOverviewHooks';
import moment from 'moment';
import { ACTION_IOBROKER_UPDATE_STATE } from '../../../features/ioBrokerStates/actions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonContainter: {
            padding: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            boxShadow: 'rgba(50,50,93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
            // backgroundColor: ({ color }: { color: string }) => color,
            // background: 'rgb(2,0,36)',
            background: ({ color }: { color: string }) => {
                const color1 = Hex2rgbaConverter(color, 1);
                const color2 = Hex2rgbaConverter(color, 20);
                const color3 = Hex2rgbaConverter(color, 40);
                return `linear-gradient(0deg, ${color1} 0%, ${color2} 35%, ${color3} 100%)`;
            },
        },
        buttonText: {
            color: theme.palette.text.secondary,
            fontWeight: 900,
        },
    }),
);

const DivAround = ({ title, value }: PropsWithChildren<{ title: JSX.Element; value: string }>) => {
    const functionType = getFunctionType();
    if (functionType === undefined) return null;
    const color = useMemo(
        () =>
            functionType.color !== undefined && typeof functionType.color === 'string' ? functionType.color : '#8884d8',
        [functionType],
    );
    const classes = useStyles({ color: color });
    return (
        <>
            <div className={classes.buttonContainter}>
                <div className={classes.buttonText}>{title}</div>
                <div>
                    {value}
                    {functionType.unit ?? ''}
                </div>
            </div>
        </>
    );
};

export const CurrentValueChartBox = (): JSX.Element | null => {
    const hcPorps = useHomeContainer();
    if (hcPorps.deviceID === undefined || hcPorps.functionType === undefined) return null;

    const state = useSelector(selector_getStateByID(hcPorps.deviceID));
    return <DivAround title={<Trans id="chartOvervewBoxes.lastval">Last val</Trans>} value={state.val.toString()} />;
};

export const CurrentValueAvarageBox = ({ allVal }: { allVal: number[] }): JSX.Element | null => {
    const val = Math.round((10 * allVal.reduce((a, b) => a + b, 0)) / allVal.length) / 10;
    return <DivAround title={<Trans id="chartOvervewBoxes.avval">Av val</Trans>} value={val.toString()} />;
};

export const CurrentValueMaxBox = ({ allVal }: { allVal: number[] }): JSX.Element | null => {
    const val = Math.round(10 * Math.max(...allVal)) / 10;
    return <DivAround title={<Trans id="chartOvervewBoxes.maxval">Max val</Trans>} value={val.toString()} />;
};

export const CurrentValueMinBox = ({ allVal }: { allVal: number[] }): JSX.Element | null => {
    const val = Math.round(10 * Math.min(...allVal)) / 10;
    return <DivAround title={<Trans id="chartOvervewBoxes.minval">Min val</Trans>} value={val.toString()} />;
};

export const CurrentValueLastUpdateDate = (): JSX.Element | null => {
    const hcPorps = useHomeContainer();
    if (hcPorps.deviceID === undefined || hcPorps.functionType === undefined) return null;

    const state = useSelector(selector_getStateByID(hcPorps.deviceID));
    const time = moment(state.ts).locale('de-ch').format('lll');
    return <DivAround title={<Trans id="chartOvervewBoxes.lastupdate">Last update</Trans>} value={time} />;
};

export const CurrentValueImage = (): JSX.Element | null => {
    const hcPorps = useHomeContainer();
    if (hcPorps.deviceID === undefined || hcPorps.functionType === undefined) return null;

    const state = useSelector(selector_getStateByID(hcPorps.deviceID));
    const functionType: I_Type_Params = useSelector(selector_getFunctionTypeByID(hcPorps.functionType));
    const color =
        functionType.color !== undefined && typeof functionType.color === 'string' ? functionType.color : '#8884d8';
    const classes = useStyles({ color: color });
    const icon =
        state.val !== undefined && typeof state.val === 'boolean'
            ? state.val === true
                ? functionType.icon_true
                : functionType.icon_false
            : functionType.icon;
    const dispatch = useDispatch();
    const changeState =
        state.val !== undefined && typeof state.val === 'boolean' && functionType.write === true
            ? (value: boolean) => {
                  dispatch(ACTION_IOBROKER_UPDATE_STATE(hcPorps.deviceID as string, !value));
              }
            : () => {
                  return;
              };
    return (
        <>
            <div className={classes.buttonContainter}>
                <Avatar
                    src={icon}
                    onClick={() => {
                        changeState(state.val);
                    }}
                />
            </div>
        </>
    );
};
