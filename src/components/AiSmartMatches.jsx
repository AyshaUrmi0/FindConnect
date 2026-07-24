import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Wand2, MapPin, Tag, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/Authcontext/ThemeContext';

const AiSmartMatches = ({ currentItem }) => {
  const { theme } = useContext(ThemeContext);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  const fetchMatches = async () => {
    if (!currentItem) return;
    setIsLoading(true);
    setError(null);

    try {
      // 1. Fetch all items
      const res = await fetch("https://find-connect-server.vercel.app/allItems");
      const allItems = await res.json();

      // 2. Filter candidates (exclude current item)
      const currentType = (currentItem.type || currentItem.postType || 'Lost').toLowerCase();
      const targetType = currentType === 'lost' ? 'found' : 'lost';

      const validCandidates = allItems.filter(item => {
        if (!item || item._id === currentItem._id) return false;
        const itemType = (item.type || item.postType || '').toLowerCase();
        return itemType === targetType || itemType === currentType;
      });

      if (validCandidates.length === 0) {
        setMatches([]);
        setIsLoading(false);
        setHasSearched(true);
        return;
      }

      // 3. Try Gemini AI Matching if API Key exists
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (apiKey) {
        try {
          const prompt = `
You are an expert Lost & Found AI Matcher for FindConnect.
Compare the Target Item with the candidate items below and calculate a similarity match score (0 to 100%) for each candidate.

Target Item:
- Title: "${currentItem.title}"
- Category: "${currentItem.category}"
- Location: "${currentItem.location}"
- Description: "${currentItem.description}"
- Date: "${currentItem.date}"

Candidate Items:
${validCandidates.slice(0, 10).map((item, idx) => `
[Item ${idx + 1}]
- ID: "${item._id}"
- Title: "${item.title}"
- Category: "${item.category}"
- Location: "${item.location}"
- Description: "${item.description}"
- Date: "${item.date}"
`).join('')}

Return JSON array only, formatted exactly like:
[
  { "id": "candidate_id", "score": 85, "reason": "Short 1-sentence match explanation" }
]
Only include candidates with a score >= 40.
`;

          const aiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
              })
            }
          );

          if (aiRes.ok) {
            const aiData = await aiRes.json();
            const textResponse = aiData.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textResponse) {
              const aiScores = JSON.parse(textResponse);
              const scoredMatches = aiScores
                .map(sc => {
                  const foundItem = validCandidates.find(c => c._id === sc.id);
                  if (!foundItem) return null;
                  return {
                    ...foundItem,
                    score: Math.min(100, Math.max(0, sc.score)),
                    reason: sc.reason || 'AI visually & contextually matched details'
                  };
                })
                .filter(Boolean)
                .sort((a, b) => b.score - a.score);

              setMatches(scoredMatches);
              setIsLoading(false);
              setHasSearched(true);
              return;
            }
          }
        } catch (aiErr) {
          console.warn("Gemini AI match fallback activated:", aiErr);
        }
      }

      // 4. Fallback Heuristic Matcher (Keyword + Category + Location Similarity)
      const targetTokens = `${currentItem.title} ${currentItem.description} ${currentItem.category} ${currentItem.location}`
        .toLowerCase()
        .split(/\W+/)
        .filter(w => w.length > 2);

      const scoredFallback = validCandidates.map(item => {
        let score = 0;
        let reasons = [];

        // Category match
        if (item.category && currentItem.category && item.category.toLowerCase() === currentItem.category.toLowerCase()) {
          score += 45;
          reasons.push(`Matching category (${item.category})`);
        }

        // Title & Description keyword overlap
        const itemText = `${item.title} ${item.description}`.toLowerCase();
        let keywordHits = 0;
        targetTokens.forEach(token => {
          if (itemText.includes(token)) {
            keywordHits++;
          }
        });

        if (keywordHits > 0) {
          const keywordScore = Math.min(40, keywordHits * 12);
          score += keywordScore;
          reasons.push(`Matched key terms`);
        }

        // Location match
        if (item.location && currentItem.location && item.location.toLowerCase().includes(currentItem.location.toLowerCase())) {
          score += 15;
          reasons.push(`Matching location (${item.location})`);
        }

        return {
          ...item,
          score: Math.min(98, score),
          reason: reasons.join(' • ') || 'Keyword similarity match'
        };
      })
      .filter(item => item.score >= 35)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

      setMatches(scoredFallback);
    } catch (err) {
      console.error("AI Match Error:", err);
      setError("Failed to analyze potential matches. Please try again.");
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [currentItem?._id]);

  return (
    <div className={`w-full mt-10 p-6 rounded-2xl shadow-xl backdrop-blur-sm border ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-purple-950/40 via-gray-900/40 to-indigo-950/40 border-purple-800/40'
        : 'bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/80 border-purple-200/80'
    }`}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b ${
        theme === 'dark' ? 'border-purple-900/50' : 'border-purple-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl text-white shadow-lg shadow-purple-500/20">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 dark:from-purple-400 dark:to-indigo-300 bg-clip-text text-transparent flex items-center gap-2">
              AI Smart Matches
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                theme === 'dark'
                  ? 'bg-purple-900/60 text-purple-300 border-purple-700'
                  : 'bg-purple-100 text-purple-700 border-purple-200'
              }`}>
                Gemini Powered
              </span>
            </h2>
            <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Automatically scanning opposite reports to find matching items
            </p>
          </div>
        </div>

        <button
          onClick={fetchMatches}
          disabled={isLoading}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-all shadow-sm active:scale-95 disabled:opacity-50 ${
            theme === 'dark'
              ? 'text-purple-300 bg-gray-800 border-purple-700 hover:bg-gray-700'
              : 'text-purple-700 bg-white border-purple-200 hover:bg-purple-50'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Scanning...' : 'Rescan AI Matches'}
        </button>
      </div>

      {/* Content Body */}
      <div className="mt-6">
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="relative">
              <div className="w-14 h-14 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <Wand2 className="w-6 h-6 text-purple-600 absolute inset-0 m-auto animate-pulse" />
            </div>
            <p className="mt-4 text-sm font-medium text-purple-700 dark:text-purple-300 animate-pulse">
              AI is analyzing item descriptions, images & locations...
            </p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        ) : matches.length === 0 && hasSearched ? (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            <Wand2 className="w-10 h-10 mx-auto text-purple-400/50 mb-2" />
            <p className="text-sm font-medium">No direct AI matches found yet.</p>
            <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">
              We'll notify you as new opposite items are reported!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {matches.map((item, idx) => (
                <motion.div
                  key={item._id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="group relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600 transition-all flex flex-col justify-between"
                >
                  {/* Score Tag */}
                  <div className="absolute top-2 right-2 z-10">
                    <span className="inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md">
                      <Sparkles className="w-3 h-3" />
                      {item.score}% Match
                    </span>
                  </div>

                  <div>
                    {/* Item Image */}
                    <div className="h-36 w-full overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                      <img
                        src={item.image || item.file || 'https://via.placeholder.com/300x200?text=No+Image'}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className={`absolute bottom-2 left-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded text-white ${
                        (item.type || item.postType) === 'Lost' ? 'bg-red-500' : 'bg-green-500'
                      }`}>
                        {item.type || item.postType || 'Item'}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-1 line-clamp-1 italic">
                        "{item.reason}"
                      </p>

                      <div className="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                        {item.location && (
                          <div className="flex items-center gap-1.5 line-clamp-1">
                            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <span>{item.location}</span>
                          </div>
                        )}
                        {item.category && (
                          <div className="flex items-center gap-1.5 line-clamp-1">
                            <Tag className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <span>{item.category}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <div className="px-4 pb-4 pt-1">
                    <Link
                      to={`/items/${item._id}`}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white rounded-lg transition-all"
                    >
                      <span>View Matched Item</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiSmartMatches;
