import { useState, useEffect } from 'react';

interface LinkPreview {
  url: string;
  title: string;
  description: string;
  image: string;
  favicon: string;
  error?: string;
  loading: boolean;
}

const defaultPreview: LinkPreview = {
  url: '',
  title: '',
  description: '',
  image: '',
  favicon: '',
  loading: true
};

/**
 * Custom hook to fetch link preview data from a URL
 * Uses the free LinkPreview API service
 */
export function useLinkPreview(url: string): LinkPreview {
  const [preview, setPreview] = useState<LinkPreview>(defaultPreview);

  useEffect(() => {
    let isMounted = true;
    setPreview({ ...defaultPreview, url, loading: true });

    const fetchPreview = async () => {
      try {
        // Using Microlink API (free tier)
        const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (!isMounted) return;
        
        if (data.status === 'success') {
          setPreview({
            url,
            title: data.data.title || '',
            description: data.data.description || '',
            image: data.data.image?.url || '',
            favicon: data.data.logo?.url || '',
            loading: false
          });
        } else {
          setPreview({
            ...defaultPreview,
            url,
            error: 'Failed to fetch preview',
            loading: false
          });
        }
      } catch (error) {
        if (!isMounted) return;
        setPreview({
          ...defaultPreview,
          url,
          error: 'Error fetching preview',
          loading: false
        });
      }
    };

    fetchPreview();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return preview;
}

export default useLinkPreview; 