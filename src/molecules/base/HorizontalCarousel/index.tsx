import React, { useMemo } from 'react';
import { Avatar, createStyles, makeStyles, Theme, withWidth } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './style.css';
import { BACKWARD_ICON, FORWARD_ICON } from '../../../configuration/Icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        carouselRoot: {
            // flex: 'flex',
            // flexDirection: 'column',
            // display: 'flex',
            // justifyContent: 'center',
            position: 'relative',
            paddingLeft: '23px',
            paddingRight: '22px',
            // border: 'solid',
            // width: 'calc(100vw - 30px)',
            maxWidth: theme.spacing(147),
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: '-ms-autohiding-scrollbar',
        },
        buttonBack: {
            position: 'absolute',
            top: '50%',
            left: -10,
            transform: 'translateY(-50%)',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: 'none',
            opacity: '0.5',
        },
        buttonNext: {
            position: 'absolute',
            top: '50%',
            right: -10,
            transform: 'translateY(-50%)',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: 'none',
            opacity: '0.5',
        },
        iconSmall: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        dotGroup: {
            textAlign: 'center',
        },
        dot: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: 'none',
            // backgroundColor: blueGrey[50],
            // borderRadius: '50%',
            // opacity: '1',
        },
        dotSign: {
            height: '8px',
            width: '8px',
            backgroundColor: blueGrey[100],
            borderRadius: '50%',
            display: 'inline-block',
            // opacity: '0.1',
        },
    }),
);

interface I_SensorTypesHorizontal_Props {
    childrenSlides: JSX.Element[];
    width: string;
    getSlideSteps: (width: string) => { visibleSlides: number; dragStep: number; step: number };
}

const HorizontalCarousel_ = ({ childrenSlides, getSlideSteps, width }: I_SensorTypesHorizontal_Props): JSX.Element => {
    const classes = useStyles();

    const slideSteps = useMemo(() => getSlideSteps(width), [width]);

    const forwartIcon = FORWARD_ICON;
    const backwardIcon = BACKWARD_ICON;

    // if (isWidthUp('sm', props.width)) {
    //     return <span />;
    // }

    return (
        <>
            {childrenSlides.length !== 0 && (
                <>
                    <CarouselProvider
                        totalSlides={childrenSlides.length}
                        visibleSlides={slideSteps.visibleSlides}
                        step={slideSteps.step}
                        dragStep={slideSteps.dragStep}
                        naturalSlideWidth={1}
                        naturalSlideHeight={1}
                        // infinite
                        lockOnWindowScroll
                        isIntrinsicHeight={true}
                    >
                        <div className={classes.carouselRoot}>
                            <Slider>
                                {childrenSlides.map((childSlide: JSX.Element, index: number) => (
                                    <Slide index={index} key={`sensor_types_hor_${index}_slide_`}>
                                        {childSlide}
                                    </Slide>
                                ))}
                            </Slider>
                            {childrenSlides.length > slideSteps.visibleSlides && (
                                <>
                                    <ButtonBack className={classes.buttonBack}>
                                        <Avatar src={backwardIcon} className={classes.iconSmall} />
                                    </ButtonBack>
                                    <ButtonNext className={classes.buttonNext}>
                                        <Avatar src={forwartIcon} className={classes.iconSmall} />
                                    </ButtonNext>
                                </>
                            )}
                            <div className={classes.dotGroup}>
                                {childrenSlides.length > slideSteps.visibleSlides &&
                                    childrenSlides.map((childSlide: JSX.Element, index: number) => (
                                        <React.Fragment key={`sensor_types_hor_1${index}_dot`}>
                                            {index % slideSteps.visibleSlides === 0 && (
                                                <Dot
                                                    slide={index}
                                                    key={`sensor_types_hor_1${index}_dot`}
                                                    className={classes.dot}
                                                >
                                                    <span className={classes.dotSign} />
                                                </Dot>
                                            )}
                                        </React.Fragment>
                                    ))}
                            </div>
                        </div>
                    </CarouselProvider>
                </>
            )}
        </>
    );
};

const HorizontalCarousel = withWidth()(HorizontalCarousel_);

export default HorizontalCarousel;
