const loadIOBConnection = (cb: () => void) => {
    const script = document.createElement('script');

    script.src = process.env.NODE_ENV === 'production' ? '/thehome/js/services/conn.js' : '/js/services/conn.js';
    script.async = true;
    script.onload = cb;
    document.body.appendChild(script);
};

export const useLoadSocket = (cb: () => void): void => {
    const script = document.createElement('script');
    script.src =
        process.env.NODE_ENV === 'production' ? `/thehome/js/services/socket.io.js` : `/js/services/socket.io.js`;
    script.async = true;
    script.onload = () => loadIOBConnection(cb);
    document.body.appendChild(script);
};
