import type { Category, Product } from "@/types/bazardor";

const API_BASE_URL =
  "https://openapi.programming-hero.com/api/bazardor";


async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `API request failed with status ${response.status}`
    );
  }

  return (await response.json()) as T;
}


export async function getCategories(): Promise<Category[]> {
  return request<Category[]>("/categories");
}


export async function getProducts(): Promise<Product[]> {
  return request<Product[]>("/products");
}


export async function getProductById(
  id: number
): Promise<Product> {
  return request<Product>(`/products/${id}`);
}


export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  return request<Product[]>(
    `/products?category=${encodeURIComponent(category)}`
  );
}