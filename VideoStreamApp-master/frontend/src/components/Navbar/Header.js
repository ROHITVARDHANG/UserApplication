import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function SearchAppBar({ isLoggedIn }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [fnvalues, setFNValues] = React.useState({
        flname: ""
    });
    const [lnvalues, setLNValues] = React.useState({
        lnname: ""
    });
    const [emailvalues, setEmailValues] = React.useState({
        emailId: ""
    });
    const handleFLChange = flname => event => {
        if (/[^0-9a-zA-Z]/.test(event.target.value)) {
        } else {
            setFNValues({ ...fnvalues, [flname]: event.target.value });
        }
    };
    const handleLNChange = lnname => event => {
        if (/[^0-9a-zA-Z]/.test(event.target.value)) {
        } else {
            setLNValues({ ...lnvalues, [lnname]: event.target.value });
        }
    };
    const handleEmailChange = emailId => event => {
        setEmailValues({ ...emailvalues, [emailId]: event.target.value });
    };

    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const error = regexEmail.test(emailvalues.emailId);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (error) {
            const data = new FormData(event.currentTarget);
            const form = {
                fullname: data.get('fname') + ' ' + data.get('lname'),
                email: data.get('email'),
                password: data.get('password')
            };
            await axios.post("http://localhost:3002/api/v1/user/signup", form);
            handleClose();
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        User Management
                    </Typography>
                    {isLoggedIn &&
                        <>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            </Avatar>
                            <div>
                                <Button variant="contained" onClick={handleOpen}>Add User</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                                <label>First Name:</label>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="fname"
                                                    name="fname"
                                                    autoFocus
                                                    value={fnvalues.flname}
                                                    onChange={handleFLChange("flname")}
                                                    inputProps={{ maxLength: 100 }}
                                                />
                                                <label>Last Name:</label>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="lname"
                                                    name="lname"
                                                    autoFocus
                                                    value={lnvalues.lnname}
                                                    onChange={handleLNChange("lnname")}
                                                    inputProps={{ maxLength: 100 }}
                                                />

                                                <label>Email Address:</label>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    name="email"
                                                    autoFocus
                                                    helperText={error ? "Perfect!" : "Email must in a correct email format"}
                                                    onChange={handleEmailChange("emailId")}
                                                    error={!error}
                                                />
                                                <label>Password:</label>
                                                <TextField
                                                    autoFocus
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    id="password"
                                                />
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ mt: 3, mb: 2 }}
                                                >
                                                    create
                                                </Button>
                                            </Box>
                                        </Typography>
                                    </Box>
                                </Modal>
                            </div>

                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
