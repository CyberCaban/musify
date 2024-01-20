import UploadForm from "../../components/uploadForm";
import Layout from "../../components/layout";
import { useDispatch } from "react-redux";
import { changeToken } from "../../store/appSlice";

export default function UploadPage() {
  // const token = useSelector((state: any) => state.userToken);
  const dispatch = useDispatch();

  const setToken = (text: string) => {
    dispatch(changeToken({ text }));
  };

  // console.log(token);

  return (
    <Layout>
      <UploadForm />
    </Layout>
  );
}
