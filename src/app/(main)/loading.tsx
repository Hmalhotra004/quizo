import Loader from "@/components/Loader";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );
};

export default loading;
