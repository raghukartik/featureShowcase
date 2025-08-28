import { useState, useEffect, useRef } from "react";
import { features } from "../data/features";

export default function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  const showcaseRef = useRef(null);
  const autoScrollRef = useRef(null);

  // Intersection Observer for sticky behavior and auto-scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);

        // Trigger auto-scroll when section comes into view
        if (entry.isIntersecting && !hasAutoScrolled) {
          setHasAutoScrolled(true);
          autoScrollFeatures();
        }
      },
      {
        threshold: 0.3,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }

    return () => observer.disconnect();
  }, [hasAutoScrolled]);

  // Auto-scroll through features
  const autoScrollFeatures = () => {
    let currentIndex = 0;

    const scrollInterval = setInterval(() => {
      currentIndex++;
      if (currentIndex < features.length) {
        setActiveIndex(currentIndex);
      } else {
        clearInterval(scrollInterval);
      }
    }, 1500); // 1.5s per feature

    autoScrollRef.current = scrollInterval;
  };

  // Navigation functions
  const nextFeature = () => {
    // Clear auto-scroll when user interacts
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    // Clear auto-scroll when user interacts
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    setActiveIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const selectFeature = (index) => {
    // Clear auto-scroll when user interacts
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    setActiveIndex(index);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  const currentFeature = features[activeIndex];

  return (
    <div className="w-full">
      {/* Spacer to allow scroll into view */}
      <div className="h-32"></div>

      <section
        ref={showcaseRef}
        className={`${
          isInView ? "sticky top-0" : ""
        } bg-white py-8 md:py-16 min-h-screen transition-all duration-300 z-10`}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Left Side - Feature Content */}
            <div className="lg:col-span-1 order-2 lg:order-1 space-y-6">
              {/* Feature Title */}
              <div className="space-y-2">
                <h3 className="text-blue-500 font-medium text-lg transition-all duration-500">
                  {currentFeature.title}
                </h3>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight transition-all duration-500">
                  {currentFeature.heading}
                </h2>
              </div>

              {/* Feature Description */}
              <ul className="space-y-3 text-gray-600 leading-relaxed">
                {currentFeature.description.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 transition-all duration-500"
                    style={{
                      animationDelay: `${i * 100}ms`,
                      opacity: 1,
                      transform: "translateY(0)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></span>
                    <span className="text-sm md:text-base">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={prevFeature}
                  className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-all duration-200 hover:bg-gray-50 active:scale-95"
                  aria-label="Previous feature"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextFeature}
                  className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-all duration-200 hover:bg-gray-50 active:scale-95"
                  aria-label="Next feature"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Center - iPhone Image */}
            <div className="lg:col-span-1 order-1 lg:order-2 flex justify-center items-center">
              <div className="relative w-64 sm:w-72 md:w-80 lg:w-72 xl:w-80 max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl scale-110"></div>

                <div className="relative">
                  <img
                    src={currentFeature.image}
                    alt={`${currentFeature.heading} preview`}
                    className="w-full h-auto object-contain transition-all duration-700 filter drop-shadow-lg hover:drop-shadow-xl transform hover:scale-[1.02]"
                    key={activeIndex}
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Feature List */}
            <div className="lg:col-span-1 order-3">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Feature Showcase
                </h3>

                <ul className="space-y-1">
                  {features.map((feature, index) => (
                    <li key={feature.id}>
                      <button
                        onClick={() => selectFeature(index)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-300 group relative ${
                          index === activeIndex
                            ? "text-gray-900 font-semibold bg-blue-50"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {/* Active indicator */}
                        {index === activeIndex && (
                          <div className="absolute left-0 top-0 w-1 h-full bg-blue-500 rounded-r-full"></div>
                        )}

                        <span
                          className={`block text-sm md:text-base transition-all duration-200 ${
                            index === activeIndex
                              ? "pl-4"
                              : "pl-2 group-hover:pl-3"
                          }`}
                        >
                          Feature {feature.id} : {feature.heading}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Progress indicator */}
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs text-gray-500">
                      {activeIndex + 1} / {features.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${
                          ((activeIndex + 1) / features.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to allow normal scrolling after showcase */}
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">
          Continue scrolling normally after feature showcase...
        </p>
      </div>
    </div>
  );
}
