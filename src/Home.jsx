import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import im1 from './assets/First.png';
import icon from './assets/icon.png';
import doc from './assets/doc.jpg';
import HamburgerMenu from './HunburgerMenu';
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const containerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [barColor, setBarColor] = useState('white'); // Bar color state

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(section2Ref.current, { scale:0.1, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
        }
      });

      tl.to(section1Ref.current, {
        scale: 10,
        opacity: 0,
        duration: 1,
      }, 0);

      tl.to(section2Ref.current, {
        scale: 1,
        opacity: 1,
        duration: 1,
      }, 0.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Bar color update on scroll using section positions
  useEffect(() => {
    const handleScroll = () => {
      const s1 = section1Ref.current?.getBoundingClientRect().top;
      const s2 = section2Ref.current?.getBoundingClientRect().top;

      if (s2 < window.innerHeight / 2) {
        setBarColor('black');
      } else if (s1 < window.innerHeight / 2) {
        setBarColor('white');
      } else {
        setBarColor('white');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Hamburger Menu - RIGHT side */}
      <div className="fixed top-4 right-4 z-50">
      <HamburgerMenu/>
      </div>


      {/* Icon on LEFT side */}
      <div className="fixed top-0 left-4 z-50">
        <div className="bg-white w-[200px] h-[100px] rounded-b-4xl overflow-hidden flex items-center justify-center">
          <img src={icon} className="w-[90%] h-full object-contain" alt="Icon" />
        </div>
      </div>

      {/* Scroll Section 1 & 2 */}
      <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
        {/* Section 1 */}
        <div
          ref={section1Ref}
          id="section1"
          className="absolute top-0 left-0 w-full h-full flex bg-[#EACF44] z-10"
        >
          <img src={im1} alt="Placeholder" className="object-contain" />
        </div>

        {/* Section 2 */}
        <div
          ref={section2Ref}
          id="section2"
          className="absolute top-0 left-0 w-full h-full bg-green-600 flex flex-col items-center justify-center p-4 space-y-4 z-20"
        >
          {[
            {
              iconText: 'Icon',
              title: 'Learn about ESR1 mutations',
              subtitle: 'See how common they are',
              href: 'https://orserdu-react.vercel.app/understanding-esr1-mutations', // Replace with actual URL later
            },
            {
              iconText: 'Icon',
              title: 'Learn about ORSERDU',
              subtitle: 'See the clinical trial results',
              href: 'https://orserdu-react.vercel.app/orserdu-results',
            },
            {
              image: doc,
              title: 'Hear from Dr. O’Dea',
              href: 'https://orserdu-react.vercel.app/savings-and-support',
            },
            {
              image: doc,
              title: 'Share your ORSERDU story',
              href: 'https://orserdu-react.vercel.app/real-stories',
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="w-full max-w-md bg-white rounded-xl flex items-center p-4 shadow-md hover:shadow-lg transition-all duration-300 z-30"
            >
              {item.image ? (
                <img src={item.image} alt="avatar" className="w-12 h-12 object-contain rounded-full mr-4" />
              ) : (
                <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center mr-4">
                  <span className="text-sm font-bold text-white">{item.iconText}</span>
                </div>
              )}
              <div className="flex-1">
                <p className="font-bold text-gray-800">{item.title}</p>
                {item.subtitle && <p className="text-sm text-gray-500">{item.subtitle}</p>}
              </div>
              <div className="text-green-500 text-xl font-bold ml-2">{'>'}</div>
            </a>
          ))}
        </div>

      </div>

      {/* Section 3 */}
      <div
        id="section3"
        className="w-full h-screen flex items-center justify-center bg-blue-600"
      >
        <div className="text-white text-center">
          <h1 className="text-5xl font-bold">Section 3</h1>
          <p className="text-2xl">This is normal scroll content</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
