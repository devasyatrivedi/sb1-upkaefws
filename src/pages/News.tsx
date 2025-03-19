import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Newspaper } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published_at: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-8">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          Error loading news: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Newspaper className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Daily Updates</h1>
      </div>

      {news.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
          No news articles available yet.
        </div>
      ) : (
        <div className="space-y-6">
          {news.map((item) => (
            <article key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-4">{item.content}</p>
                <time className="text-sm text-gray-500">
                  {new Date(item.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}