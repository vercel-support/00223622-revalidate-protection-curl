export const paths = [
  '/ssg-cache/1',
  '/ssg-cache/2',
  '/ssg-cache/3',
  '/ssg-cache/4',
];

export function getStaticPaths() {
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params, ...props }) {
  console.log({ props, params });
  const id = params.path.join('/').split('/').at(-1);
  const post = await fetch(
    'https://jsonplaceholder.typicode.com/posts/' + id
  ).then((response) => response.json());
  const date = new Date().toISOString();
  return { props: { path: params.path.join('/'), post, date } };
}

export default function Page({ path, post, date }) {
  return (
    <div>
      <span>
        Path: {path} ({date})
      </span>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
}
