import { useEffect, useState } from 'react';
import './index.css';
import './App.css';
import Arrow from './icons/Arrow';
import { trophy } from './images';
import AshenTapLogo from './images/AshenTapLogo.png';
import AshenOrb from './images/AshenOrb.png';
import CindersIcon from './images/cinders.png';
import CovenantIcon from './images/covenant.png';
import BoostIcon from './images/boost.png';
import LeaderboardIcon from './images/leaderboard.png';
import SoulIcon from './images/soul.png';
import DarkliteIcon from './images/darklite.png';
import PanelOverlay from './images/paneloverlay.png';

//////////////////////////////////////////////////////////
import { CSSProperties } from 'react';

interface FlyIconStyle extends CSSProperties {
  '--target-x'?: string;
  '--target-y'?: string;
}
//////////////////////////////////////////////////////////

import echoOfTheAncientsImg from './images/cinders/echo_of_the_ancients.png';
import moonboundSigilImg from './images/cinders/moonbound_sigil.png';
import wardensCrossImg from './images/cinders/wardens_cross.png';
import shieldOfReverenceImg from './images/cinders/shield_of_reverence.png';
import seekersAegisImg from './images/cinders/seekers_aegis.png';
import stoneheartBadgeImg from './images/cinders/stoneheart_badge.png';
import crusadersCrossImg from './images/cinders/crusaders_cross.png';
import keepersEmblemImg from './images/cinders/keepers_emblem.png';
import faithsHeraldImg from './images/cinders/faiths_herald.png';
import oathboundCrestImg from './images/cinders/oathbound_crest.png';
import vanguardsBroochImg from './images/cinders/vanguards_brooch.png';
import aegisOfVigilanceImg from './images/cinders/aegis_of_vigilance.png';
import hammerOfTheResoluteImg from './images/cinders/hammer_of_the_resolute.png';
import ramsResolveImg from './images/cinders/rams_resolve.png';
import heartOfValorImg from './images/cinders/heart_of_valor.png';

interface Click {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

const App = () => {
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(2532);
  const [clicks, setClicks] = useState<Click[]>([]);
  const [overlayVisible, setOverlayVisible] = useState<string | null>(null);
  const [darklitePerHour, setDarklitePerHour] = useState(0);
  const [darklitePerTap] = useState(10000);
//  const [scaleFactor, setScaleFactor] = useState(1); // State for manual scaling

  const itemsInitialState = [
    {
      id: 1,
      name: 'Echo of the Ancients',
      level: 0,
      description: 'A talisman said to resonate with the voices of lost spirits, guiding the bearer through darkness.',
      baseCost: 345,
      cost: 345,
      darklitePerHour: 86.25,
      image: echoOfTheAncientsImg,
      owned: false,
    },
    {
      id: 2,
      name: 'Moonbound Sigil',
      level: 0,
      description: 'An emblem crafted in reverence to the moon, blessed with protective charms against dark forces.',
      baseCost: 540,
      cost: 540,
      darklitePerHour: 135,
      image: moonboundSigilImg,
      owned: false,
    },
    {
      id: 3,
      name: 'Warden\'s Cross',
      level: 0,
      description: 'The mark of ancient wardens who guarded forbidden realms; it bears a faint holy aura.',
      baseCost: 275,
      cost: 275,
      darklitePerHour: 68.75,
      image: wardensCrossImg,
      owned: false,
    },
    {
      id: 4,
      name: 'Shield of Reverence',
      level: 0,
      description: 'A shield worn by knights of old, symbolizing unwavering faith in the face of despair.',
      baseCost: 460,
      cost: 460,
      darklitePerHour: 115,
      image: shieldOfReverenceImg,
      owned: false,
    },
    {
      id: 5,
      name: 'Seeker’s Aegis',
      level: 0,
      description: 'An oval shield carried by seekers of the unknown, its design reflects an ever-watchful eye.',
      baseCost: 630,
      cost: 630,
      darklitePerHour: 157.5,
      image: seekersAegisImg,
      owned: false,
    },
    {
      id: 6,
      name: 'Stoneheart Badge',
      level: 0,
      description: 'A sturdy insignia, signifying the wearer’s resilience and steadfast nature.',
      baseCost: 190,
      cost: 190,
      darklitePerHour: 47.5,
      image: stoneheartBadgeImg,
      owned: false,
    },
    {
      id: 7,
      name: 'Crusader’s Cross',
      level: 0,
      description: 'A battle-worn symbol once held by crusaders who defended the realm with fierce devotion.',
      baseCost: 485,
      cost: 485,
      darklitePerHour: 121.25,
      image: crusadersCrossImg,
      owned: false,
    },
    {
      id: 8,
      name: 'Keeper’s Emblem',
      level: 0,
      description: 'A shield that marks the bearer as a keeper of ancient secrets, protected from harm.',
      baseCost: 320,
      cost: 320,
      darklitePerHour: 80,
      image: keepersEmblemImg,
      owned: false,
    },
    {
      id: 9,
      name: 'Faith’s Herald',
      level: 0,
      description: 'A cross-shaped talisman carried by those who devote themselves to an unyielding faith.',
      baseCost: 570,
      cost: 570,
      darklitePerHour: 142.5,
      image: faithsHeraldImg,
      owned: false,
    },
    {
      id: 10,
      name: 'Oathbound Crest',
      level: 0,
      description: 'An ancient crest worn by warriors bound by a blood oath, loyal to their last breath.',
      baseCost: 225,
      cost: 225,
      darklitePerHour: 56.25,
      image: oathboundCrestImg,
      owned: false,
    },
    {
      id: 11,
      name: 'Vanguard’s Brooch',
      level: 0,
      description: 'A badge signifying the vanguard, those who march fearlessly into the unknown.',
      baseCost: 665,
      cost: 665,
      darklitePerHour: 166.25,
      image: vanguardsBroochImg,
      owned: false,
    },
    {
      id: 12,
      name: 'Aegis of Vigilance',
      level: 0,
      description: 'A talisman of watchfulness, crafted to alert the bearer of unseen threats.',
      baseCost: 280,
      cost: 280,
      darklitePerHour: 70,
      image: aegisOfVigilanceImg,
      owned: false,
    },
    {
      id: 13,
      name: 'Hammer of the Resolute',
      level: 0,
      description: 'A weapon-shaped pendant carried by the resolute, whose might can break through any barrier.',
      baseCost: 730,
      cost: 730,
      darklitePerHour: 182.5,
      image: hammerOfTheResoluteImg,
      owned: false,
    },
    {
      id: 14,
      name: 'Ram’s Resolve',
      level: 0,
      description: 'A symbol representing unbreakable resolve, inspired by the relentless nature of a ram.',
      baseCost: 410,
      cost: 410,
      darklitePerHour: 102.5,
      image: ramsResolveImg,
      owned: false,
    },
    {
      id: 15,
      name: 'Heart of Valor',
      level: 0,
      description: 'A heart-shaped shield worn by champions, symbolizing courage even in the direst moments.',
      baseCost: 775,
      cost: 775,
      darklitePerHour: 193.75,
      image: heartOfValorImg,
      owned: false,
    },
  ];

  const [items, setItems] = useState(itemsInitialState);
  const energyToReduce = 12;

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (energy - energyToReduce < 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const darkliteIcon = document.querySelector('.darklite-amount-icon') as HTMLDivElement;
    const targetRect = darkliteIcon.getBoundingClientRect();
    const targetX = targetRect.left - rect.left + targetRect.width / 2;
    const targetY = targetRect.top - rect.top + targetRect.height / 2;

    setPoints(points + darklitePerTap);
    setEnergy((prevEnergy) => Math.max(prevEnergy - energyToReduce, 0));
    setClicks([...clicks, { id: Date.now(), x, y, targetX, targetY }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 2500));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && overlayVisible) {
        setOverlayVisible(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [overlayVisible]);

  const toggleOverlay = (overlay: string | null) => {
    setOverlayVisible(overlay);
  };

  const purchaseItem = (itemId: number) => {
    const levelUpCostIncrement = 2;
    const darkliteIncrement = 1.05;

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId && points >= item.cost) {
          const newLevel = item.level + 1;
          const newCost = Math.round(item.baseCost * Math.pow(levelUpCostIncrement, newLevel));
          const newDarklitePerHour = item.darklitePerHour * Math.pow(darkliteIncrement, newLevel - 1);

          setPoints(points - item.cost);
          setDarklitePerHour((prevDarklite) =>
            prevDarklite + (newDarklitePerHour - item.darklitePerHour * Math.pow(darkliteIncrement, item.level - 1))
          );

          return {
            ...item,
            owned: true,
            level: newLevel,
            cost: newCost,
            darklitePerHour: newDarklitePerHour,
          };
        }
        return item;
      })
    );
  };

  const getOverlayContent = () => {
    if (overlayVisible === 'Cinders') {
      return (
        <div className="overlay-scroll-container overlay-scroll">
          <div className="inside-box">
            {items.map((item) => (
              <div key={item.id} className="item-box unselectable">
                <div className="item-info">
                  <div className="name unselectable">{item.name}</div>
                  {item.owned && <div className="owned-box unselectable">OWNED</div>}
                  <div className="level unselectable">Level: {item.level}</div>
                  <div className="description unselectable">{item.description}</div>
                  <div className="earnings unselectable">
                    Earnings: {(item.darklitePerHour * (item.level || 1)).toFixed(2)} Darklite/hour
                  </div>
                  <button
                    className="purchase-button unselectable"
                    onClick={() => purchaseItem(item.id)}
                  >
                    {item.owned ? `Level Up for ${item.cost} Darklite` : `Purchase for ${item.cost} Darklite`}
                  </button>
                </div>
                <img src={item.image} className="cinder-image unselectable" alt={item.name} />
              </div>
            ))}
          </div>
        </div>
      );
    }
    return <div className="overlay-scroll-container overlay-scroll"><p>No items available.</p></div>;
  };

useEffect(() => {
  const updateScale = () => {
    const designWidth = 1080;
    const designHeight = 1920;
    const scaleWidth = window.innerWidth / designWidth;
    const scaleHeight = window.innerHeight / designHeight;
    const autoScaleFactor = Math.min(scaleWidth, scaleHeight);

    document.documentElement.style.setProperty('--scale-factor', autoScaleFactor.toString());
  };

  window.addEventListener('resize', updateScale);
  updateScale(); // Initial scale on load

  return () => window.removeEventListener('resize', updateScale);
}, []);


  return (
    <div className="scalable-wrapper">
      <div className="fixed-container">
        <div className="main-container min-h-screen px-4 flex flex-col items-center text-white font-medium">
          <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
            <div className="logo-container mt-6">
              <img src={AshenTapLogo} width={500} height={150} alt="AshenTap Logo" />
            </div>

            <div className="points-display">
              <div className="flex justify-center space-x-8 mt-4">
                <div className="bg-[#1f1f1f] text-center py-2 px-4 rounded-xl flex items-center space-x-2">
                  <img src={DarkliteIcon} className="currency-icon darklite-amount-icon" alt="Darklite Icon" />
                  <span>{darklitePerHour.toFixed(2)} Darklite/hour</span>
                </div>
                <div className="bg-[#1f1f1f] text-center py-2 px-4 rounded-xl">
                  <span>{darklitePerTap} Darklite per Tap</span>
                </div>
              </div>
              <div className="mt-4 text-5xl font-bold flex items-center">
                <img src={DarkliteIcon} className="currency-icon darklite-amount-icon" alt="Darklite" />
                <span className="ml-2">{points.toLocaleString()}</span>
              </div>
              <div className="text-base mt-2 flex items-center">
                <img src={trophy} width={24} height={24} />
                <span className="ml-1">Gold <Arrow size={18} className="ml-0 mb-1 inline-block" /></span>
              </div>
            </div>

            <div className="fixed bottom-12 left-0 w-full px-4 pb-4 z-10 flex justify-between items-center">
              <div className="flex items-center">
                <img src={SoulIcon} className="energy-icon scalable-icon" alt="Soul Icon" />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">{energy}</span>
                  <span className="text-white opacity-75">/ 2500</span>
                </div>
              </div>

              <div className="icon-row">
                <button className="icon-button" onClick={() => toggleOverlay('Cinders')}>
                  <img src={CindersIcon} className="scalable-icon" alt="Cinders" />
                </button>
                <button className="icon-button" onClick={() => toggleOverlay('Covenant')}>
                  <img src={CovenantIcon} className="scalable-icon" alt="Covenant" />
                </button>
                <button className="icon-button" onClick={() => toggleOverlay('Boost')}>
                  <img src={BoostIcon} className="scalable-icon" alt="Boost" />
                </button>
                <button className="icon-button" onClick={() => toggleOverlay('Leaderboard')}>
                  <img src={LeaderboardIcon} className="scalable-icon" alt="Leaderboard" />
                </button>
              </div>
            </div>

            <div
              className="ashen-orb-container"
              onClick={handleClick}
              onMouseDown={handleClick}
              onContextMenu={(e) => e.preventDefault()}
            >
              <img src={AshenOrb} width={550} height={550} alt="Ashen Orb" />
              {clicks.map((click) => (
                <img
                  key={click.id}
                  src={DarkliteIcon}
                  className="absolute darklite-fly-icon"
                  style={{
                    top: `${click.y}px`,
                    left: `${click.x}px`,
                    '--target-x': `${click.targetX - click.x}px`,
                    '--target-y': `${click.targetY - click.y}px`,
                  } as FlyIconStyle}
                  onAnimationEnd={() => handleAnimationEnd(click.id)}
                  alt="Darklite Icon"
                />
              ))}
            </div>
          </div>

          {overlayVisible && (
            <div className="overlay">
              <img src={PanelOverlay} alt="Overlay Background" className="overlay-image" />
              <button className="close-button" onClick={() => toggleOverlay(null)}>CLOSE</button>
              {getOverlayContent()}
            </div>
          )}

          <div className="fixed bottom-0 w-full bg-[#f9c035] rounded-full">
            <div
              className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full"
              style={{ width: `${(energy / 2500) * 100}%` }}
            ></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
