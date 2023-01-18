import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function UserList({ setLoggedIn }) {
    const [users, setUsers] = React.useState([])
    const navigate = useNavigate();
    React.useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const {data} = await axios.get('http://localhost:3002/api/v1/user', {
                    headers: ({
                        Authorization: 'Bearer ' + token
                    })
                });
                setUsers(data)

            } catch {
                setLoggedIn(false);
                navigate('/')
            }
        }
        fetchData();
    }, [navigate, setLoggedIn]);
    return (
        <Container>
            <Grid container spacing={2} marginTop={2}>

                    {users.map((user) => {
                        return <Grid item xs={12} md={4} key={user._id}>
                            <CardActionArea component="a" href="#">
                                <Card sx={{ display: 'flex' }}>
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography component="h2" variant="h5">
                                            <Link to={`/user/${user._id}`} style={{ textDecoration: "none", color: "black" }}>{user.fullname}</Link>
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            {user.email}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </Grid>
                    })}
            </Grid>
        </Container >
    );
}
