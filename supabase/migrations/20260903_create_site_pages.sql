-- Migration: create site_pages table for custom admin-configurable pages
CREATE TABLE IF NOT EXISTS public.site_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    sitemap_priority NUMERIC(2,1) NOT NULL DEFAULT 0.7,
    sitemap_changefreq TEXT NOT NULL DEFAULT 'weekly',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for efficient lookup and sitemap generation
CREATE INDEX IF NOT EXISTS site_pages_slug_idx ON public.site_pages(slug);
CREATE INDEX IF NOT EXISTS site_pages_is_published_idx ON public.site_pages(is_published);

-- Row level security
ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published pages
CREATE POLICY "Public published pages are viewable by everyone"
    ON public.site_pages
    FOR SELECT
    USING (is_published = true);
