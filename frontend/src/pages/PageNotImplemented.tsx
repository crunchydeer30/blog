import Button from "../UI/Elements/Button/Button";
import { useNavigate } from "react-router-dom";

const PageNotImplemented = () => {
  const navigate = useNavigate();

  return (
    <section className="flex h-[90vh] flex-col gap-6 justify-center items-center">
      <h1 className="text-center text-3xl font-md">We're still working on this feauture</h1>
      <Button onClick={() => navigate(-1)} classes={['!text-sm']}>Go Back</Button>
    </section>
  )
}

export default PageNotImplemented;