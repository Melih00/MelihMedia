import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { ModalImg } from "../styling/styling";
import useMediaQuery from '@mui/material/useMediaQuery';


export default function Modals({ e}) {
  const matches = useMediaQuery('(min-width:800px)')
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: '97%',
  width: matches ? '85%' : '100%',
  borderRadius: "3%",
  bgcolor: "transparent",
  padding:'0',
  overflow:'auto',
  textAlign:'center',
  overflowX:'hidden',
  maxHeight:'96vh'
};
    return (
    <div>
      <Button onClick={handleOpen}>VIEW</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 700,
        }}
      >
        <Fade in={open}>
          <Box className='modalImg' sx={style}>
            <ModalImg src={e.img} />z
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
