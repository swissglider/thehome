import React, { useEffect } from 'react';

const scriptLoaded = (e: any) => {
    const servConn = (window as { [key: string]: any }).servConn;
    servConn.namespace = 'velo.0';
    servConn._useStorage = false;
    let states = [];
    console.log('Hallo');
    servConn.init(
        {
            name: 'velo.0', // optional - default 'vis.0'
            connLink: 'http://192.168.90.1:8082', // optional URL of the socket.io adapter
            socketSession: '', // optional - used by authentication
        },
        {
            onConnChange: function (isConnected: any) {
                if (isConnected) {
                    console.log('connected');
                    servConn.getStates(function (err: any, _states: any) {
                        let count = 0;
                        for (const id in _states) {
                            id;
                            count++;
                        }
                        console.log('Received ' + count + ' states.');
                        states = _states;
                    });
                } else {
                    console.log('disconnected');
                }
            },
            onRefresh: function () {
                window.location.reload();
            },
            onUpdate: function (id: any, state: any) {
                setTimeout(function () {
                    // console.log('NEW VALUE of ' + id + ': ' + JSON.stringify(state));
                    states[id] = state;
                }, 0);
            },
            onError: function (err: any) {
                console.log(err.command, err.arg);
            },
        },
    );
};

const TestIOBroker = (): JSX.Element => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/js/services/conn.js';
        script.async = true;
        script.onload = (e) => scriptLoaded(e);
        document.body.appendChild(script);
    }, []);
    return <></>;
};

export default TestIOBroker;
