import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";

const ListTack = () => {
    const [list, setList] = useState([]);
    const dense = false;
    const url = "http://localhost:3000";

    const listTackFunction = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setList(json);
        } catch (error) {
            console.error(error);
        }
    };

    const handlerDelete = async (id) => {
        try {
            const responseDelete = await fetch(`${url}/${id}`, {
                method: 'DELETE'
            });

            if (!responseDelete.ok) {
                throw new Error(`Response status: ${responseDelete.status}`);
            }

            await listTackFunction(); 

        } catch (error) {
            console.error(error);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: "Нова задача",
                    discription: "опис",
                    status: "todo"
                })
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            await listTackFunction(); 

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        listTackFunction();
    }, []);

    return (
        <Box sx={{ maxWidth: 500, margin: '0 auto', mt: 4 }}>
            <Button variant="contained" onClick={handleCreate}>додати задачу</Button>
            <List dense={dense}>
                {list.map((listItem) => (
                    <ListItem
                        key={listItem.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => handlerDelete(listItem.id)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={listItem.title}
                            secondary={`Статус: ${listItem.status}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ListTack;
