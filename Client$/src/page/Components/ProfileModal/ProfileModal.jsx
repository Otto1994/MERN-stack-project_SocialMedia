import { Modal, useMantineTheme } from '@mantine/core';
import React, { useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import { uploadImage } from '../../../actions/UploadAction';
import { updateUser } from '../../../actions/UserAction';

function ProfilModal({modelOpened,setmodelOpend,data}) {

  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const  user  = useSelector((state) => state.AuthReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profileImage = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverImage = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setmodelOpend(false);
  };
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modelOpened}
      onClose={()=>setmodelOpend(false)}
    >
      <form action="" className="infoForm">
        <h3>Vos information</h3>
        <div>
        <input type="text" className="infoInput" name="nom" id="" placeholder="Nom"  value={formData.nom}  onChange={handleChange}/>
        <input type="text" className="infoInput" name="prenom" id="" placeholder="Prénom"  value={formData.prenom} onChange={handleChange} />
        </div>
        <div>
       <input type="text" className="infoInput" name="Etude" id="" placeholder="Etudié à"  value={formData.Etude}onChange={handleChange} />
       </div>
       <div>
        <input type="text" className="infoInput" name="De" id="" placeholder="De"  value={formData.De} onChange={handleChange}/>
        <input type="text" className="infoInput" name="pays" id="" placeholder="Pays"  value={formData.pays}onChange={handleChange}/>
        </div>
        <div>
        <input type="text" className="infoInput" name="Status" id="" placeholder="Status"  value={formData.Status} onChange={handleChange}/>
        </div>
        <div>Photo de profil
        <input type="file" className="" name="profileImage" id="" onChange={onImageChange} />
        Photo de couverture
        <input type="file" className="" name="coverImage" id="" onChange={onImageChange} />
        </div>
        <button className='button infoButton' onClick={handleSubmit}>Modifier</button>
      </form>
    </Modal>
  );
}
export default ProfilModal