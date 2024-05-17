import { paths } from '../../ssg-cache/[[...path]]';

export default async function handler(_, res) {
  try {
    await revalidatePathArray(paths, res);
  } catch (error) {
    console.error(error);
  }
  res.json({ paths });
}

async function revalidatePathArray(paths, res) {
  for (const path of paths) {
    await res.revalidate(path);
  }
}
