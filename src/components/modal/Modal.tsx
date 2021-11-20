import { useState, useEffect } from 'react';
import './styles.scss';

interface IModalProps {
    content: any;
    show: boolean;
    closeAction: () => any;
}

const Modal = (props: IModalProps) => {
    const [show, setShow] = useState(false);
    const close = () => {
        props.closeAction();
        setShow(false);
    }

    useEffect(() => {
        setShow(props.show);
    });

    return (
        <>
            { show  && (
                <div className="modal">
                    <div className="modal__overlay" />
                    <div className="modal__wrapper">
                        <div className="modal__content">
                            <span className="modal__close" onClick={close}/>
                            {props.content}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default Modal;