import { useEffect, useState } from "react";
import CurtainIntro from "./components/CurtainIntro";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import StoryTimeline from "./components/StoryTimeline";
import Events from "./components/Events";
import Countdown from "./components/Countdown";
import Families from "./components/Families";
import Gallery from "./components/Gallery";
import Venue from "./components/Venue";
import RSVP from "./components/RSVP";
import FinalScene from "./components/FinalScene";
import MusicToggle from "./components/MusicToggle";

export default function App() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <div className="relative min-h-screen bg-ivory">
      <CurtainIntro onOpened={() => setOpened(true)} />
      {opened && <Nav />}
      <main>
        <Hero />
        <StoryTimeline />
        <Events />
        <Countdown />
        <Families />
        <Gallery />
        <Venue />
        <RSVP />
        <FinalScene />
      </main>
      {opened && <MusicToggle />}
    </div>
  );
}
