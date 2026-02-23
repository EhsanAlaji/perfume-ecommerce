export default async function getAllCategories() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        method: "GET",
        next: { revalidate: 30 },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch categories:", response.status);
      return [];
    }

    const json = await response.json();

    return json?.data ?? [];

  } catch (error) {
    console.error("Fetch categories error:", error);
    return [];
  }
}