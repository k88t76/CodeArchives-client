const url = 'https://codearchives-server.dt.r.appspot.com';

export default function Form({
  path,
  handleSubmit,
  handleChange,
}: {
  path: string;
  handleSubmit: (e) => Promise<void>;
  handleChange: (e) => void;
}) {
  const handleButton = (path: string) => {
    if (path === 'signin') {
      return 'Sign in';
    } else if (path === 'signup') {
      return 'Sign up';
    }
  };

  return (
    <form action={`${url}/${path}`} method="post" onSubmit={handleSubmit}>
      <label>UserName</label>
      <div>
        <input type="text" placeholder="Enter UserName" name="name" onChange={handleChange} required />
      </div>
      <label>Password</label>
      <div>
        <input type="password" placeholder="Enter Password" name="password" onChange={handleChange} required />
      </div>
      <button type="submit">{handleButton(path)}</button>
    </form>
  );
}
