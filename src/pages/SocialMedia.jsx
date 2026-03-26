import React, { useEffect, useMemo, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { useSiteContent, useUpdateSiteContent } from "../api/hooks/useSiteContent";

const platforms = ["youtube", "linkedin", "instagram", "twitter", "facebook", "reddit"];

const Toggle = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between gap-3">
    <span className="text-sm font-medium text-slate-700">{label}</span>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
        checked ? "bg-emerald-500" : "bg-slate-300"
      }`}
    >
      <span className={`inline-block h-6 w-6 rounded-full bg-white transition-transform ${checked ? "translate-x-7" : "translate-x-1"}`} />
    </button>
  </div>
);

const parseMultilineJson = (raw, fallback) => {
  try {
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const SocialMedia = () => {
  const { data, isLoading } = useSiteContent();
  const update = useUpdateSiteContent();

  const initial = useMemo(() => {
    const social = data?.socialMedia || {};
    const links = social.links || {};
    const normalizedLinks = {};
    platforms.forEach((p) => {
      normalizedLinks[p] = {
        enabled: !!links[p]?.enabled,
        url: links[p]?.url || "",
      };
    });
    return {
      enabled: !!social.enabled,
      links: normalizedLinks,
      youtubeVideos: social.youtubeVideos || [],
      linkedinPosts: social.linkedinPosts || [],
      instagramPosts: social.instagramPosts || [],
    };
  }, [data]);

  const [form, setForm] = useState(initial);
  const [youtubeJson, setYoutubeJson] = useState(JSON.stringify(initial.youtubeVideos || [], null, 2));
  const [linkedinJson, setLinkedinJson] = useState(JSON.stringify(initial.linkedinPosts || [], null, 2));
  const [instagramJson, setInstagramJson] = useState(JSON.stringify(initial.instagramPosts || [], null, 2));

  useEffect(() => {
    setForm(initial);
    setYoutubeJson(JSON.stringify(initial.youtubeVideos || [], null, 2));
    setLinkedinJson(JSON.stringify(initial.linkedinPosts || [], null, 2));
    setInstagramJson(JSON.stringify(initial.instagramPosts || [], null, 2));
  }, [initial]);

  if (isLoading) return <div className="p-6"><Loader2 className="animate-spin" /></div>;

  const save = () => {
    const payload = {
      socialMedia: {
        ...form,
        youtubeVideos: parseMultilineJson(youtubeJson, []),
        linkedinPosts: parseMultilineJson(linkedinJson, []),
        instagramPosts: parseMultilineJson(instagramJson, []),
      },
    };
    update.mutate(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Social Media</h1>
        <button onClick={save} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white">
          {update.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
        </button>
      </div>

      <section className="bg-white p-4 rounded-xl border space-y-3">
        <Toggle label="Show social media section on website" checked={form.enabled} onChange={(v) => setForm((f) => ({ ...f, enabled: v }))} />
      </section>

      <section className="bg-white p-4 rounded-xl border space-y-4">
        <h3 className="font-semibold text-slate-800">Platform Controls</h3>
        {platforms.map((p) => (
          <div key={p} className="grid md:grid-cols-3 gap-2 items-center">
            <Toggle
              label={`${p[0].toUpperCase()}${p.slice(1)} enabled`}
              checked={!!form.links[p]?.enabled}
              onChange={(v) =>
                setForm((f) => ({ ...f, links: { ...f.links, [p]: { ...(f.links[p] || {}), enabled: v } } }))
              }
            />
            <input
              className="md:col-span-2 border rounded-lg px-3 py-2"
              placeholder={`${p} profile URL`}
              value={form.links[p]?.url || ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, links: { ...f.links, [p]: { ...(f.links[p] || {}), url: e.target.value } } }))
              }
            />
          </div>
        ))}
      </section>

      <section className="bg-white p-4 rounded-xl border space-y-3">
        <h3 className="font-semibold text-slate-800">YouTube videos (optional manual override)</h3>
        <p className="text-xs text-slate-500">Blank/[] rakho to latest videos profile URL se auto-fetch honge.</p>
        <textarea className="w-full min-h-[160px] border rounded-lg px-3 py-2 font-mono text-xs" value={youtubeJson} onChange={(e) => setYoutubeJson(e.target.value)} />
      </section>

      <section className="bg-white p-4 rounded-xl border space-y-3">
        <h3 className="font-semibold text-slate-800">LinkedIn posts (array of {'{'} title, embedUrl {'}'})</h3>
        <textarea className="w-full min-h-[160px] border rounded-lg px-3 py-2 font-mono text-xs" value={linkedinJson} onChange={(e) => setLinkedinJson(e.target.value)} />
      </section>

      <section className="bg-white p-4 rounded-xl border space-y-3">
        <h3 className="font-semibold text-slate-800">Instagram posts (array of {'{'} title, url {'}'})</h3>
        <textarea className="w-full min-h-[160px] border rounded-lg px-3 py-2 font-mono text-xs" value={instagramJson} onChange={(e) => setInstagramJson(e.target.value)} />
      </section>
    </div>
  );
};

export default SocialMedia;

