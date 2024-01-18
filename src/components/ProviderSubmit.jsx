import Axios from "../Api/Axios";

const ProviderSubmit = () => {
  const handleSubmit = async (content) => {
    try {
      const response = await Axios.post(
        "auth/provider/auth",
        {
          content,
        },
        {
          withCredentials: true, // Inclure les informations du cookie
        }
      );
      window.location.href = "/profil";
    } catch (error) {
      console.error("Erreur lors de la requête" + error);
    }
  };

  return handleSubmit;
};

export default ProviderSubmit;
