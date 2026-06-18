import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";
export const API_BASE_URL = API_URL.replace("/api/v1", "");

export function resolveMediaUrl(url) {
  if (!url) return "";

  const cleanUrl = String(url).trim();

  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    return cleanUrl;
  }

  if (cleanUrl.startsWith("/uploads")) {
    return `${API_BASE_URL}${cleanUrl}`;
  }

  if (cleanUrl.startsWith("uploads")) {
    return `${API_BASE_URL}/${cleanUrl}`;
  }

  if (cleanUrl.startsWith("/images")) {
    return cleanUrl;
  }

  if (cleanUrl.startsWith("images")) {
    return `/${cleanUrl}`;
  }

  return cleanUrl.startsWith("/") ? cleanUrl : `/${cleanUrl}`;
}

export default function useSiteContent(sectionKey, fallbackData) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchContent() {
      try {
        const response = await fetch(`${API_URL}/site-content`);
        const result = await response.json();

        if (!response.ok) {
          if (isMounted) setData(fallbackData);
          return;
        }

        const sectionData = result?.content?.[sectionKey];

        if (isMounted) {
          setData({
            ...fallbackData,
            ...(sectionData || {}),
          });
        }
      } catch (error) {
        console.error(`Erro ao carregar seção ${sectionKey}:`, error);

        if (isMounted) {
          setData(fallbackData);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, [sectionKey]);

  return {
    data,
    loading,
  };
}