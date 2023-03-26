import { useRef, useState } from "react";
import * as React from 'react';
import axios from 'axios';
import { Button, Typography, Box, Container, ImageListItem, ImageList } from "@mui/material";
import "./App.css";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";



export default function Fileupload() {
    const [resultText, setResultText] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [open, setOpen] = useState(false);

    const fileInput = useRef();

    const onSelectFile = async () => {
        await setOpen(true);
    };
    const getImage = async (e) => {
        const selectedFilesArray = Array.from(e.clipboardData.files);
        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        setSelectedImages((previousImages) => previousImages.concat(imagesArray));
        e.target.value = "";
        await setOpen(e?.clipboardData?.files?.length > 0 ? false : true);
        await uploadFile(e);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append('file', e.clipboardData.files[0]);
        formData.append('fileName', e.clipboardData.files[0].name);
        try {
            const res = await axios.post('http://localhost:8000/upload',
                formData
            )
            setResultText(res.data.message)
            fileInput.current.value = "";
            setTimeout(() => {
                setResultText("");
            })
        } catch (ex) {
            if (ex.response !== undefined) {
                setResultText(ex.response.data.message)
            }
            setTimeout(() => {
                setResultText("");
            }, 5000)
        }
    }


    return (
        <section>
            <Container>
                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={onSelectFile} >Upload Image</Button>
                    {resultText ? (<Typography variant="body1">{resultText}</Typography>) : null}
                </Box>
            </Container>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Image</DialogTitle>
                
                    <DialogContent>
                        <Box
                            sx={{
                                width: 300,
                                height: 300,
                                border: "1px solid black",
                                textAlign:"center",
                            }} onPaste={getImage}
                        >Image Paste Here...........</Box>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <ImageList className="images" cols={4}>
                {selectedImages.map((image) => (
                    <ImageListItem key={image.img}>
                        <img
                            src={image} height="200" alt="upload"
                            loading="lazy" />
                    </ImageListItem>
                ))}
            </ImageList>
        </section>
    )
}