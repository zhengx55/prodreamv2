export default function FormElemnt({ params }: { params: { id: string } }) {
  const { id } = params;

  return <div>{id}</div>;
}
