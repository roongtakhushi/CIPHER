import React, { useState } from 'react';
import { FAQ_DATA, FAQItem } from '../data/faq';
import { sound } from '../utils/sound';
import { Search, ChevronDown, HelpCircle, AlertCircle, Tag } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const toggleAccordion = (id: string) => {
    sound.click(600, 0.025);
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full corkboard-texture text-canvas pb-28 pt-4 px-4 md:px-8 border-b-2 border-canvas" id="faq">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-10">
        
        {/* Header & Instant Search Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-canvas/20">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-pink"></span>
              <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-pink font-bold">
                NOTICE BOARD • FREQUENT INQUIRIES
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-canvas">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="font-body text-base md:text-lg text-canvas/80 max-w-xl">
              Straightforward answers to the questions we get most. No corporate speak, just honest council facts.
            </p>
          </div>

          {/* Search Input (Angular UI Pattern) */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-canvas/50 pointer-events-none" />
            <input
              type="text"
              inputMode="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (branch, hours, hackathon)..."
              className="w-full bg-white border-2 border-canvas pl-9 pr-8 py-2.5 font-mono text-base md:text-xs text-canvas outline-none focus:border-pink shadow-hard-sm placeholder-canvas/40 min-h-[44px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 min-w-[36px] min-h-[36px] flex items-center justify-center font-mono text-sm text-canvas/60 hover:text-canvas cursor-pointer"
                title="Clear search"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Accordion Stack of Index Cards with Paperclips */}
        <div className="flex flex-col gap-5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  style={{ transform: `rotate(${faq.tilt}deg)` }}
                  className={`faq-item relative bg-white p-6 sm:p-7 border-2 border-canvas shadow-hard-md transition-all cursor-pointer select-none group ${
                    isOpen ? 'active shadow-hard-card-hover border-l-[6px] border-l-pink bg-[#FFFDF9]' : 'hover:bg-[#FCFAF2]'
                  }`}
                  onClick={() => toggleAccordion(faq.id)}
                >
                  {/* Metallic Paperclip Graphic SVG pinned over card edge */}
                  <div className="absolute -top-3.5 left-6 w-5 h-9 pointer-events-none z-10">
                    <svg viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 12V34C6 38.4183 9.58172 42 14 42C18.4183 42 22 38.4183 22 34V8C22 4.68629 19.3137 2 16 2C12.6863 2 10 4.68629 10 8V32C10 33.1046 10.8954 34 12 34C13.1046 34 14 33.1046 14 32V12"
                        stroke="#0A0E17"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 12V34C6 38.4183 9.58172 42 14 42C18.4183 42 22 38.4183 22 34V8C22 4.68629 19.3137 2 16 2C12.6863 2 10 4.68629 10 8V32C10 33.1046 10.8954 34 12 34C13.1046 34 14 33.1046 14 32V12"
                        stroke="#DFE2EF"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="flex items-start sm:items-center justify-between gap-4 pl-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <span className="font-mono text-xl font-bold text-pink">{faq.number}.</span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-canvas leading-tight group-hover:text-pink transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden md:flex items-center gap-1.5">
                        {faq.tags.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] bg-paper text-canvas/70 border border-canvas/20 px-2 py-0.5 font-bold uppercase"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-canvas transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-pink' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-5 pt-4 pl-8 border-t border-dashed border-canvas/25 font-body text-base text-canvas/90 leading-relaxed animate-fadeIn">
                      <p className="max-w-3xl">{faq.answer}</p>
                      
                      {/* Interactive tag pill footer */}
                      <div className="flex md:hidden items-center gap-1.5 pt-3">
                        {faq.tags.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] bg-paper text-canvas/70 border border-canvas/20 px-2 py-0.5 font-bold uppercase"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            /* Empty State Pattern (Angular UI Pattern: @empty) */
            <div className="bg-white p-10 border-2 border-dashed border-canvas/40 text-center flex flex-col items-center justify-center gap-3 shadow-hard-sm">
              <AlertCircle className="w-9 h-9 text-pink" />
              <h4 className="font-display text-xl font-bold text-canvas">No questions match your search</h4>
              <p className="font-body text-sm text-canvas/70 max-w-md">
                We couldn't find any questions matching "{searchQuery}". You can try another keyword or reach out directly to the council team.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 btn-paper-secondary !text-xs !py-1.5 !px-4"
              >
                Clear Search Filter
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
