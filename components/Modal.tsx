
import { Modal } from "antd";
import React from "react";
//Include the modal props type
import { ModalProps } from "../types/modal_props";
//Contain ModalUtils class which contain different methods of modal
import { Modal as ModalUtil } from "../utils/model_utils";

export const ModalComponent = React.forwardRef(
  (propsValues: ModalProps, ref) => {
    const {
      //main component to show inside the modal
      component: RenderInner,
      props,
      //allow modal to close by clicking backdrop or not
      closable = true,
      //execute something while closing the modal
      onClose = () => {},
      closeModal = () => {},
      isVisible,
      width = 500,
      title,
      className = "",
      modalFooter,
      closeable = true,
      closeIcon = false,
      centered = true,
    } = propsValues;

    const onModalClose = (isClose: any) => {
      if (!closable) return;
      if (isClose) {
        closeModal();
        onClose();
      }
      //modal method to close the modal
      ModalUtil.close();
    };

    return (
      <Modal
        visible={isVisible}
        title={title}
        onCancel={onModalClose}
        footer={modalFooter ? modalFooter : null}
        width={width}
        className={className}
        closeIcon={closeIcon}
        closable={closeable}
        centered={centered}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          {RenderInner && <RenderInner inModal={true} {...props} />}
        </div>
      </Modal>
    );
  }
);