import Axios from "../../Api/Axios";
import useRefreshToken from "../../hooks/useRefresh";
import { useAuth } from "../../context/authContext";
import { storage } from "../../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const SubmitForm = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  const handleSubmit = async (name, id, title, image, content, description) => {
    console.log(name, id, title, image, content, description);
    const randomNumber = Math.floor(Math.random() * Date.now());
    const imageRef = ref(storage, `Images/${randomNumber}`);
    await uploadBytes(imageRef, image);
    const downloadURL = await getDownloadURL(imageRef);
    try {
      const response = await Axios.post(
        "/profil/create",
        {
          name,
          id,
          title,
          image: downloadURL,
          content,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      return "Ok";
    } catch (error) {
      // Vérifier si l'erreur est due à un jeton expiré
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.error === "Token expired"
      ) {
        try {
          const newAccessToken = await refresh();
          setAuth((prev) => ({
            ...prev,
            accessToken: newAccessToken,
          }));
          const response = await Axios.post("/profil/create", formData, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });
          return "Ok";
        } catch (error) {
          throw error; // Propagate the error if the second attempt also fails
        }
      }
      throw error;
    }
  };

  return handleSubmit;
};
export default SubmitForm;
