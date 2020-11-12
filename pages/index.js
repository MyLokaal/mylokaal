import { connectToDatabase } from "../util/mongodb";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto p-4 text-center w-auto">
        <h1>My Lokaal</h1>
        <img
          src="/town.jpeg"
          alt="Small Town"
          className="w-2/4 mx-auto rounded-xl"
        />
        <p className="description">
          Connecting neighbors and helping the local economy.
        </p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  return {
    props: {},
  };
}
