import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonIcon from "@mui/icons-material/Person";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const generateRoomId = () => {
    const id = uuid();
    setRoomId(id);
    toast.success("New Room ID generated");
  };

  const joinRoom = () => {
    if (!roomId.trim() || !username.trim()) {
      toast.error("Both Room ID and Username are required");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    toast.success("Joined the room successfully!");
  };

  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      joinRoom();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Toaster position="top-right" />
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, bgcolor: "#1c1c1c" }}>
        <Box textAlign="center" mb={3}>
          <img
            src="/images/codecast.png"
            alt="Logo"
            style={{ width: "120px", marginBottom: "10px" }}
          />
          <Typography variant="h5" color="white" gutterBottom>
            Join a Collaboration Room
          </Typography>
          <Typography variant="body2" color="gray">
            Enter Room ID and Username to get started
          </Typography>
        </Box>

        <Stack spacing={2}>
          <TextField
            variant="filled"
            label="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleInputEnter}
            InputProps={{
              startAdornment: <MeetingRoomIcon sx={{ mr: 1 }} />,
              disableUnderline: true,
            }}
            sx={{
              bgcolor: "#2c2c2c",
              input: { color: "white" },
              label: { color: "gray" },
            }}
            fullWidth
          />
          <TextField
            variant="filled"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleInputEnter}
            InputProps={{
              startAdornment: <PersonIcon sx={{ mr: 1 }} />,
              disableUnderline: true,
            }}
            sx={{
              bgcolor: "#2c2c2c",
              input: { color: "white" },
              label: { color: "gray" },
            }}
            fullWidth
          />
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#00c853",
              "&:hover": { bgcolor: "#00b342" },
              fontWeight: "bold",
            }}
            onClick={joinRoom}
            fullWidth
          >
            Join Room
          </Button>

          <Typography
            variant="body2"
            color="gray"
            textAlign="center"
            mt={2}
          >
            Don’t have a Room ID?{" "}
            <span
              onClick={generateRoomId}
              style={{ color: "#00c853", cursor: "pointer", fontWeight: "bold" }}
            >
              Create One
            </span>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Home;
