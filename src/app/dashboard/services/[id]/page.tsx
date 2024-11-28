import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default function ServicePage({ params }: Props) {
  const { id } = params;

  if (id === 'asd') {
    notFound();
  }
  return (
    <>
      <h1>Service Page</h1>
      <p>Service with id: {id} not found</p>
    </>
  );
}
