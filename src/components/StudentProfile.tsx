import React, { useState, ChangeEvent } from "react";
import { Avatar, Fab, Dialog, TextField, Button, List, ListItem, ListItemText, ListItemAvatar, Snackbar, Alert, IconButton as MuiIconButton, useTheme as useMuiTheme } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useAuthenticator } from "@aws-amplify/ui-react";


interface Item {
  title: string;
  description: string;
  cost: string;
  image: string;
}

const StudentProfile = () => {
  const { user } = useAuthenticator();
  const muiTheme = useMuiTheme(); 

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({ title: "", description: "", cost: "", image: "" });
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    if (!newItem.title || !newItem.cost || !newItem.image) {
      setError("Please fill out the title, cost, and upload an image.");
      return;
    }
    setItems([...items, newItem]);
    setNewItem({ title: "", description: "", cost: "", image: "" });
    handleDialogClose();
    setError(null);
  };

  const handleDeleteItem = (event: React.MouseEvent<HTMLElement>, index: number) => {
    event.stopPropagation();
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div
      className="profile-container"
      style={{
        backgroundColor: muiTheme.palette.background.default,
        color: muiTheme.palette.text.primary,
        minHeight: "85vh",
      }}
    >
      <div className="profile-avatar-container" style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <Avatar className="profile-avatar" src="/path/to/profile-pic.jpg" sx={{ marginTop: 1, width: 50, height: 50 }} />
        <Fab className="add-item-button" color="primary" onClick={handleDialogOpen} sx={{ marginTop: 1, marginLeft: "20px" }}>
          <AddIcon />
        </Fab>
        <h1 className="username" style={{ margin: "20px" }}>{user.signInDetails?.loginId}</h1>
      </div>

      <div className="list-container" style={{ marginTop: "20px", padding: "0 20px" }}>
        <List>
          {items.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                backgroundColor: muiTheme.palette.background.paper,
                color: muiTheme.palette.text.primary,
                marginBottom: "10px",
                borderRadius: "8px",
              }}
              onClick={() => setSelectedItem(item)}
            >
              <ListItemAvatar>
                <Avatar src={item.image} alt={item.title} />
              </ListItemAvatar>
              <ListItemText 
                primary={item.title} 
                secondary={`$${item.cost} - ${item.description}`} 
                primaryTypographyProps={{ color: "inherit" }}
                secondaryTypographyProps={{ color: "textSecondary" }}
              />
              <MuiIconButton color="inherit" onClick={(e) => handleDeleteItem(e, index)}>
                <DeleteIcon />
              </MuiIconButton>
            </ListItem>
          ))}
        </List>
      </div>

      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert
            onClose={() => setError(null)}
            severity="error"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <div className="dialog-content" style={{ 
          padding: "20px", 
          backgroundColor: muiTheme.palette.background.paper, 
          color: muiTheme.palette.text.primary 
        }}>
          <TextField label="Title" name="title" value={newItem.title} onChange={handleInputChange} fullWidth sx={{ marginBottom: "10px" }} />
          <TextField label="Description" name="description" value={newItem.description} onChange={handleInputChange} fullWidth sx={{ marginBottom: "10px" }} />
          <TextField label="Cost" name="cost" type="number" value={newItem.cost} onChange={handleInputChange} fullWidth sx={{ marginBottom: "10px" }} />
          <Button variant="contained" component="label" sx={{ marginBottom: "10px" }}>
            Upload Image
            <input type="file" hidden onChange={(e) => setNewItem({ ...newItem, image: URL.createObjectURL(e.target.files![0]) })} />
          </Button>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleAddItem}>Add Item</Button>
            <Button variant="outlined" onClick={handleDialogClose}>Cancel</Button>
          </div>
        </div>
      </Dialog>

      {selectedItem && (
        <Dialog open={Boolean(selectedItem)} onClose={() => setSelectedItem(null)}>
          <div className="dialog-content" style={{ 
            padding: "20px", 
            textAlign: "center", 
            backgroundColor: muiTheme.palette.background.paper, 
            color: muiTheme.palette.text.primary 
          }}>
            <h2>{selectedItem.title}</h2>

            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              style={{
                width: "80%",
                height: "auto",
                maxWidth: "500px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            />

            <h3>{`$${selectedItem.cost}`}</h3>
            <p>{selectedItem.description}</p>
            <p><strong>Posted by:</strong> {user.signInDetails?.loginId}</p>

            <Button variant="outlined" onClick={() => setSelectedItem(null)} sx={{ marginTop: "10px" }}>Close</Button>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default StudentProfile;