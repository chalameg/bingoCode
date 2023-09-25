import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
const AppDialog = ({isOpen, title, handleClose, children}) => {
	return (
	<Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      {children}
      {/* <Button onClick={handleClose}>Ok</Button> */}
    </Dialog>
	)
}
export default AppDialog