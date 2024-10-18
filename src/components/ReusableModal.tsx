import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';

interface ReusableModalProps {
  size?: 'sm' | 'md' | 'lg';
  open: boolean;
  type?: 'form' | 'logout' | 'image' | 'information' | string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  component?: React.ReactNode;
  heading?: string;
  subHeading?: string;
  buttonColor?: string;
  imageSrc?: string;
  imageHeight?: string;
  imageWidth?: string;
  buttonText?: string;
  buttonBgColor?: string;
  buttonTextSize?: string;
  infoContent?: string; 
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  size,
  open,
  type,
  setOpen,
  component,
  heading,
  subHeading,
  buttonColor,
  imageSrc,
  imageHeight,
  imageWidth,
  buttonText,
  buttonBgColor,
  buttonTextSize,
  infoContent, 
}) => {
  return (
    <Modal open={open}>
      <ModalDialog size={size}>
        <span onClick={() => setOpen(false)}>
          <ModalClose />
        </span>
        <DialogTitle>{heading}</DialogTitle>
        {/* <DialogContent>{subHeading}</DialogContent> */}

        {type === 'edit' && component}

        {type==="delete" && <>
        
            <DialogContent>{subHeading}</DialogContent>
            <Button sx={{ color: buttonColor }}>{buttonText}</Button>
        </>}

        {type === 'logout' && (
          <Button sx={{ color: buttonColor }}>{buttonText}</Button>
        )}

        {type === 'image' && (
          <div className='image-class'>
            <img
              src={imageSrc}
              alt="Modal Content"
              style={{ height: imageHeight, width: imageWidth }}
            />
            <Button
              sx={{
                backgroundColor: buttonBgColor,
                color: buttonColor,
                fontSize: buttonTextSize,
              }}
            >
              {buttonText}
            </Button>
          </div>
        )}

        {type === 'information' && (
          <div className="information-class">
           
            <p>{infoContent}</p>
            
           
            {imageSrc && (
              <img
                src={imageSrc}
                alt="Info Image"
                style={{ height: imageHeight, width: imageWidth }}
              />
            )}

         
            {buttonText && (
              <Button
                sx={{
                  backgroundColor: buttonBgColor,
                  color: buttonColor,
                  fontSize: buttonTextSize,
                }}
              >
                {buttonText}
              </Button>
            )}
          </div>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default ReusableModal;

