// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { Search, Loader, PlayIcon, ExternalLink, SpeechIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

function Home() {
  const searchRef = useRef();
  const [urlParams, setUrlParams] = useSearchParams();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch word from API
  useEffect(() => {
    const word = urlParams.get("sq")?.trim() || "";
    if (word === "") {
      setApiData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setApiData(data[0]);
        else setApiData(data);
      })
      .catch((err) => {
        console.error(err);
        setApiData({ title: "No Definitions Found", message: "Sorry, word not found." });
      })
      .finally(() => setLoading(false));
  }, [urlParams]);

  // Handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const val = searchRef.current.value.trim().toLowerCase();
    setUrlParams({ sq: val || "" });
  };

  return (
    <>
      <Header />

      <main className="max-w-[735px] mx-auto p-6 pt-0">
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <input
              ref={searchRef}
              defaultValue={urlParams.get("sq") || ""}
              placeholder="Search a word..."
              className="flex-1 px-4 py-2 outline-none bg-transparent text-gray-900 dark:text-white"
            />
            <button type="submit" className="px-4 flex items-center justify-center text-purple-600 hover:text-purple-400">
              <Search size={20} />
            </button>
          </div>
        </form>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader className="animate-spin text-purple-600" size={40} />
          </div>
        )}

        {/* No search or empty */}
        {!loading && (!urlParams.get("sq") || urlParams.get("sq") === "") && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <span className="text-[64px]">😊</span>
            <span className="font-bold mt-2">Nothing was searched</span>
          </div>
        )}

        {/* API Error */}
        {!loading && apiData?.title && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <span className="text-[64px]">😕</span>
            <h2 className="font-bold text-xl mt-2">{apiData.title}</h2>
            <p className="mt-1 text-gray-500">{apiData.message}</p>
          </div>
        )}

        {/* Word content */}
        {!loading && apiData && !apiData.title && (
          <div className="space-y-6">
            {/* Word + phonetic + audio */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{apiData.word}</h1>
                <span className="text-purple-600 text-lg">{apiData.phonetic}</span>
              </div>
              {apiData.phonetics?.some(p => p.audio) && (
                <button
                  className="p-3 bg-purple-200 dark:bg-purple-700 rounded-full"
                  onClick={() => {
                    const audioSrc = apiData.phonetics.find(p => p.audio)?.audio;
                    if (audioSrc) new Audio(audioSrc).play();
                  }}
                >
                  <PlayIcon size={20} className="text-purple-700 dark:text-white" />
                </button>
              )}
            </div>

            {/* Meanings */}
            {apiData.meanings?.map((m, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="italic font-semibold text-gray-700 dark:text-gray-200">{m.partOfSpeech}</h3>
                <ul className="list-disc list-inside space-y-1">
                  {m.definitions?.map((d, i) => (
                    <li key={i}>{d.definition}</li>
                  ))}
                </ul>
                {m.synonyms?.length > 0 && (
                  <p>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Synonyms:</span>{" "}
                    <span className="text-purple-600">{m.synonyms.join(", ")}</span>
                  </p>
                )}
              </div>
            ))}

            {/* Sources */}
            {apiData.sourceUrls?.length > 0 && (
              <div>
                <h4 className="text-gray-500 dark:text-gray-400 mb-1">Source:</h4>
                {apiData.sourceUrls.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    className="text-purple-600 hover:text-purple-400 block"
                  >
                    {url} <ExternalLink size={16} className="inline" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}

export default Home;