import { ReactNode, useEffect, useState } from "react";
import Styles from "./styles.module.css";
interface IProps {
  open: boolean;
  onClose: () => void;
  title: string;
  actions: { title: string; key: string; onClick: () => void }[];
  children?: ReactNode;
}
export default function Dialog({ open, onClose, title, actions, children }: IProps) {
  const [show, setShow] = useState(false);
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    if (open) {
      setShow(true);
      setTimeout(() => setOpacity(1), 40);
    } else {
      setOpacity(0);
      setTimeout(() => {
        setShow(false);
      }, 325);
    }
  }, [open]);

  if (!show) return;
  return (
    <div className={Styles.overlay} style={{ opacity: opacity }} onClick={onClose}>
      <div
        className={Styles.container}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={Styles.header}>
          <span className={Styles.title}>{title}</span>
          <img src="/close.svg" alt="close" className={Styles.closeBtn} onClick={onClose} />
        </div>
        <div className={Styles.content}>{children}</div>
        <div className={Styles.footer}>
          {actions.map((item) => (
            <button onClick={item.onClick} key={item.key}>
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
