import { useState, useEffect, useRef } from "react";
import { features } from "../data/features";

export default function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  const [autoScrollComplete, setAutoScrollComplete] = useState(false);
  const showcaseRef = useRef(null);
  const autoScrollRef = useRef(null);
  const sectionRef = useRef(null);

  // Intersection Observer for sticky behavior and auto-scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);

        // Trigger auto-scroll when section comes into view for the first time
        if (entry.isIntersecting && !hasAutoScrolled && !autoScrollComplete) {
          setHasAutoScrolled(true);
          setTimeout(() => {
            autoScrollFeatures();
          }, 500); // Small delay for better UX
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }

    return () => observer.disconnect();
  }, [hasAutoScrolled, autoScrollComplete]);


  // Auto-scroll through features
  const autoScrollFeatures = () => {
    let currentIndex = 0;
    setActiveIndex(0); // Start from first feature

    const scrollInterval = setInterval(() => {
      currentIndex++;
      if (currentIndex < features.length) {
        setActiveIndex(currentIndex);
      } else {
        clearInterval(scrollInterval);
        setAutoScrollComplete(true);

        // After auto-scroll, scroll past the section cleanly
        setTimeout(() => {
          if (sectionRef.current) {
            const scrollTarget =
              sectionRef.current.offsetTop + sectionRef.current.offsetHeight;
            window.scrollTo({
              top: scrollTarget,
              behavior: "smooth",
            });
          }
        }, 800);
      }
    }, 2000);

    autoScrollRef.current = scrollInterval;
  };

  // Clear auto-scroll interval helper
  const clearAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
    setAutoScrollComplete(true);
  };

  // Navigation functions
  const nextFeature = () => {
    clearAutoScroll();
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    clearAutoScroll();
    setActiveIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const selectFeature = (index) => {
    clearAutoScroll();
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
        ref={sectionRef}
        className={`${
          isInView && !autoScrollComplete ? "sticky top-0" : ""
        } bg-white py-8 md:py-16 min-h-screen transition-all duration-300 z-10`}
      >
        <div ref={showcaseRef} className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start h-full">
            {/* Left Side - Feature Content */}
            <div className="lg:col-span-1 order-2 lg:order-1 space-y-6">
              {/* Feature Title */}
              <div className="space-y-2">
                <h3 className="text-blue-500 font-medium text-lg transition-all duration-500">
                  {currentFeature.title}
                </h3>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight transition-all duration-500">
                  {currentFeature.heading}
                </h2>
              </div>

              {/* Feature Description */}
              <ul className="space-y-4 text-gray-600 leading-relaxed">
                {currentFeature.description.map((point, i) => (
                  <li
                    key={`${activeIndex}-${i}`}
                    className="flex items-start gap-3 transition-all duration-500 opacity-0 translate-y-4 animate-fadeInUp"
                    style={{
                      animationDelay: `${i * 150}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm md:text-base">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-4 pt-6">
                <button
                  onClick={prevFeature}
                  className="w-12 h-12 rounded-full border-2 border-gray-200 hover:border-blue-400 flex items-center justify-center transition-all duration-200 hover:bg-blue-50 active:scale-95 group"
                  aria-label="Previous feature"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors"
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
                  className="w-12 h-12 rounded-full border-2 border-gray-200 hover:border-blue-400 flex items-center justify-center transition-all duration-200 hover:bg-blue-50 active:scale-95 group"
                  aria-label="Next feature"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors"
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

            {/* Center - Phone Image */}
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
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  Features Overview
                </h3>

                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={feature.id}>
                      <button
                        onClick={() => selectFeature(index)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 group relative ${
                          index === activeIndex
                            ? "text-gray-900 font-semibold bg-blue-50 shadow-sm border-2 border-blue-200"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-2 border-transparent"
                        }`}
                      >
                        {/* Active indicator */}
                        {index === activeIndex && (
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full animate-fadeIn"></div>
                        )}

                        <div
                          className={`transition-all duration-200 ${
                            index === activeIndex
                              ? "pl-6"
                              : "pl-2 group-hover:pl-4"
                          }`}
                        >
                          <div className="text-xs text-blue-500 mb-1 font-medium">
                            FEATURE {feature.id}
                          </div>
                          <div className="text-sm md:text-base font-medium">
                            {feature.heading}
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Progress indicator */}
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-500">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                      {activeIndex + 1} of {features.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-700 ease-out shadow-sm"
                      style={{
                        width: `${
                          ((activeIndex + 1) / features.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Auto-scroll indicator */}
                {!autoScrollComplete && hasAutoScrolled && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-blue-700">
                        Auto-advancing features...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to allow normal scrolling after showcase */}
      <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Continue Your Journey
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            You've explored all our key features. Keep scrolling to discover
            more about our platform.
          </p>
        </div>
      </div>
    </div>
  );
}
