export async function getBrainstormDetails(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}get_template?lang=en`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        },
      }
    );
  } catch (error) {}
}
