import React, { useState, ChangeEvent } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Badge, Fab, Dialog, TextField, Button, List, ListItem, ListItemText, ListItemAvatar, Snackbar, Alert, IconButton as MuiIconButton,} from "@mui/material";
import { Menu as MenuIcon, Notifications as NotificationsIcon, Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useAuthenticator } from "@aws-amplify/ui-react";

interface Item {
  title: string;
  description: string;
  cost: string;
  image: string;
}

const StudentProfile = () => {
  const { user, signOut } = useAuthenticator();

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({ title: "", description: "", cost: "", image: "" });
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);
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
    event.stopPropagation(); // Prevent triggering the item click handler
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="profile-container" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose} sx={{ padding: '10px' }}>
            <MenuItem onClick={handleMenuClose} sx={{ color: '#1976d2' }}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ color: '#1976d2' }}>Settings</MenuItem>
            <MenuItem onClick={handleSignOut} sx={{ color: '#d32f2f' }}>Logout</MenuItem>
          </Menu>
          <h1 className="app-title" style={{ flexGrow: 1, color: '#fff' }}>Mville SecondHand</h1>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="profile-avatar-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginLeft: '20px' }}>
        <Avatar className="profile-avatar" src="/path/to/profile-pic.jpg" sx={{ width: 50, height: 50 }} />
        <Fab className="add-item-button" color="primary" onClick={handleDialogOpen} sx={{ marginLeft: '20px' }}>
          <AddIcon />
        </Fab>
        <h1 className="username" style={{ margin: '20px' }}>{user.signInDetails?.loginId}</h1>
      </div>

      <div className="list-container" style={{ marginTop: '20px', padding: '0 20px' }}>
        <List>
          {items.map((item, index) => (
            <ListItem
              key={index}
              sx={{ backgroundColor: '#fff', marginBottom: '10px', borderRadius: '8px' }}
              onClick={() => setSelectedItem(item)}
            >
              <ListItemAvatar>
                <Avatar src={item.image} alt={item.title} />
              </ListItemAvatar>
              <ListItemText primary={item.title} secondary={`$${item.cost} - ${item.description}`} />
              <MuiIconButton color="inherit" onClick={(e) => handleDeleteItem(e, index)}>
                <DeleteIcon />
              </MuiIconButton>
            </ListItem>
          ))}
        </List>
      </div>

      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error" sx={{ backgroundColor: '#f44336' }}>
            {error}
          </Alert>
        </Snackbar>
      )}

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <div className="dialog-content" style={{ padding: '20px' }}>
          <TextField label="Title" name="title" value={newItem.title} onChange={handleInputChange} fullWidth sx={{ marginBottom: '10px' }} />
          <TextField label="Description" name="description" value={newItem.description} onChange={handleInputChange} fullWidth sx={{ marginBottom: '10px' }} />
          <TextField label="Cost" name="cost" type="number" value={newItem.cost} onChange={handleInputChange} fullWidth sx={{ marginBottom: '10px' }} />
          <Button variant="contained" component="label" sx={{ marginBottom: '10px' }}>
            Upload Image
            <input type="file" hidden onChange={(e) => setNewItem({ ...newItem, image: URL.createObjectURL(e.target.files![0]) })} />
          </Button>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleAddItem}>Add Item</Button>
            <Button variant="outlined" onClick={handleDialogClose}>Cancel</Button>
          </div>
        </div>
      </Dialog>

      {selectedItem && (
        <Dialog open={Boolean(selectedItem)} onClose={() => setSelectedItem(null)}>
          <div className="dialog-content" style={{ padding: '20px', textAlign: 'center' }}>
            <h2>{selectedItem.title}</h2>

            {/* Large rectangular image */}
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              style={{
                width: '80%', // Makes the image larger
                height: 'auto', // Keeps the aspect ratio
                maxWidth: '500px', // Limits the maximum width
                marginBottom: '10px',
                borderRadius: '8px', // Makes the corners slightly rounded
              }}
            />

            <h3>{`$${selectedItem.cost}`}</h3>
            <p>{selectedItem.description}</p>
            <p><strong>Posted by:</strong> {user.signInDetails?.loginId}</p>

            <Button variant="outlined" onClick={() => setSelectedItem(null)} sx={{ marginTop: '10px' }}>Close</Button>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default StudentProfile;
