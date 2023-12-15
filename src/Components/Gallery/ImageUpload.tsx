import { useContext, useState } from "react";
import { FireBaseAuthContext } from "../../Authentications/firebase/Context/firebase-auth-context";
import {
  SaveImageToUserGallery,
  UpdateGalleryImage,
} from "../../Services/Home/GalaryServices";
import { ImageDTO } from "../../DTOs/Home/ImageDTO";
import { useLocation } from "react-router-dom";
import './GalleryComponent.css'
import { TextField } from "@mui/material";

function ImageUpload() {
  const { state } = useLocation();
  const { appUserConfig } = useContext(FireBaseAuthContext);
  const [image, setImage] = useState<ImageDTO>(
    state ? state.image : ({} as ImageDTO)
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        debugger;
        setImage((prevImage) => ({
          ...prevImage,
          img_url: base64String,
          base64Str: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (state) {
      UpdateGalleryImage(appUserConfig.userId, image).then((result) => {
        alert(result.responseType);
        console.log(result);
      });
    } else {
      SaveImageToUserGallery(appUserConfig.userId, image).then((result) => {
        alert(result.responseType);
        console.log(result);
      });
    }
  };

  return (
    <div className="img_upload">
      <h1 className="text-center">Image Upload</h1>
      
      {/* <label>Image Name</label>
      <input
        type="text"
        value={image.img_name}
        onChange={(e) => setImage({ ...image, img_name: e.target.value })}
      /> */}
      {/* <label>Alternate text</label> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
          <div className="mt-3">
               <TextField
                fullWidth
                id="outlined-basic"
                label="Image Name"
                variant="outlined"
                value={image.img_name}
                onChange={(e) => setImage({ ...image, img_name: e.target.value })}
              />
               </div>
              <div className="my-4">
              <TextField
              fullWidth
                id="outlined-basic"
                label="Alternate text"
                variant="outlined"
                value={image.alt}
                onChange={(e) => setImage({ ...image, alt: e.target.value })}
              />
              </div>
              <div className="text-center"><input type="file" name="image" onChange={handleImageChange} /></div>
              <div className="text-center mt-3">
                <button onClick={handleSubmit}>{!state ? "Submit" : "Update"}</button>
              </div>
          </div>
          <div className="col-md-6">
            <div className="mt-3" style={{height:'300px'}}>
              <img src={image.base64Str} alt={image.alt} style={{width:'100%', height:'100%'}}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
