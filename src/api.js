const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/api/products`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export async function fetchRecommendations(preference) {
  const res = await fetch(`${BASE_URL}/api/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ preference }),
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); }
  catch { throw new Error(text || "Server error"); }

  if (!res.ok) throw new Error(data?.error || "Failed to get recommendations");
  return data;
}
