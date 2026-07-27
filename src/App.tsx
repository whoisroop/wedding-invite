import { useState } from "react";
import EnvelopeIntro from "./components/EnvelopeIntro";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import OurStory from "./components/OurStory";
import Events from "./components/Events";
import Countdown from "./components/Countdown";
import Families from "./components/Families";
import Gallery from "./components/Gallery";
import Venue from "./components/Venue";
import RSVP from "./components/RSVP";
import FinalScene from "./components/FinalScene";

export default function App() {
  const [invitationOpened, setInvitationOpened] = useState(false);

  return (
    <div className="relative min-h-screen bg-ivory">
      {!invitationOpened && (
        <EnvelopeIntro onComplete={() => setInvitationOpened(true)} />
      )}
      <div
        className="relative"
        style={{
          opacity: invitationOpened ? 1 : 0,
          transition: "opacity 1.2s ease-in-out",
        }}
      >
        <Nav />
        <main>
          <Hero />
          <OurStory />
          <Events />
          <Countdown />
          <Families />
          <Gallery />
          <Venue />
          <RSVP />
          <FinalScene />
        </main>
      </div>
    </div>
  );
}
