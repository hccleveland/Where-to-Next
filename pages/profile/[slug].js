import { useRouter } from 'next/router';

function Profile() {
  const router = useRouter();
  const { slug } = router.query;

  // Fetch blog post data using slug

  return (
    <div>
      <h1>{slug}</h1>
      <p>{slug}</p>
    </div>
  );
}

export default Profile;
