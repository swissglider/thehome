import React, { useEffect, useState } from 'react';
import { Avatar, Chip, createStyles, Grid, makeStyles, Paper, Theme, Tooltip } from '@material-ui/core';
import { adminParamSelector } from '../../32-recoil/admin/atomAdminParams';
import { useRecoilState, useRecoilValue } from 'recoil';
import { enumFunctionListState } from '../../32-recoil/admin/atomEnumFunctions';
import { getValueByLanguageFromObject } from '../../21_utils/DisplayNameHelper';
import SimpleButton from '../../10_atoms/base/SimpleButton';
import Admin_LocationConfig_Dialog from './Dialog';
import { ADD_ICON, INFO_ICON } from '../../2_configuration/Icons';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import TypographyComponent from '../../10_atoms/base/TypographyComponent';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        classes1: {
            display: 'flex',
            paddingLeft: theme.spacing(1),
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
        },
        classes2: ({ classesProps1 }: { classesProps1?: string }) => {
            return {
                alignItems: classesProps1 ?? '',
            };
        },
        droparea: {
            listStyle: 'none',
            padding: theme.spacing(0.5),
            backgroundColor: theme.palette.grey[200],
        },
        chip: {
            margin: theme.spacing(0.5),
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.common.white,
        },
        button: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        info: {
            width: theme.spacing(1.5),
            height: theme.spacing(1.5),
        },
    }),
);

export interface I_Admin_LocationConfig_Props {
    locationSensorBox: string;
    title: string;
    info: string;
}

export type Admin_LocationConfig_Selection = {
    id: string;
    name: string;
    icon?: string;
}[];

const Admin_LocationConfig = (props: I_Admin_LocationConfig_Props): JSX.Element => {
    const classes = useStyles({ classesProps1: '' });
    const enumFunctions = useRecoilValue(enumFunctionListState);
    const [locationSensorBoxes, setLocationSensorBoxes] = useRecoilState<any>(
        adminParamSelector('LOCATION_OVERVIEW_BOW_SENSOR_TYPES'),
    );
    const [selected, setSelected] = useState<Admin_LocationConfig_Selection>([]);
    const [notSelected, setNotSelected] = useState<Admin_LocationConfig_Selection>([]);
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (newSelected: string[]) => {
        setOpen(false);
        const tempBoxes = { ...locationSensorBoxes };
        tempBoxes[props.locationSensorBox] = [...new Set([...tempBoxes[props.locationSensorBox], ...newSelected])];
        setLocationSensorBoxes(tempBoxes);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const loadSensorBoxFromIOB = () => {
        const _locationSensorBox =
            locationSensorBoxes &&
            props.locationSensorBox in locationSensorBoxes &&
            Array.isArray(locationSensorBoxes[props.locationSensorBox])
                ? locationSensorBoxes[props.locationSensorBox]
                : [];
        const unselected_: Admin_LocationConfig_Selection = enumFunctions
            .filter((e: any) => _locationSensorBox.includes(e.id) !== true)
            .map((e: any) => ({
                id: e.id,
                name: getValueByLanguageFromObject(e.value.common.name),
                icon: e.value.common.icon,
            }));
        const selected_: Admin_LocationConfig_Selection = _locationSensorBox
            .filter((e: string) => enumFunctions.find((a: any) => a.id === e))
            .map((e: string) => ({
                id: e,
                name: getValueByLanguageFromObject(
                    (enumFunctions.find((a: any) => a.id === e) as any).value.common.name,
                ),
                icon: (enumFunctions.find((a: any) => a.id === e) as any).value.common.icon,
            }));
        setNotSelected(unselected_);
        setSelected(selected_);
    };
    useEffect(() => {
        loadSensorBoxFromIOB();
    }, [locationSensorBoxes, enumFunctions, props.locationSensorBox]);

    const handleDelete = (id: string) => () => {
        const tempBoxes = { ...locationSensorBoxes };
        if (tempBoxes[props.locationSensorBox].includes(id)) {
            const tmp = [...tempBoxes[props.locationSensorBox]];
            const index = tmp.indexOf(id);
            tmp.splice(index, 1);
            tempBoxes[props.locationSensorBox] = tmp;
            setLocationSensorBoxes(tempBoxes);
        }
    };

    const reorder = (result: DropResult): void => {
        if (!result.destination) {
            return;
        }
        const selected_ = [...selected];
        const [toReorder] = selected_.splice(result.source.index, 1);
        selected_.splice(result.destination.index, 0, toReorder);

        const tempBoxes = { ...locationSensorBoxes };
        tempBoxes[props.locationSensorBox] = selected_.map((e: any) => e.id);
        setLocationSensorBoxes(tempBoxes);
    };

    return (
        <>
            <Grid container direction="row" justify="center">
                <Grid item>
                    <TypographyComponent variant="h6" align="center">
                        {props.title ?? ''}
                    </TypographyComponent>
                </Grid>
                <Grid item>
                    <Tooltip title={props.info} placement="left-end">
                        <Avatar src={INFO_ICON} className={classes.info} />
                    </Tooltip>
                </Grid>
            </Grid>
            <SimpleButton
                onClick={handleClickOpen}
                color="secondary"
                variant="outlined"
                text="Select other Functions"
                startIcon={ADD_ICON}
                fullWidth={true}
                className={classes.button}
            />
            {open === true && (
                <Admin_LocationConfig_Dialog
                    boxName={props.locationSensorBox}
                    selectedValue={[...notSelected]}
                    open={open}
                    onClose={handleClose}
                    onCancel={handleCancel}
                />
            )}
            <Paper component="ul" className={classes.droparea}>
                <DragDropContext onDragEnd={reorder}>
                    <Droppable droppableId="id">
                        {(provided) => (
                            <Grid
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="stretch"
                            >
                                {selected.map((data, index) => (
                                    <Draggable key={data.id} draggableId={data.id} index={index}>
                                        {(provided) => (
                                            <Grid
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                item
                                            >
                                                <Chip
                                                    avatar={<Avatar alt={data.name} src={data.icon} />}
                                                    label={data.name}
                                                    onDelete={handleDelete(data.id)}
                                                    className={classes.chip}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        )}
                                    </Draggable>
                                ))}
                            </Grid>
                        )}
                    </Droppable>
                </DragDropContext>
            </Paper>
        </>
    );
};

export default Admin_LocationConfig;
